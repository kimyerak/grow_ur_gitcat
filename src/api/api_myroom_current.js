// api_myroom_current.js
import axios from "axios";
const server_ip = process.env.REACT_APP_NETWORK_IP;

export const fetchUserRecord = async (username) => {
  try {
    const response = await axios.get(
      `http://${server_ip}:3001/records/${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
