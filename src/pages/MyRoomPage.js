import React, { useEffect, useState } from "react";
import { getUserInfo } from "../api/api_myroom";
import MRBG from "../components/background_myroom";

const UserProfile = ({ username }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(username);
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
          <p>Email: {userInfo.email}</p>
        </div>
      ) : (
        <p>No user info found</p>
      )}
    </div>
  );
};

const MyRoomPage = ({ username }) => {
  return (
    <MRBG>
      <div>
        <h1>My Room</h1>
        <p>여기는 My Room 페이지입니다. 로그인 후 기본 페이지로 설정됩니다.</p>
        <UserProfile username={username} />
      </div>
    </MRBG>
  );
};

export default MyRoomPage;
