// api_myroom_item.js
const server_ip = process.env.REACT_APP_NETWORK_IP;
const BASE_URL = `http://${server_ip}:3001`;

export const getUserItems = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/useritems/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user items: ${response.statusText}`);
    }
    console.log(response);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addUserItem = async (username, item) => {
  try {
    const response = await fetch(`${BASE_URL}/useritems/${username}/item`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(`Error adding user item: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserItem = async (username, itemName, item) => {
  try {
    const response = await fetch(
      `${BASE_URL}/useritems/${username}/items/${itemName}`,
      {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );

    if (!response.ok) {
      throw new Error(`Error updating user item: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendGift = async (senderUsername, receiverUsername, itemName) => {
  try {
    const response = await fetch(`${BASE_URL}/useritems/sendgift`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senderUsername, receiverUsername, itemName }),
    });

    if (!response.ok) {
      throw new Error(`Error sending gift: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending gift:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/useritems`, {
      method: 'GET',
      headers: {
        Accept: '*/*',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const buyShopItems = async (username, cost) => {
  try {
    const response = await fetch(`${BASE_URL}/records/updateCoin/${username}`, {
      method: 'PUT',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: -1 * cost }),
    })

    if (!response.ok) {
      throw new Error(`Error updating coin: ${response.statusText}`);
    }
  } catch (e) {
    console.error('Error buying shop items:', e);
    throw e;
  }
};