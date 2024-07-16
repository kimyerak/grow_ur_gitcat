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
          <div className="blanket"></div>
          <div className="pillow"></div>
        </div>
        <div className="desk"></div>
        <div className="laptop"></div>
        <div className="mailbox">
          <div className="lid"></div>
          <div className="stand"></div>
        </div>
      </div>
      <div className="cloud"></div>
      <div className="room-content">{children}</div>
    </div>
  );
};

export default MRBG;
