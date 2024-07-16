import React, { useEffect, useState } from "react";
import {
  getCommitKing,
  getCommunicationKing,
  getConsistentTil,
} from "../api/api_kings";
import "../styles/PartyPage.css";
import BackgroundParty from "../components/background_party";

const PartyPage = () => {
  const [commitKing, setCommitKing] = useState(null);
  const [communicationKing, setCommunicationKing] = useState(null);
  const [consistentUsers, setConsistentUsers] = useState([]);

  useEffect(() => {
    const fetchKings = async () => {
      try {
        const commitKingData = await getCommitKing();
        console.log("Commit King Data:", commitKingData);
        setCommitKing(commitKingData);

        const communicationKingData = await getCommunicationKing();
        console.log("Communication King Data:", communicationKingData);
        setCommunicationKing(communicationKingData);

        const consistentUsersData = await getConsistentTil(7); // 예를 들어 7일로 설정
        console.log("Consistent Users Data:", consistentUsersData);
        setConsistentUsers(consistentUsersData.consistentUserList);
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
              <h2>금주의 커밋왕</h2>
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
    </BackgroundParty>
  );
};

export default PartyPage;
