import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          `${backendUrl}/api/admin/login-admin`,
          { email, password },
        );
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Login successful");
        } else {
          const { data } = await axios.post(
            `${backendUrl}/api/doctor/login-doctor`,
            { email, password },
          );
          if (data.success) {
            localStorage.setItem("dToken", data.token);
            setDToken(data.token);
            console.log(data.token);
            toast.success("Login successful");
          } else {
            console.log(data.message);

            toast.error(data.message);
          }
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during login",
      );
      console.error("Login error:", error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col  gap-4  border-none rounded-lg shadow-lg p-10"
      >
        <p className="font-semibold text-2xl text-center">
          <span className="text-blue-500">{state}</span> Login
        </p>
        <div className="flex flex-col gap-2 focus-within:border-blue-500">
          <p className="text-gray-500">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border rounded border-gray-300 w-80 p-2 h-10 "
            type="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2 focus-within:border-blue-500">
          <p className="text-gray-500">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border rounded border-gray-300 w-80 p-2 h-10 "
            type="password"
            required
          />
        </div>
        <div className="flex justify-center focus-within:border-blue-500">
          <button className="w-70 p-2 text-center text-white bg-blue-500 outline-none rounded cursor-pointer hover:bg-amber-600 hover:text-black">
            Login
          </button>
        </div>
        <div>
          <p className="text-sm text-center text-gray-500">
            {state === "Admin" ? "Doctor Login? " : "Admin Login?"}{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setState(state === "Admin" ? "Doctor" : "Admin")}
            >
              Click here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
