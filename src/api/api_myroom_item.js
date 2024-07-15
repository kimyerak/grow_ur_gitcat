// api_myroom_item.js
const BASE_URL = "http://localhost:3001";

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
