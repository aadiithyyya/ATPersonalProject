import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

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
      style={{
        background: '#fffafc',
        borderRadius: '20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        padding: '1rem 1.5rem',
        margin: '1rem auto',
        maxWidth: '80%',
        position: 'relative',
        textAlign: 'center',
        fontSize: '1.1rem',
        color: '#333',
      }}
    >
      {message.text}
      <button
        onClick={() => onDelete(message.id)}
        style={{
          position: 'absolute',
          top: 8,
          right: 12,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#888',
        }}
        title="Delete message"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

export default MessagePopup;
