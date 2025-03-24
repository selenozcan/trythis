import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser";
import { logoutUser } from "../../api";
import "./dashboardNavbar.css";

const DashboardNavbar = () => {
  const { userData } = useUser();

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser().then(() => {
      navigate("/login");
      setIsMenuOpen(false);
      localStorage.removeItem("userData");
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-top hide-on-desktop">
        <p className="logo">TRYTHIS</p>
        <button
          className={`menu-btn ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      <div className={`nav-menu ${isMenuOpen ? "show" : ""}`}>
        {userData ? (
          <div className="user-info">
            <img src={userData.photoURL} alt="Avatar" className="profile-pic" />
            <h2>{userData.name}</h2>
          </div>
        ) : (
          <p>No user signed in</p>
        )}

        <ul>
          <li
            onClick={() => {
              navigate(".");
              setIsMenuOpen(false);
            }}
          >
            <i className="fa-solid fa-house"></i> <span>Main Dashboard</span>
          </li>
          <li
            onClick={() => {
              navigate("find-activity");
              setIsMenuOpen(false);
            }}
          >
            <i className="fa-solid fa-chart-simple"></i>{" "}
            <span>Find New Activity</span>
          </li>
          <li
            onClick={() => {
              navigate("todays-activities");
              setIsMenuOpen(false);
            }}
          >
            <i className="fa-solid fa-clipboard-list"></i>{" "}
            <span>Today's Activities</span>
          </li>
          <li
            onClick={() => {
              navigate("past-activities");
              setIsMenuOpen(false);
            }}
          >
            <i className="fa-solid fa-clock"></i> <span>Past Activities</span>
          </li>
          <li
            onClick={() => {
              navigate(".");
              setIsMenuOpen(false);
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>{" "}
            <span>Return to Homepage</span>
          </li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i> Sign Out
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
