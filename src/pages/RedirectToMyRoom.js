import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";

const RedirectToMyRoom = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOAuthCallback = async (code) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/auth/github/callback?code=${code}`,
          { withCredentials: true }
        );
        console.log("response:", response);
        if (response.data.username) {
          console.log("response.data.username:", response.data.username);
          window.location.href = `http://localhost:3000/myroom/${response.data.username}`;
          localStorage.setItem("username", response.data.username);
        } else {
          localStorage.removeItem("username");
          navigate("/signin");
        }
      } catch (error) {
        console.error("로그인 상태 확인 오류:", error);
        localStorage.setItem("error", error);
        localStorage.removeItem("username");
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    const handleLocalStorageCheck = async (username) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/records/${username}`
        );
        localStorage.setItem("username", response.data.username);
        navigate(`/myroom/${response.data.username}`);
      } catch (err) {
        console.log(err);
        setError(err);
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      console.log("OAuth code:", code);

      if (code) {
        console.log("code is valid");
        await handleOAuthCallback(code);
      } else {
        const username = localStorage.getItem("username");

        if (!username) {
          navigate("/signin");
          setLoading(false);
          return;
        }

        await handleLocalStorageCheck(username);
      }
    };

    handleCallback();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Redirecting...</div>;
};


export default RedirectToMyRoom;
