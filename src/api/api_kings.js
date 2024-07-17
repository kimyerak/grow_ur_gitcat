// api_kings.js
import axios from "axios";
const server_ip = process.env.REACT_APP_NETWORK_IP;

const API_URL = `http://${server_ip}:80`; // 백엔드 URL을 실제 값으로 변경하세요

export const getCommitKing = async () => {
  try {
    const response = await axios.get(`${API_URL}/party/commitking`);
    console.log("Commit King Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching commit king", error);
    throw error;
  }
};

export const getCommunicationKing = async () => {
  try {
    const response = await axios.get(`${API_URL}/party/communicationking`);
    console.log("Communication King Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching communication king", error);
    throw error;
  }
};

export const getConsistentTil = async () => {
  try {
    const response = await axios.get(`${API_URL}/party/consistenttil`);
    console.log("Consistent Til Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching consistent TIL users", error);
    throw error;
  }
};

export const getAllUserMessage = async () => {
  try {
    const response = await axios.get(`${API_URL}/records`);
    return response.data;
  } catch (e) {
    console.error("Error fetching all user messages", e);
    throw e;
  }
}

export const getCoinFromGame = async (username, cost) => {
  try {
    const response = await fetch(`${API_URL}/records/updateCoin/${username}`, {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: cost }),
    })

    if (!response.ok) {
      throw new Error(`Error updating coin: ${response.statusText}`);
    }
  } catch (e) {
    console.error('Error buying shop items:', e);
    throw e;
  }
};