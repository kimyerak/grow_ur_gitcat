import React from "react";
import "../styles/background_party.css"; // CSS 파일 경로

const BackgroundParty = ({ children }) => {
  return (
    <div className="background-party">
      <div className="disco-ball"></div>
      <div className="flashlight"></div>
      <div className="party-content">{children}</div>
    </div>
  );
};

export default BackgroundParty;
