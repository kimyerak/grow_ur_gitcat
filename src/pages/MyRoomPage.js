// MyRoomPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MRBG from "../components/background_myroom";
import { fetchUserRecord } from "../api/api_myroom_current";

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

  return (
    <MRBG>
      <h1>My Room</h1>
      <p>여기는 My Room 페이지입니다. 로그인 후 기본 페이지로 설정됩니다.</p>
      <img src="/assets/cat4.png" alt="Cat Default" />
      <UserProfile username={username} />
    </MRBG>
  );
};

export default MyRoomPage;
