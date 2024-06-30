import React from "react";
import "./Loading.css";

const Loading = ({ message }) => {
  return (
    <div className="loading">
      <div className="dots">
        <div className="dot red"></div>
        <div className="dot blue"></div>
        <div className="dot yellow"></div>
      </div>
      <h3>Hold on, we're {message}...</h3>
    </div>
  );
};

export default Loading;
