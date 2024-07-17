import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MRBG from "../components/background_myroom";
import { fetchUserRecord } from "../api/api_myroom_current";
import "../styles/MyRoomPage.css";
import ItemModal from "../components/ItemModal";
import TilModal from "../components/TilModal";
import PostboxModal from "../components/PostboxModal";
import ProfileModal from "../components/ProfileModal";

const itemImages = {
  "🎧 헤드셋": "/assets/headset.png",
  "🍀 클로버": "/assets/clover.png",
  "🚬 담배": "/assets/cigarette.png",
  "☕ 커피": "../assets/coffee.png",
  "👔 체크남방": "/assets/shirt.png",
  "🧢 모자": "/assets/cap.png",
  "👓 블루라이트 차단안경": "/assets/glasses.png",
  "🖱 마우스": "/assets/mouse.png",
  "⌨ 키보드": "/assets/keyboard.png",
  "🍺 맥주": "/assets/beer.png",
  "🧋 버블티": "/assets/bubble_tea.png",
  "🛋 빈백": "/assets/bean_bag.png",
  "🍭 간식": "/assets/snack.png",
  "💻 노트북": "/assets/laptop.png",
};

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
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tilModalIsOpen, setTilModalIsOpen] = useState(false);
  const [postboxModalIsOpen, setPostboxModalIsOpen] = useState(false);
  const [profileModalIsOpen, setProfileModalIsOpen] = useState(false);
  const [wornItems, setWornItems] = useState([]);
  const wornItemsRef = useRef([]);
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = useCallback(async () => {
    try {
      const data = await fetchUserRecord(username);
      setUserInfo(data);
      const initialWornItems = data.wearing_items.map((item, index) => ({
        name: item,
        src: itemImages[item],
        id: Date.now() + index,
        x: 0,
        y: 0,
        dragging: false,
      }));
      setWornItems(initialWornItems);
      wornItemsRef.current = initialWornItems;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  }, [username]);

  useEffect(() => {
    fetchUserInfo();

    const handleMouseMove = (e) => {
      wornItemsRef.current = wornItemsRef.current.map((item) =>
        item.dragging
          ? {
              ...item,
              x: e.clientX - item.offsetX,
              y: e.clientY - item.offsetY,
            }
          : item
      );
      setWornItems([...wornItemsRef.current]);
    };

    const handleMouseUp = () => {
      wornItemsRef.current = wornItemsRef.current.map((item) =>
        item.dragging ? { ...item, dragging: false } : item
      );
      setWornItems([...wornItemsRef.current]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [fetchUserInfo]);

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
  };
  const handlePostboxClick = () => {
    setPostboxModalIsOpen(true);
  };

  const closePostboxModal = () => {
    setPostboxModalIsOpen(false);
  };
  const handleProfileClick = () => {
    setProfileModalIsOpen(true);
  };

  const closeProfileModal = () => {
    setProfileModalIsOpen(false);
  };
  const handlePartyClick = () => {
    navigate("/party"); // party 페이지로 이동
  };

  const onWearItem = (itemName) => {
    const newItem = {
      name: itemName,
      src: itemImages[itemName],
      id: Date.now(),
      x: 0,
      y: 0,
      dragging: false,
    };
    setWornItems((prevItems) => [...prevItems, newItem]);
  };

  const onRemoveItem = (itemName) => {
    setWornItems((prevItems) =>
      prevItems.filter((item) => item.name !== itemName)
    );
  };

  const handleMouseDown = (id, e) => {
    wornItemsRef.current = wornItems.map((item) =>
      item.id === id
        ? {
            ...item,
            dragging: true,
            offsetX: e.clientX - item.x,
            offsetY: e.clientY - item.y,
          }
        : item
    );
    setWornItems([...wornItemsRef.current]);
  };

  return (
    <MRBG
      onItemClick={handleItemClick}
      onTilClick={handleTilClick}
      onPostboxClick={handlePostboxClick}
      username={username}
    >
      {userInfo && userInfo.hasCommit && (
        <img
          src="/assets/sun.png"
          alt="Rainbow"
          style={{
            position: "absolute",
            top: "30px",
            right: "20px",
            width: "300px", // 적절한 크기로 설정
            height: "300px", // 적절한 크기로 설정
          }}
        />
      )}
      <p className="username-text">{username}'s Room</p>
      <div className="left-buttons">
        <button className="profile-button" onClick={handleProfileClick}>
          <img
            src="/assets/profile.png"
            alt="Profile"
            className="profile-image"
          />
        </button>

        <button className="profile-button" onClick={handlePartyClick}>
          <img
            src="/assets/disco-ball-yellow.png"
            alt="Disco Ball"
            className="profile-image"
          />
        </button>
        <div className="clover-coin">
          <img src="/assets/clover.png" alt="Clover" className="clover-image" />
          <span className="coin-text">{userInfo && userInfo.coin}</span>
        </div>
      </div>
      <ItemModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        username={username}
        onWearItem={onWearItem}
        onRemoveItem={onRemoveItem}
        fetchUserInfo={fetchUserInfo}
      />

      <TilModal
        isOpen={tilModalIsOpen}
        onRequestClose={closeTilModal}
        username={username}
      />
      <PostboxModal
        isOpen={postboxModalIsOpen}
        onRequestClose={closePostboxModal}
        username={username}
      />
      <ProfileModal
        isOpen={profileModalIsOpen}
        onRequestClose={closeProfileModal}
        userInfo={userInfo}
      />
      {wornItems.map((item) => (
        <img
          key={item.id}
          src={item.src}
          alt={item.name}
          className="draggable"
          style={{
            position: "absolute",
            left: item.x || 0,
            top: item.y || 0,
            cursor: "grab",
          }}
          onMouseDown={(e) => handleMouseDown(item.id, e)}
        />
      ))}
    </MRBG>
  );
};

export default MyRoomPage;
