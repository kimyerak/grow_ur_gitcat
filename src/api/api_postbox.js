const server_ip = process.env.REACT_APP_NETWORK_IP;
const BASE_URL = `http://${server_ip}:80`;

// 받은 쪽지 가져오기
export const getReceivedMessages = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/received/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching received messages: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching received messages:", error);
    throw error;
  }
};

// 보낸 쪽지 가져오기
export const getSentMessages = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/sent/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching sent messages: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sent messages:", error);
    throw error;
  }
};

// 쪽지 보내기
export const sendMessage = async (message) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Error sending message: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
