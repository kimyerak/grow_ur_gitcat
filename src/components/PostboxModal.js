import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../styles/PostboxModal.css";
import {
  getReceivedMessages,
  getSentMessages,
  sendMessage,
} from "../api/api_postbox";
import { getUsers } from "../api/api_myroom_item";
import { FaPencilAlt } from "react-icons/fa";

const PostboxModal = ({ isOpen, onRequestClose, username }) => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ receiver: "", contents: "" });
  const [allUsers, setAllUsers] = useState([]); // 사용자 목록을 위한 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 표시 여부

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const receivedData = await getReceivedMessages(username);
        const sentData = await getSentMessages(username);
        const usersData = await getUsers();
        setReceivedMessages(receivedData);
        setSentMessages(sentData);
        setAllUsers(usersData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen, username]);

  const handleSendMessage = async () => {
    if (newMessage.receiver.trim() === "" || newMessage.contents.trim() === "")
      return;
    try {
      const messageData = { ...newMessage, sender: username };
      await sendMessage(messageData);
      setNewMessage({ receiver: "", contents: "" });
      const sentData = await getSentMessages(username); 
      setSentMessages(sentData);
    } catch (error) {
      setError(error);
    }
  };

  const handleReceiverChange = (receiver) => {
    setNewMessage({ ...newMessage, receiver });
    setShowDropdown(false); // 드롭다운 닫기
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="styled-modal"
      overlayClassName="Overlay"
    >
      <h2>쪽지함</h2>
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
            <Tab className="styled-tab">받은 편지함</Tab>
            <Tab className="styled-tab">보낸 편지함</Tab>
            <Tab className="styled-tab">
              <FaPencilAlt />
            </Tab>
          </TabList>

          <TabPanel>
            <h3>받은 편지함</h3>
            {receivedMessages.length > 0 ? (
              <ul className="message-list">
                {receivedMessages.map((message) => (
                  <li key={message._id}>
                    <p>From: {message.sender}</p>
                    <p>{message.contents}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>받은 편지가 없습니다.</p>
            )}
          </TabPanel>
          <TabPanel>
            <h3>보낸 편지함</h3>
            {sentMessages.length > 0 ? (
              <ul className="message-list">
                {sentMessages.map((message) => (
                  <li key={message._id}>
                    <p>To: {message.receiver}</p>
                    <p>{message.contents}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>보낸 편지가 없습니다.</p>
            )}
          </TabPanel>
          <TabPanel>
            <h3>편지 작성</h3>
            <div className="message-form">
              <input
                type="text"
                placeholder="받는 사람"
                value={newMessage.receiver}
                onFocus={() => setShowDropdown(true)} // 입력란 클릭 시 드롭다운 표시
                onChange={(e) =>
                  setNewMessage({ ...newMessage, receiver: e.target.value })
                }
              />
              {showDropdown && (
                <ul className="dropdown">
                  {allUsers
                    .filter((user) =>
                      user.username
                        .toLowerCase()
                        .includes(newMessage.receiver.toLowerCase())
                    )
                    .map((user) => (
                      <li
                        key={user.username}
                        onClick={() => handleReceiverChange(user.username)}
                      >
                        {user.username}
                      </li>
                    ))}
                </ul>
              )}
              <textarea
                placeholder="내용"
                value={newMessage.contents}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, contents: e.target.value })
                }
              />
              <button onClick={handleSendMessage}>보내기</button>
            </div>
          </TabPanel>
        </Tabs>
      )}
    </Modal>
  );
};

export default PostboxModal;
