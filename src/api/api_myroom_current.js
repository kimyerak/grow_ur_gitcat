// api_myroom_current.js
import axios from "axios";

export const fetchUserRecord = async (username) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/records/${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
