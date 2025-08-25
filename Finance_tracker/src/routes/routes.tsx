// src/RoutesComponent.tsx
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import OTP_Verification from "../pages/OTP_Verification";
import ProtectedRoute from "../components/ProtectedRoutes";
import Auth from "../pages/Auth";
import PersonalPage from "../pages/Personal/Personal";
import PersonalLayout from "../components/Personal/PersonalLayout";
import PersonalSettingsPage from "../pages/Personal/PersonalSettingsPage";
import RestorePasswordForm from "../components/RestorePasswordForm/RestorePasswordForm";
import NewPassword from "../pages/RestorePassword/NewPassword";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restore-password" element={<RestorePasswordForm />} />
      <Route path="/restore-password/new-password" element={<NewPassword />} />

      {/* Routes accessible ONLY when NOT authenticated */}
      <Route element={<ProtectedRoute authenticate={false} />}>
        <Route path="/register" element={<Registration />} />
        <Route path="/register/verification" element={<OTP_Verification />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/verification" element={<OTP_Verification />} />
      </Route>

      {/* Routes accessible ONLY when authenticated */}
      <Route element={<ProtectedRoute authenticate />}>
        <Route path="/personal" element={<PersonalLayout />}>
          <Route index element={<PersonalPage />} />
          <Route path="settings" element={<PersonalSettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
