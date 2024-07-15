import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyRoomPage from "./pages/MyRoomPage";
import PartyPage from "./pages/PartyPage";
import SignInPage from "./pages/SignInPage";
import Layout from "./components/Layout";
import RedirectToMyRoom from "./pages/RedirectToMyRoom";

const App = () => {
  const username = localStorage.getItem("username");

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/myroom/:username"
          element={username ? <MyRoomPage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/party"
          element={username ? <PartyPage /> : <Navigate to="/signin" />}
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/RedirectToMyRoom" element={<RedirectToMyRoom />} />
        <Route
          path="*"
          element={
            <Navigate to={username ? `/myroom/${username}` : "/signin"} />
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
