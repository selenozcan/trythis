import React from "react";
import "./spinner.css";

const Spinner = ({ size = "default" }) => {
  return (
    <div className={size === "small" ? "spinner-wrapper" : "spinner-container"}>
      <div className={`spinner ${size === "small" ? "spinner-small" : ""}`} />
    </div>
  );
};

export default Spinner;
