import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import MRBG from "../components/background_myroom";
import { fetchUserRecord } from "../api/api_myroom_current";
import "../styles/MyRoomPage.css";
import ItemModal from "../components/ItemModal";
import TilModal from "../components/TilModal";
import PostboxModal from "../components/PostboxModal";
import { getUserTils, addUserTil, deleteUserTil } from "../api/api_til";

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
          <img src="https://ghchart.rshah.org/syeongkim" />
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
  const [postboxModalIsOpen, setPostboxModalIsOpen] = useState(false);
  const [wornItems, setWornItems] = useState([]);
  const wornItemsRef = useRef([]);

  const fetchUserInfo = useCallback(async () => {
    try {
      const data = await fetchUserRecord(username);
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

  // const onWearItem = (itemName) => {
  //   setWornItems((prevItems) => [
  //     ...prevItems,
  //     { name: itemName, src: itemImages[itemName], id: Date.now() },
  //   ]);
  // };

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
    <MRBG>
      <h1>My Room</h1>
      <p>여기는 {username}의 My Room</p>

      <button className="item-button" onClick={handleItemClick}>
        아이템
      </button>
      <ItemModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        username={username}
        onWearItem={onWearItem}
        onRemoveItem={onRemoveItem}
        fetchUserInfo={fetchUserInfo}
      />
      <button className="item-button" onClick={handleTilClick}>
        TIL
      </button>
      <button className="item-button" onClick={handlePostboxClick}>
        쪽지함
      </button>

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
      <UserProfile username={username} />
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
