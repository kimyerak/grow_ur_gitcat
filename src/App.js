import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyRoomPage from "./pages/MyRoomPage";
import PartyPage from "./pages/PartyPage";
import SignInPage from "./pages/SignInPage";
import Layout from "./components/Layout";
import RedirectToMyRoom from "./pages/RedirectToMyRoom";
import MyTilPage from "./pages/MyTilPage";

const App = () => {
  const username = localStorage.getItem("username");

  return (
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
      <Route path="/mytil/:username" element={<MyTilPage />} />
      <Route
        path="*"
        element={<Navigate to={username ? `/myroom/${username}` : "/signin"} />}
      />
    </Routes>
  );
};

export default App;
