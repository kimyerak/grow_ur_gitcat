import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyRoomPage from "./pages/MyRoomPage";
import PartyPage from "./pages/PartyPage";
import SignInPage from "./pages/SignInPage";
import Layout from "./components/Layout";

const App = () => {
  const isLoggedIn = () => localStorage.getItem("loggedIn") === "true";

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/myroom" element={<MyRoomPage />} />
        <Route path="/party" element={<PartyPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn() ? "/myroom" : "/signin"} />}
        />
      </Routes>
    </Layout>
  );
};

export default App;
