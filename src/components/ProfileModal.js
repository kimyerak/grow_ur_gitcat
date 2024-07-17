import React from "react";
import Modal from "react-modal";
import "../styles/ProfileModal.css"; // 스타일을 적용하려면 ProfileModal.css 파일을 생성하세요

const ProfileModal = ({ isOpen, onRequestClose, userInfo }) => {
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
          <p>Username: {userInfo.username}</p>
          <p>Coin: {userInfo.coin}</p>
          <p>Has Commit: {userInfo.hasCommit ? "Yes" : "No"}</p>
          <p>Message: {userInfo.message}</p>
          <p>Wearing Items: {userInfo.wearing_items.join(", ")}</p>
          <img
            className="plant-image"
            src={
              userInfo.hasCommit
                ? "/assets/plant_beautiful_1.png"
                : "/assets/plant_wilted_1.png"
            }
            alt={userInfo.hasCommit ? "Beautiful Plant" : "Wilted Plant"}
          />
        </div>
      ) : (
        <p>No user info found</p>
      )}
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ProfileModal;
