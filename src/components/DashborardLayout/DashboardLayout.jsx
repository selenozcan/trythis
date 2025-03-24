import React from "react";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import { Outlet } from "react-router";
import Spinner from "../Spinner/Spinner";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import "./dashboardLayout.css";


const DashboardLayout = () => {
  const { loading: authLoading } = useAuth();
  const { loading: userLoading, error } = useUser();

  if (authLoading || userLoading) return <Spinner />;
  if (error) return <p className="error-message">Error loading user data</p>;

  return (
    <div className="dashboard-container">
      <DashboardNavbar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
