import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import PaymentSuccess from "./pages/PaymentSuccess";
import Privacy from "./pages/Privacy";
function App() {
  return (
    <>
      <div className="mx-4 sm:mx-[10%]">
        <ToastContainer />

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          {/* changed to plural to match links */}
          <Route path="/appointments/:docId" element={<Appointment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />{" "}
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
