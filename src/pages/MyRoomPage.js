import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MRBG from "../components/background_myroom";

const UserProfile = ({ username }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log("상우짱");
        const response = await axios.get(
          `http://localhost:3001/records/${username}`
        );
        setUserInfo(response.data);
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
          <img src="/assets/cat4.png" alt="Cat Default" />
        </div>
      ) : (
        <p>No user info found</p>
      )}
    </div>
  );
};

const MyRoomPage = () => {
  const { username } = useParams();
  console.log("asdf");

  return (
    <MRBG>
      <h1>My Room</h1>
      <p>여기는 My Room 페이지입니다. 로그인 후 기본 페이지로 설정됩니다.</p>
      <UserProfile username={username} />
    </MRBG>
  );
};

export default MyRoomPage;
