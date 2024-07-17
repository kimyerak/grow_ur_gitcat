import React, { useEffect } from "react";
import "../styles/background_party.css"; // CSS 파일 경로

const BackgroundParty = ({ children }) => {
  useEffect(() => {
    const rhombusContainer = document.querySelector(".background-party");
    const rhombusCount = 50; // Number of rhombuses

    for (let i = 0; i < rhombusCount; i++) {
      const rhombus = document.createElement("div");
      rhombus.classList.add("rhombus");
      rhombus.style.top = `${Math.random() * 100}vh`;
      rhombus.style.left = `${Math.random() * 100}vw`;
      rhombus.style.animationDelay = `${Math.random() * 5}s`;
      rhombusContainer.appendChild(rhombus);
    }
  }, []);

  return (
    <div className="background-party">
      <div className="disco-ball"></div>
      <div className="flashlight"></div>
      <div className="party-content">{children}</div>
    </div>
  );
};

export default BackgroundParty;
