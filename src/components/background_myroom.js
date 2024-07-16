import React from "react";
import "../styles/background_myroom.css";

const MRBG = ({ children }) => {
  return (
    <div className="background-myroom">
      <div className="ground">
        <div className="wardrobe">
          <div className="door"></div>
          <div className="door"></div>
        </div>
        <div className="bed">
          <div className="bed-head"></div>
        </div>
      </div>
      <div className="cloud"></div>
      <div className="room-content">{children}</div>
    </div>
  );
};

export default MRBG;
