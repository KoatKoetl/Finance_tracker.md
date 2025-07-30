import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import OTP_Verification from "../pages/OTP_Verification";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/register/verification" element={<OTP_Verification />} />
    </Routes>
  );
};

export default RoutesComponent;
