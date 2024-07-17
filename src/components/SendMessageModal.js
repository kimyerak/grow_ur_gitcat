import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    width: '300px', // 원하는 너비
    height: '400px', // 원하는 높이
    margin: 'auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
};

const textareaStyles = {
  flex: 1,
  resize: 'none',
  width: '100%',
  boxSizing: 'border-box',
  marginBottom: '10px'
};

const buttonContainerStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
};

const buttonStyles = {
  backgroundColor: '#ccc',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const SendMessageModal = ({ isOpen, onRequestClose, onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSendMessage({ message });
    setMessage("");
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2>쪽지 보내기</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <textarea
          style={textareaStyles}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <div style={buttonContainerStyles}>
          <button type="submit" style={buttonStyles}>보내기</button>
        </div>
      </form>
    </Modal>
  );
};

export default SendMessageModal;
