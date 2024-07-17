import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCommitKing,
  getCommunicationKing,
  getConsistentTil,
  getAllUserMessage,
} from "../api/api_kings";
import "../styles/PartyPage.css";
import BackgroundParty from "../components/background_party";
import SendMessageModal from '../components/SendMessageModal';
import { sendMessage } from '../api/api_postbox';
import GameModal from '../components/GameModal'; // 추가된 부분

const PartyPage = () => {
  const navigate = useNavigate();
  const [commitKing, setCommitKing] = useState(null);
  const [communicationKing, setCommunicationKing] = useState(null);
  const [consistentUsers, setConsistentUsers] = useState([]);
  const [allUserMessages, setAllUserMessages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [gameModalIsOpen, setGameModalIsOpen] = useState(false); // 추가된 부분

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  const handleSendMessage = async (messageContent) => {
    const me = localStorage.getItem('username');
    const message = {
      sender: me,
      receiver: selectedUser.username,
      contents: messageContent.message
    };
    try {
      await sendMessage(message);
    } catch (error) {
      console.log(error);
    }
  };

  const openGameModal = () => { // 추가된 부분
    console.log("Opening game modal");
    setGameModalIsOpen(true);
  };

  const closeGameModal = () => { // 추가된 부분
    setGameModalIsOpen(false);
  };

  const navigateToHome = () => {
    const username = localStorage.getItem('username');
    navigate(`/myhome/${username}`);
  };

  
  useEffect(() => {
    const fetchKings = async () => {
      try {
        const commitKingData = await getCommitKing();
        console.log("Commit King Data:", commitKingData);
        setCommitKing(commitKingData);

        const communicationKingData = await getCommunicationKing();
        console.log("Communication King Data:", communicationKingData);
        setCommunicationKing(communicationKingData);

        const consistentUsersData = await getConsistentTil(); // 예를 들어 7일로 설정
        console.log("Consistent Users Data:", consistentUsersData);
        setConsistentUsers(consistentUsersData.consistentUserList);

        const allUserMessages = await getAllUserMessage();
        console.log("All User Messages:", allUserMessages);
        setAllUserMessages(allUserMessages);
      } catch (error) {
        console.error("Error fetching kings data", error);
      }
    };
    fetchKings();
  }, []);

  return (
    <BackgroundParty>
      <div className="party-page">
        <div className="kings-container">
          {commitKing && (
            <div className="king-card">
              <p>👑👑👑</p>
              <h3>Commit King</h3>
              <p>user name: {commitKing.username}</p>
              <p>commit count: {commitKing.commitCount}</p>
            </div>
          )}
          {communicationKing && (
            <div className="king-card">
              <p>👑👑👑</p>
              <h3>Communication King</h3>
              <p>user name: {communicationKing.username}</p>
              <p>post count: {communicationKing.count}</p>
            </div>
          )}
          {consistentUsers.length > 0 && (
            <div className="king-card">
              <p>👑👑👑</p>
              <h3>Passionate User</h3>
              <ul>
                {consistentUsers.map((user, index) => (
                  <li key={index}>{user}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="message-container">
        {allUserMessages.map((user, index) => (
          <div
            key={index}
            className="here"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              position: 'absolute',
            }}
          >
            <div className="message">
              <p>{user.message}</p>
            </div>
            <img src="../assets/cat4.png" alt="cat" onClick={() => openModal(user)} style={{ cursor: 'pointer' }} />
            <p className="username">{user.username}</p>
          </div>
        ))}
        <SendMessageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onSendMessage={handleSendMessage}
        />
      </div>
      <div className="game-icon">
        <img src="../assets/clover.png" alt="Game Icon" onClick={openGameModal} style={{ cursor: 'pointer', width: '80px', height: '80px' }} /> {/* 게임 아이콘 추가 */}
      </div>
      <GameModal // 추가된 부분
        isOpen={gameModalIsOpen}
        onRequestClose={closeGameModal}
      />
      <div className="back-to-home" onClick={navigateToHome} style={{ position: 'absolute', bottom: '10px', left: '10px', cursor: 'pointer', color: 'white' }}>
        Back to my home
      </div>
    </BackgroundParty>
  );
};

export default PartyPage;
