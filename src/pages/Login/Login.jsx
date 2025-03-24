import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { loginWithGoogle, loginWithFacebook } from "../../api";
import LoginImage from "../../assets/login.jpg";
import "./login.css";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message || "";
  const from = location.state?.from || "/dashboard";

  const handleLogin = (loginWith) => {
    loginWith()
      .then((userData) => {
        setError(null);
        console.log("User logged in:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login error:", error);
        setError(error);
      });
  };

  return (
    <div className="login-page">
      <div className="login-image-container">
        <img src={LoginImage} alt="TryThis" className="login-image" />
      </div>

      <div className="login-container">
        <Link to="/" className="login-link">
          &larr; <span>Back to Home</span>
        </Link>

        {error && <p className="error-message">{error.message}</p>}
        {message && <p className="login-message">{message}</p>}

        <h1>Login to TryThis</h1>
        <p>Choose a login method:</p>

        <div className="login-buttons">
          <button
            className="google-login"
            onClick={() => handleLogin(loginWithGoogle)}
          >
            <i className="fa-brands fa-google"></i> Sign in with Google
          </button>

          <button
            className="facebook-login"
            onClick={() => handleLogin(loginWithFacebook)}
          >
            <i className="fa-brands fa-facebook"></i> Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
