import React, { useState, useRef } from "react";
import "../styles/background_myroom.css";

const MRBG = ({
  children,
  onItemClick,
  onTilClick,
  onPostboxClick,
  username,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const catRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    catRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - catRef.current.clientWidth / 2,
        y: e.clientY - catRef.current.clientHeight / 2,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    catRef.current.style.cursor = "grab";
  };
  const createDust = () => {
    const dustArray = [];
    for (let i = 0; i < 50; i++) {
      dustArray.push(
        <div
          key={i}
          className="dust"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * -100}vh`,
          }}
        />
      );
    }
    return dustArray;
  };
  return (
    <div
      className="background-myroom"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img src="/assets/cloud.png" alt="Cloud" className="cloud" />

      <div className="ground">
        <div className="wardrobe">
          <div className="door"></div>
          <div className="door">
            <button className="item-button" onClick={onItemClick}>
              ITEMS
            </button>
          </div>
        </div>
        <div className="bed">
          <div className="bed-head"></div>
          <div className="blanket"></div>
          <div className="pillow"></div>
        </div>
        <div className="desk"></div>
        <div className="laptop">
          <div className="stand"></div>
          <img
            src={`https://ghchart.rshah.org/${username}`}
            alt={`${username}'s GitHub chart`}
            className="github-chart"
          />
        </div>
        <div className="mailbox">
          <div className="lid"></div>
          <div className="stand"></div>
          <button className="item-button" onClick={onPostboxClick}>
            POST BOX
          </button>
        </div>
        <div className="bookshelf">
          <div className="shelf">
            <div className="book"></div>
            <div className="book"></div>
            <div className="book"></div>
            <div className="book"></div>
            <div className="book"></div>
          </div>
          <div className="shelf">
            <button className="item-button" onClick={onTilClick}>
              TIL
            </button>
          </div>

          <div className="shelf">
            <div className="book"></div>
            <div className="book"></div>
            <div className="book"></div>
            <div className="book"></div>
            <div className="book"></div>
          </div>
        </div>
      </div>

      <div className="room-content">{children}</div>
      {createDust()}
      <img
        src="/assets/cat4.png"
        alt="Cat"
        className="draggable"
        ref={catRef}
        onMouseDown={handleMouseDown}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          position: "absolute",
          cursor: "grab",
        }}
      />
    </div>
  );
};

export default MRBG;
