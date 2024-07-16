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
import { FaPencilAlt } from "react-icons/fa";

const PostboxModal = ({ isOpen, onRequestClose, username }) => {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ receiver: "", contents: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const receivedData = await getReceivedMessages(username);
        const sentData = await getSentMessages(username);
        setReceivedMessages(receivedData);
        setSentMessages(sentData);
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
    } catch (error) {
      setError(error);
    }
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
                onChange={(e) =>
                  setNewMessage({ ...newMessage, receiver: e.target.value })
                }
              />
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
