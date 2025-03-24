import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate, useLocation } from "react-router";

const LoginRequired = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }
  
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must log in first",
          from: location.pathname,
        }}
        replace
      />
    );
  }
  return <Outlet />;
};

export default LoginRequired;
