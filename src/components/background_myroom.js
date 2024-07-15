// src/components/background_myroom.js
import styled from "styled-components";
import myRoomBackground from "../assets/background_myroom.png"; // 배경 이미지 경로

const MRBG = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${myRoomBackground});
  background-size: cover;
  background-position: center;
`;

export default MRBG;
