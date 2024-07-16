import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MRBG from "../components/background_myroom";
import { fetchUserRecord } from "../api/api_myroom_current";
import "../styles/MyRoomPage.css";
import ItemModal from "../components/ItemModal";
import TilModal from "../components/TilModal";
import PostboxModal from "../components/PostboxModal";
import { getUserTils, addUserTil, deleteUserTil } from "../api/api_til";

const UserProfile = ({ username }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await fetchUserRecord(username);
        setUserInfo(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
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
    </div>
  );
};

const MyRoomPage = () => {
  const { username } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tilModalIsOpen, setTilModalIsOpen] = useState(false);
  const [tils, setTils] = useState([]);
  const [selectedTil, setSelectedTil] = useState(null);
  const [postboxModalIsOpen, setPostboxModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchTils = async () => {
      try {
        const data = await getUserTils(username);
        setTils(data.til); // `til`은 유저의 TIL 목록을 나타내는 키로 가정
      } catch (error) {
        console.error("Failed to fetch TILs:", error);
      }
    };

    fetchTils();
  }, [username]);

  const handleItemClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleTilClick = () => {
    setTilModalIsOpen(true);
  };

  const closeTilModal = () => {
    setTilModalIsOpen(false);
    setSelectedTil(null);
  };
  const handlePostboxClick = () => {
    setPostboxModalIsOpen(true);
  };

  const closePostboxModal = () => {
    setPostboxModalIsOpen(false);
  };

  const handleAddTil = async (contents) => {
    try {
      const tilData = { contents };
      const updatedData = await addUserTil(username, tilData);
      setTils(updatedData.til);
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

  return (
    <MRBG>
      <h1>My Room</h1>
      <p>여기는 {username} My Room 페이지입니다.</p>

      <button className="item-button" onClick={handleItemClick}>
        아이템
      </button>
      <button className="item-button" onClick={handleTilClick}>
        TIL
      </button>
      <button className="item-button" onClick={handlePostboxClick}>
        쪽지함
      </button>
      <ItemModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        username={username}
      />
      <TilModal
        isOpen={tilModalIsOpen}
        onRequestClose={closeTilModal}
        tils={tils}
        onAddTil={handleAddTil}
        onDeleteTil={handleDeleteTil}
        selectedTil={selectedTil}
        setSelectedTil={setSelectedTil}
      />
      <PostboxModal
        isOpen={postboxModalIsOpen}
        onRequestClose={closePostboxModal}
        username={username}
      />
      <UserProfile username={username} />
    </MRBG>
  );
};

export default MyRoomPage;
