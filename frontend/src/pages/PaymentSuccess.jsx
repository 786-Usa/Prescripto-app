import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const { backendUrl, token } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const session_id = query.get("session_id");
  const aptId = query.get("aptId");

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/payment-success`,
          { session_id, aptId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.success) {
          navigate("/my-appointments"); // 🔥 go back after update
        }

      } catch (error) {
        console.log(error);
        toast.error("Payment verification failed");
       navigate("/my-appointments"); // 🔥 go back even if error occurs
      }
    };

    if (session_id && aptId) {
      verify();
    }
  }, []);

  return <div className="text-center mt-20">Processing Payment...</div>;
};

export default PaymentSuccess;