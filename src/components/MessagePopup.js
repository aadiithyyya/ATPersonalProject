// MessagePopup.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import '../styles/Feature4.css';

const popupVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function MessagePopup({ message, onDelete }) {
  return (
    <motion.div
      className="popup-message"
      initial="hidden"
      animate="visible"
      variants={popupVariants}
      transition={{ duration: 0.4 }}
    >
      {message.text}
      <button
        onClick={() => onDelete(message.id)}
        className="delete-button"
        title="Delete message"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

export default MessagePopup;
