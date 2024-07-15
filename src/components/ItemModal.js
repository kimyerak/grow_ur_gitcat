import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../styles/ItemModal.css";
import { getUserItems } from "../api/api_myroom_item";

const ItemModal = ({ isOpen, onRequestClose, username }) => {
  const [userItems, setUserItems] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const userItemsData = await getUserItems(username);
        setUserItems(userItemsData.items);
        // 가정: 상점 아이템 목록을 가져오는 함수가 존재한다고 가정
        // const shopItemsData = await getShopItems();
        // setShopItems(shopItemsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchItems();
    }
  }, [isOpen, username]);

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
              <ul>
                {userItems.map((item) => (
                  <li key={item._id}>
                    <p>이름: {item.name}</p>
                    <p>수량: {item.stocks}</p>
                    <p>현재 사용 중: {item.current ? "예" : "아니오"}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>아이템이 없습니다.</p>
            )}
          </TabPanel>
          <TabPanel>
            <h3>상점 아이템 목록</h3>
            {shopItems && shopItems.length > 0 ? (
              <ul>
                {shopItems.map((item) => (
                  <li key={item._id}>
                    <p>이름: {item.name}</p>
                    <p>가격: {item.price}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>상점에 아이템이 없습니다.</p>
            )}
          </TabPanel>
        </Tabs>
      )}
    </Modal>
  );
};

export default ItemModal;
