import React, { useEffect, useRef } from 'react';

function statusClass(status) {
  switch (status) {
    case 'online': return 'bg-green-500 animate-pulse';
    case 'offline': return 'bg-gray-400';
    case 'away': return 'bg-yellow-400 animate-pulse';
    case 'busy': return 'bg-red-600 animate-pulse';
    default: return 'bg-gray-400';
  }
}

function formatTimestamp(ts) {
  const time = new Date(ts);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const MessageStatusIcon = ({ status }) => {
  switch (status) {
    case 'sent':
      return <span title="Sent" aria-label="Sent" className="material-icons text-xs">done</span>;
    case 'delivered':
      return <span title="Delivered" aria-label="Delivered" className="material-icons text-xs">done_all</span>;
    case 'read':
      return <span title="Read" aria-label="Read" className="material-icons text-xs text-blue-500">done_all</span>;
    default:
      return null;
  }
};

const ChatMessages = ({ messages, currentUser, users }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const getUser = (id) => users.find(u => u.id === id) || {};

  return (
    <div ref={containerRef} className="flex-grow overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50 dark:bg-gray-800">
      {messages.map(msg => {
        const isSent = msg.senderId === currentUser.id;
        const user = getUser(msg.senderId);
        return (
          <div
            key={msg.id}
            className={`flex ${isSent ? 'flex-row-reverse' : 'flex-row'} gap-3 items-start`}
            role="article"
            aria-label={`${user.name || 'User'} message`}
            tabIndex={0}
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-transparent" style={{ borderColor: isSent ? 'transparent' : 'transparent' }}>
              <img
                src={user.avatar}
                alt={`${user.name || 'User'} avatar`}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = "https://placehold.co/48x48/10b981/ffffff?text=Avatar"; }}
              />
              <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${statusClass(user.status)}`}></span>
            </div>
            <div className={`max-w-[70%] relative`}>
              <div
                className={`px-4 py-3 rounded-2xl shadow-md break-words whitespace-pre-wrap text-sm ${
                  isSent ? 'bg-gradient-to-br from-purple-600 to-teal-500 text-white border-b-2 border-purple-700 rounded-br-md' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md'
                }`}
              >
                {msg.text}
              </div>
              {isSent && (
                <div className="absolute bottom-0 right-3 text-xs text-gray-400 flex items-center gap-1">
                  <MessageStatusIcon status={msg.status} />
                  <time dateTime={msg.timestamp}>{formatTimestamp(msg.timestamp)}</time>
                </div>
              )}
              {!isSent && (
                <time className="block mt-1 text-xs text-gray-500 dark:text-gray-400" dateTime={msg.timestamp}>
                  {formatTimestamp(msg.timestamp)}
                </time>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
