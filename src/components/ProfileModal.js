import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "../styles/ProfileModal.css"; // 스타일을 적용하려면 ProfileModal.css 파일을 생성하세요

const ProfileModal = ({ isOpen, onRequestClose, userInfo }) => {
  const [message, setMessage] = useState(userInfo ? userInfo.message : "");

  const handleSave = () => {
    const url = `http://localhost/records/${userInfo.username}`;
    const data = { message };

    fetch(url, {
      method: "PUT",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message updated successfully", data);
        onRequestClose(); // Close the modal after saving
      })
      .catch((error) => {
        console.error("Error updating message:", error);
      });
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    alert("로그아웃 되었습니다.");
    navigate("/signin");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="profile-modal"
      overlayClassName="profile-modal-overlay"
    >
      <h2>Profile</h2>
      {userInfo ? (
        <div>
          <p>👩‍💻Username: {userInfo.username}</p>
          <p>🍀Clover Coin: {userInfo.coin}</p>
          <p>☀️오늘 커밋했나요?: {userInfo.hasCommit ? "Yes" : "No"}</p>
          <div>
            <label htmlFor="message">💭상태 메시지: </label>
            <input
              type="text"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>{" "}
          <p>🧕Wearing Items: {userInfo.wearing_items.join(", ")}</p>
          {/* <img
            className="plant-image"
            src={
              userInfo.hasCommit
                ? "/assets/plant_beautiful_1.png"
                : "/assets/plant_wilted_1.png"
            }
            alt={userInfo.hasCommit ? "Beautiful Plant" : "Wilted Plant"}
          /> */}
        </div>
      ) : (
        <p>No user info found</p>
      )}
      <button onClick={handleSave}>저장</button>
      <button onClick={onRequestClose}>닫기</button>
      <button onClick={handleLogout}>로그아웃</button>
    </Modal>
  );
};

export default ProfileModal;
