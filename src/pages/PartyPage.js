import React, { useEffect, useState } from "react";
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
              <h2>금주의 커밋왕@@</h2>
              <img
                src={commitKing.profilePic}
                alt="Commit King"
                className="profile-pic"
              />
              <p>이름: {commitKing.username}</p>
              <p>커밋 횟수: {commitKing.commitCount}</p>
            </div>
          )}
          {communicationKing && (
            <div className="king-card">
              <h2>금주의 소통왕</h2>
              <img
                src={communicationKing.profilePic}
                alt="Communication King"
                className="profile-pic"
              />
              <p>이름: {communicationKing.username}</p>
              <p>보낸 쪽지 개수: {communicationKing.count}</p>
            </div>
          )}
          {consistentUsers.length > 0 && (
            <div className="king-card">
              <h2>금주의 성실왕</h2>
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
        <p>is it here?</p>
        <img src="../assets/clover.png" alt="Game Icon" onClick={openGameModal} style={{ cursor: 'pointer' }} /> {/* 게임 아이콘 추가 */}
      </div>
      <GameModal // 추가된 부분
        isOpen={gameModalIsOpen}
        onRequestClose={closeGameModal}
      />
    </BackgroundParty>
  );
};

export default PartyPage;
