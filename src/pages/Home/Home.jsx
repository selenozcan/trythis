import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import HomeImage from "../../assets/background.jpg";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartButton = () => {
    navigate(user ? "/dashboard" : "/login");
  };

  return (
    <main className="home-container">
      <div className="image-wrapper">
        <img src={HomeImage} alt="Home Background" className="header-image" />
        <div className="overlay" />
        <div className="home-content">
          <h1>Ready to try this?</h1>
          <p>Let's get you started for today's adventures!</p>
          <div className="home-buttons">
            <button onClick={handleStartButton} className="start-button">
              Start your adventure!
            </button>
            <button
              onClick={() => navigate("/seeAllActivities")}
              className="activities-button"
            >
              See all activities
            </button>
            <button onClick={() => navigate("/about")} className="about-button">
              What is this?
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
