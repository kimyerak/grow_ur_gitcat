import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MTBG from "../components/background_til";
import { FaPencilAlt } from "react-icons/fa";
import { getUserTils, addUserTil, deleteUserTil } from "../api/api_til";
import Modal from 'react-modal';

const MyTilPage = () => {
  const { username } = useParams();
  const [tils, setTils] = useState([]);
  const [newTil, setNewTil] = useState("");
  const [selectedTil, setSelectedTil] = useState(null);

  useEffect(() => {
    const fetchTils = async () => {
      try {
        const data = await getUserTils(username);
        setTils(data.til);  // `til`은 유저의 TIL 목록을 나타내는 키로 가정
      } catch (error) {
        console.error("Failed to fetch TILs:", error);
      }
    };

    fetchTils();
  }, [username]);

  const handleAddTil = async () => {
    if (newTil.trim() === "") return;
    try {
      const tilData = {
        contents: newTil,
      };
      const updatedData = await addUserTil(username, tilData);
      setTils(updatedData.til);
      setNewTil("");
    } catch (error) {
      console.error("Failed to add TIL:", error);
    }
  };

  const handleTilClick = (til) => {
    setSelectedTil(til);
  };

  const closeModal = () => {
    setSelectedTil(null);
  };

  const handleDeleteTil = async () => {
    console.log(selectedTil);
    if (!selectedTil) return;
    try {
      const updatedData = await deleteUserTil(username, selectedTil._id);
      setTils(updatedData.til);
      closeModal();
    } catch (error) {
      console.error("Failed to delete TIL:", error);
    }
  };

  return (
    <MTBG>
      <h1>My TIL</h1>
      <p>여기는 {username}의 My TIL 페이지입니다. 로그인 후 기본 페이지로 설정됩니다.</p>
      <div>
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
      <ul>
        {tils.map((til, index) => (
          <li key={index} onClick={() => handleTilClick(til)}>
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
          <div>
            <h2>TIL Details</h2>
            <p>{selectedTil.contents}</p>
            <p>Created At: {new Date(selectedTil.createdAt).toLocaleString()}</p>
            <button onClick={closeModal}>Close</button>
            <button onClick={handleDeleteTil}>Delete</button>
          </div>
        )}
      </Modal>
    </MTBG>
  );
};

export default MyTilPage;
