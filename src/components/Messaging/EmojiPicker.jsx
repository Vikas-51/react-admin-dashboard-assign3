import React, { useEffect, useRef } from 'react';

const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤑', '🤗', '🤭', '🤫', '🤔'
];

const EmojiPicker = ({ onSelect, onClose }) => {
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose();
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="absolute bottom-14 right-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-3 grid grid-cols-8 gap-2 max-h-80 overflow-y-auto z-50"
      role="dialog"
      aria-label="Emoji picker"
      ref={pickerRef}
    >
      {emojis.map(e => (
        <button
          key={e}
          type="button"
          className="text-2xl hover:bg-purple-600 hover:text-white rounded-lg p-1 transition"
          onClick={() => onSelect(e)}
          onKeyDown={ev => { if (ev.key === 'Enter') onSelect(e); }}
          aria-label={`Emoji ${e}`}
        >
          {e}
        </button>
      ))}
    </div>
  );
};

export default EmojiPicker;
