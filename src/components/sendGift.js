// src/SendGift.js
import React, { useState, useEffect } from 'react';
import { sendGift, getUsers } from './api';
import Modal from 'react-modal';

const SendGift = () => {
  const [senderUsername, setSenderUsername] = useState('');
  const [receiverUsername, setReceiverUsername] = useState('');
  const [itemName, setItemName] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSendGift = async () => {
    try {
      await sendGift(senderUsername, receiverUsername, itemName);
      setMessage(`Successfully sent ${itemName} from ${senderUsername} to ${receiverUsername}`);
      setIsModalOpen(false);
    } catch (error) {
      setMessage('Failed to send gift');
    }
  };

  return (
    <div>
      <h1>Send a Gift</h1>
      <div>
        <label>
          Sender Username:
          <input
            type="text"
            value={senderUsername}
            onChange={(e) => setSenderUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Item Name:
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </label>
      </div>
      <button onClick={() => setIsModalOpen(true)}>선물하기</button>
      {message && <p>{message}</p>}

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Select a User to Send Gift</h2>
        <ul>
          {users.map(user => (
            <li key={user.username}>
              <button onClick={() => setReceiverUsername(user.username)}>
                {user.username}
              </button>
            </li>
          ))}
        </ul>
        {receiverUsername && (
          <div>
            <p>Are you sure you want to send {itemName} to {receiverUsername}?</p>
            <button onClick={handleSendGift}>Confirm</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SendGift;
