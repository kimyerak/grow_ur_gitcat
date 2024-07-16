import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../styles/ItemModal.css";
import {
  getUserItems,
  updateUserItem,
  addUserItem,
  buyShopItems,
  sendGift,
  getUsers,
} from "../api/api_myroom_item";

const shopItemsList = [
  { name: "🎧 헤드셋", price: 100 },
  { name: "🍀 클로버", price: 50 },
  { name: "🚬 담배", price: 30 },
  { name: "☕ 커피", price: 20 },
  { name: "👔 체크남방", price: 150 },
  { name: "🧢 모자", price: 80 },
  { name: "👓 블루라이트 차단안경", price: 120 },
  { name: "🖱 마우스", price: 60 },
  { name: "⌨ 키보드", price: 70 },
  { name: "🍺 맥주", price: 40 },
  { name: "🧋 버블티", price: 30 },
  { name: "🛋 빈백", price: 200 },
  { name: "🍭 간식", price: 15 },
  { name: "💻 노트북", price: 300 },
];
Modal.setAppElement("#root");
const ItemModal = ({
  isOpen,
  onRequestClose,
  username,
  onWearItem,
  onRemoveItem,
  fetchUserInfo,
}) => {
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const userItemsData = await getUserItems(username);
        setUserItems(userItemsData.items);
        // 가정: 상점 아이템 목록을 가져오는 함수가 존재한다고 가정
        // const shopItemsData = await getShopItems();
        // setShopItems(shopItemsData);
        // setUserItems(userItemsData.items);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    if (isOpen) {
      fetchItems();
      fetchUsers();
    }
  }, [isOpen, username]);

  // const handleWearItem = async (itemName, currentStatus) => {
  //   try {
  //     const updatedItem = { current: currentStatus };
  //     await updateUserItem(username, itemName, updatedItem);
  //     const updatedUserItems = userItems.map((item) =>
  //       item.name === itemName ? { ...item, current: currentStatus } : item
  //     );
  //     setUserItems(updatedUserItems);
  //     if (currentStatus) {
  //       onWearItem(itemName);
  //     } else {
  //       onRemoveItem(itemName);
  //     }
  //   } catch (err) {
  //     setError(err);
  //   }
  // };
  const handleWearItem = async (itemName, currentStatus) => {
    try {
      const updatedItem = { current: currentStatus };
      await updateUserItem(username, itemName, updatedItem);
      await fetchUserInfo(); // 최신 사용자 정보를 가져옴
      if (currentStatus) {
        onWearItem(itemName);
      } else {
        onRemoveItem(itemName);
      }
    } catch (err) {
      setError(err);
    }
  };

  const handleBuyItem = async (item) => {
    try {
      const newItem = { ...item, stocks: 1, current: false };
      await addUserItem(username, newItem);
      await buyShopItems(username, item.price);
      const updatedUserItems = [...userItems, { ...newItem, _id: Date.now() }];
      setUserItems(updatedUserItems);
      await fetchUserInfo();
    } catch (err) {
      setError(err);
    }
  };

  const handleSendGift = async () => {
    try {
      await sendGift(username, selectedUser, selectedItem.name);
      const updatedUserItems = userItems
        .map((item) =>
          item.name === selectedItem.name
            ? { ...item, stocks: item.stocks - 1 }
            : item
        )
        .filter((item) => item.stocks > 0); // 재고가 0인 아이템은 목록에서 제거
      setUserItems(updatedUserItems);
      setSelectedUser("");
      setSelectedItem(null);
      setIsGiftModalOpen(false);
      await fetchUserInfo();
    } catch (err) {
      setError(err);
    }
  };

  const openGiftModal = (item) => {
    setSelectedItem(item);
    setIsGiftModalOpen(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="styled-modal"
      overlayClassName="Overlay"
    >
      <h2>아이템</h2>
      <button className="close-button" onClick={onRequestClose}>
        닫기
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <Tabs>
          <TabList className="styled-tab-list">
            <Tab className="styled-tab">내 아이템</Tab>
            <Tab className="styled-tab">상점</Tab>
          </TabList>

          <TabPanel>
            <h3>내 아이템 목록</h3>
            {userItems && userItems.length > 0 ? (
              <div className="item-list">
                {userItems.map((item) => (
                  <div key={item._id} className="item-card">
                    <p>이름: {item.name}</p>
                    <p>수량: {item.stocks}</p>
                    <p>현재 사용 중: {item.current ? "예" : "아니오"}</p>
                    <button onClick={() => handleWearItem(item.name, true)}>
                      착용
                    </button>
                    <button onClick={() => handleWearItem(item.name, false)}>
                      착용해제
                    </button>
                    <button onClick={() => openGiftModal(item)}>
                      선물하기
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>아이템이 없습니다.</p>
            )}
          </TabPanel>
          <TabPanel>
            <h3>상점 아이템 목록</h3>
            {shopItemsList && shopItemsList.length > 0 ? (
              <div className="item-list">
                {shopItemsList.map((item, index) => (
                  <div key={index} className="item-card">
                    <p>이름: {item.name}</p>
                    <p>가격: {item.price}</p>
                    <button onClick={() => handleBuyItem(item)}>구매</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>상점에 아이템이 없습니다.</p>
            )}
          </TabPanel>
        </Tabs>
      )}
      <Modal
        isOpen={isGiftModalOpen}
        onRequestClose={() => setIsGiftModalOpen(false)}
        className="styled-modal"
        overlayClassName="Overlay"
      >
        <h2>선물할 사용자 선택</h2>
        <ul>
          {users.map((user) => (
            <li key={user.username}>
              <button onClick={() => setSelectedUser(user.username)}>
                {user.username}
              </button>
            </li>
          ))}
        </ul>
        {selectedUser && (
          <div>
            <p>
              {selectedUser}에게 {selectedItem?.name}을(를) 선물하시겠습니까?
            </p>
            <button onClick={handleSendGift}>Confirm</button>
            <button onClick={() => setIsGiftModalOpen(false)}>Cancel</button>
          </div>
        )}
      </Modal>
    </Modal>
  );
};

export default ItemModal;
