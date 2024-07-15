import axios from "axios";

// baseURL 설정
const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    accept: "*/*",
  },
  withCredentials: true,
});

/**
 * 특정 유저 정보를 가져오는 함수
 * @param {string} username - 유저 이름
 * @returns {Promise<Object>} - 유저 정보가 담긴 Promise 객체
 */
export const getUserInfo = async (username) => {
  try {
    const response = await instance.get(`/records/${username}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
};
