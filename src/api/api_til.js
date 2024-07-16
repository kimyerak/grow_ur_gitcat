import axios from "axios";
const server_ip = process.env.REACT_APP_NETWORK_IP;

// baseURL 설정
const instance = axios.create({
  baseURL: `http://${server_ip}:80`,
  headers: {
    accept: "*/*",
  },
  withCredentials: true,
});

/**
 * 특정 유저의 TIL 정보를 가져오는 함수
 * @param {string} username - 유저 이름
 * @returns {Promise<Object>} - 유저 정보가 담긴 Promise 객체
 */
export const getUserTils = async (username) => {
  try {
    const response = await instance.get(`/usertils/${username}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user TILs:", error);
    throw error;
  }
};

/**
 * 특정 유저의 TIL을 추가하는 함수
 * @param {string} username - 유저 이름
 * @param {Object} tilData - 추가할 TIL 데이터
 * @returns {Promise<Object>} - 업데이트된 유저 정보가 담긴 Promise 객체
 */
export const addUserTil = async (username, tilData) => {
  try {
    const response = await instance.post(`/usertils/${username}/til`, tilData);
    try {
      const responseCoin = await instance.put(`/records/updateCoin/${username}`, {
        amount: 3,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
    return response.data;
  } catch (error) {
    console.error("Failed to add user TIL:", error);
    throw error;
  }
};

/**
 * 특정 유저의 TIL을 삭제하는 함수
 * @param {string} username - 유저 이름
 * @param {string} id - 삭제할 TIL의 ID
 * @returns {Promise<Object>} - 업데이트된 유저 정보가 담긴 Promise 객체
 */
export const deleteUserTil = async (username, id) => {
  try {
    const response = await instance.delete(`/usertils/${username}/til/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete user TIL:", error);
    throw error;
  }
};