import React from "react";
import "../styles/background_signin.css";

const SIBG = ({ children }) => {
  const createDust = () => {
    const dustArray = [];
    for (let i = 0; i < 50; i++) {
      dustArray.push(
        <div
          key={i}
          className="clover"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * -100}vh`,
          }}
        >
          <img
            src="/assets/clover.png"
            alt="clover"
            style={{
              width: "50px", // 원하는 크기로 설정
              height: "50px",
            }}
          />
        </div>
      );
    }
    return dustArray;
  };

  return (
    <div className="background-signin">
      {createDust()}

      {children}
    </div>
  );
};

export default SIBG;
