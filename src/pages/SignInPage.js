// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import SIBG from "../components/background_signin";

// const SignInPage = () => {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     window.location.href = "http://localhost:3001/auth/github";
//   };

//   useEffect(() => {
//     const handleCallback = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const code = urlParams.get("code");
//       console.log("OAuth code:", code);
//       // console.log("poiu");
//       if (code) {
//         try {
//           const response = await axios.get(
//             `http://localhost:3001/auth/github/callback?code=${code}`,
//             { withCredentials: true }
//           );
//           console.log("asdf");
//           if (response.data.username) {
//             console.log("qwer");
//             localStorage.setItem("username", response.data.username);
//             navigate(`/myroom/${response.data.username}`);
//           } else {
//             localStorage.removeItem("username");
//             console.log("zxcv");
//             navigate("/signin");
//           }
//         } catch (error) {
//           console.error("로그인 상태 확인 오류:", error);
//           localStorage.removeItem("username");
//           navigate("/signin");
//         }
//       }
//     };

//     handleCallback();
//   }, [navigate]);

//   return (
//     <SIBG>
//       <h1>Sign In</h1>
//       <p>여기는 로그인 페이지입니다.</p>
//       <button onClick={handleLogin}>깃헙 로그인</button>
//     </SIBG>
//   );
// };

// export default SignInPage;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SIBG from "../components/background_signin";

const SignInPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      navigate(`/myroom/${username}`);
    }
  }, [navigate]);

  const handleLogin = () => {
    window.location.href = "http://localhost:3001/auth/github";
  };

  return (
    <SIBG>
      <h1>Sign In</h1>
      <p>여기는 로그인 페이지입니다.</p>
      <button onClick={handleLogin}>깃헙 로그인</button>
    </SIBG>
  );
};

export default SignInPage;
