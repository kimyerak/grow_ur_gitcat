import React from "react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    alert("로그아웃 되었습니다.");
    navigate("/signin");
  };

  const username = localStorage.getItem("username");

  return (
    <div>
      <header style={headerStyle}>
        <nav style={navStyle}>
          <div>
            <a href={`/myroom/${username}`} style={linkStyle}>
              MyRoom
            </a>
            <a href="/party" style={linkStyle}>
              Party
            </a>
          </div>
          <div>
            <button style={buttonStyle} onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </nav>
      </header>
      <main style={mainStyle}>{children}</main>
    </div>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "#fff",
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

const linkStyle = {
  margin: "0 10px",
  color: "#fff",
  textDecoration: "none",
};

const buttonStyle = {
  margin: "0 10px",
  padding: "5px 10px",
  backgroundColor: "#555",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const mainStyle = {
  padding: "20px",
};

export default Layout;
