// src/RoutesComponent.tsx
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import OTP_Verification from "../pages/OTP_Verification";
import ProtectedRoute from "../components/ProtectedRoutes";
import Auth from "../pages/Auth";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Routes accessible ONLY when NOT authenticated */}
      <Route element={<ProtectedRoute authenticate={false} />}>
        <Route path="/register" element={<Registration />} />
        <Route path="/register/verification" element={<OTP_Verification />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/verification" element={<OTP_Verification />} />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
