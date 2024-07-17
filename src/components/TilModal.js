import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { getUserTils, addUserTil, deleteUserTil } from "../api/api_til";
import "../styles/TilModal.css";

const TilModal = ({ isOpen, onRequestClose, username }) => {
  const [tils, setTils] = useState([]);
  const [newTil, setNewTil] = useState("");
  const [selectedTil, setSelectedTil] = useState(null);

  useEffect(() => {
    const fetchTils = async () => {
      try {
        const data = await getUserTils(username);
        setTils(data.til); // `til`은 유저의 TIL 목록을 나타내는 키로 가정
      } catch (error) {
        console.error("Failed to fetch TILs:", error);
      }
    };

    if (isOpen) {
      fetchTils();
    }
  }, [username, isOpen]);

  const handleAddTil = async () => {
    if (newTil.trim() === "") return;
    try {
      const tilData = { contents: newTil };
      const updatedData = await addUserTil(username, tilData);
      setTils(updatedData.til);
      setNewTil("");
    } catch (error) {
      console.error("Failed to add TIL:", error);
    }
  };

  const handleDeleteTil = async (tilId) => {
    try {
      const updatedData = await deleteUserTil(username, tilId);
      setTils(updatedData.til);
      setSelectedTil(null);
    } catch (error) {
      console.error("Failed to delete TIL:", error);
    }
  };

  const closeModal = () => {
    setSelectedTil(null);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="styled-modal"
      overlayClassName="Overlay"
    >
      <h2>My TIL</h2>
      <button className="close-button" onClick={onRequestClose}>
        닫기
      </button>

      <div className="til-input-container">
        <input
          type="text"
          value={newTil}
          onChange={(e) => setNewTil(e.target.value)}
          placeholder="New TIL"
        />
        <button onClick={handleAddTil}>
          <FaPencilAlt />
        </button>
      </div>

      <ul className="til-list">
        {tils.map((til, index) => (
          <li key={index} onClick={() => setSelectedTil(til)}>
            <p>{til.contents}</p>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={!!selectedTil}
        onRequestClose={closeModal}
        contentLabel="TIL Details"
        className="styled-modal2"
      >
        {selectedTil && (
          <div className="til-details">
            <h2>Details</h2>
            <p>{selectedTil.contents}</p>
            <p>
              작성 시간: {new Date(selectedTil.createdAt).toLocaleString().split("오후")[0].split("오전")[0]}
            </p>
            <div className="button-group">
              <button onClick={closeModal}>Close</button>
              <button onClick={() => handleDeleteTil(selectedTil._id)}>
                Delete <FaTrash />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </Modal>
  );
};

export default TilModal;
