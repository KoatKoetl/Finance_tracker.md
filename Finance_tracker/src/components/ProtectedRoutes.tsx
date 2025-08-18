// src/components/ProtectedRoute.tsx
import React, { type ReactNode } from "react";
import { useAuthStore } from "../stores/AuthStore";
import { Navigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ProtectedRouteProps {
  children?: ReactNode;
  authenticate?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  authenticate = true,
}) => {
  const { isAuthenticated, loading } = useAuthStore();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        {t("loading")}...
      </div>
    );
  }

  if (authenticate) {
    // This branch is for routes that REQUIRE authentication (e.g., /dashboard)
    return isAuthenticated ? (
      children || <Outlet />
    ) : (
      <Navigate to="/auth" replace />
    );
  } else {
    // This branch is for routes that REQUIRE *NO* authentication (e.g., /register, /login)
    // If the user *is* authenticated, redirect them away from these pages.
    return !isAuthenticated ? (
      children || <Outlet />
    ) : (
      <Navigate to="/" replace />
    );
  }
};

export default ProtectedRoute;
