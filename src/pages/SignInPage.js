import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:3001/auth/github", {
        // withCredentials: true,
      });
      const { url } = response.data;
      window.location.href = url;
    } catch (error) {
      console.error("로그인 ㅎ오류:", error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <p>여기는 로그인 페이지입니다.</p>
      <button onClick={handleLogin}>깃헙 로그인</button>
    </div>
  );
};

export default SignInPage;
