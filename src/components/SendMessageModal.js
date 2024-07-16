import React, { useState } from 'react';
import Modal from 'react-modal';

const SendMessageModal = ({ isOpen, onRequestClose, onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSendMessage({ message });
    setMessage("");
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Send a Message</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          required
        />
        <button type="submit">Send</button>
      </form>
    </Modal>
  );
};

export default SendMessageModal;
