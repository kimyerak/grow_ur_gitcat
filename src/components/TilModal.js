// components/TilModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import "../styles/TilModal.css";

const TilModal = ({
  isOpen,
  onRequestClose,
  tils,
  onAddTil,
  onDeleteTil,
  selectedTil,
  setSelectedTil,
}) => {
  const [newTil, setNewTil] = useState("");

  const handleAddTil = () => {
    if (newTil.trim() === "") return;
    onAddTil(newTil);
    setNewTil("");
  };

  const closeModal = () => {
    setSelectedTil(null);
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
      >
        {selectedTil && (
          <div className="til-details">
            <h2>TIL Details</h2>
            <p>{selectedTil.contents}</p>
            <p>
              Created At: {new Date(selectedTil.createdAt).toLocaleString()}
            </p>
            <button onClick={closeModal}>Close</button>
            <button onClick={() => onDeleteTil(selectedTil._id)}>
              Delete <FaTrash />
            </button>
          </div>
        )}
      </Modal>
    </Modal>
  );
};

export default TilModal;
