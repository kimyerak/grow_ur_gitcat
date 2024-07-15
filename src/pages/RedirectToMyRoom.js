import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RedirectToMyRoom = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      console.log("OAuth code from redirect.js:", code);

      if (code) {
        try {
          const response = await axios.get(
            `http://localhost:3001/auth/github/callback?code=${code}`,
            { withCredentials: true }
          );
          if (response.data.username) {
            localStorage.setItem("username", response.data.username);
            navigate(`/myroom/${response.data.username}`);
          } else {
            localStorage.removeItem("username");
            navigate("/signin");
          }
        } catch (error) {
          console.error("로그인 상태 확인 오류:", error);
          localStorage.removeItem("username");
          navigate("/signin");
        } finally {
          setLoading(false);
        }
      } else {
        const username = localStorage.getItem("username");

        if (!username) {
          navigate("/signin");
        } else {
          navigate(`/myroom/${username}`);
        }
        setLoading(false);
      }
    };

    handleCallback();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Redirecting...</div>;
};

export default RedirectToMyRoom;
