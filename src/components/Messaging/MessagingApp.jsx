import React, { useState, useEffect } from 'react';
import ChatMessages from './ChatMessages';
import EmojiPicker from './EmojiPicker';

const users = [
  { id: 'u1', name: 'John', avatar: 'https://placehold.co/48x48/10b981/ffffff?text=JD', status: 'online' },
  { id: 'u2', name: 'Smith', avatar: 'https://placehold.co/48x48/f97316/ffffff?text=JS', status: 'online' },
  { id: 'u3', name: 'Rohit', avatar: 'https://placehold.co/48x48/3b82f6/ffffff?text=RS', status: 'away' },
    { id: 'u4', name: 'Virat', avatar: 'https://placehold.co/48x48/3b82f6/ffffff?text=VK', status: 'online' },
];

const currentUser = users[0];

const MessagingApp = () => {
  const [conversations, setConversations] = useState([
    {
      id: 'conv1',
      name: 'General',
      participants: ['u1', 'u2', 'u3'],
      type: 'group',
      lastMessage: null,
      unreadCount: 2,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'conv2',
      name: 'John',
      participants: ['u1', 'u2','u3','u4'],
      type: 'private',
      lastMessage: null,
      unreadCount: 0,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 'msg1',
      conversationId: 'conv1',
      senderId: 'u2',
      text: 'Hey team, please check the new updates!',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: 'read',
    },
    {
      id: 'msg2',
      conversationId: 'conv1',
      senderId: 'u1',
      text: 'Thanks, I will review shortly.',
      timestamp: new Date(Date.now() - 3500000).toISOString(),
      status: 'read',
    },
  ]);

  const [selectedConvId, setSelectedConvId] = useState(conversations[0]?.id ?? null);
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
const [responsesSent, setResponsesSent] = useState({});

  const selectedConversation = conversations.find(c => c.id === selectedConvId) ?? null;
  const conversationMessages = messages.filter(m => m.conversationId === selectedConvId);

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMsg = {
        id: crypto.randomUUID(),
        conversationId: selectedConvId,
        senderId: currentUser.id,
        text: messageInput.trim(),
        timestamp: new Date().toISOString(),
        status: 'sent',
        replyTo: replyTo ? replyTo.id : null,
    };

    // Update messages and conversations
    setMessages(prev => [...prev, newMsg]);
    setConversations(prev =>
        prev.map(c =>
            c.id === selectedConvId
                ? { ...c, lastMessage: newMsg, unreadCount: 0 }
                : c
        )
    );

    // Prepare for responses from other users
    const otherParticipants = selectedConversation.participants.filter(p => p !== currentUser.id);
    if (responsesSent[currentUser.id]) return; // Prevent multiple responses

    // Track responses
    setResponsesSent(prev => ({ ...prev, [currentUser.id]: true }));

    // Simulate responses
    otherParticipants.forEach((participantId, index) => {
        setTimeout(() => {
            const responseMsg = {
                id: crypto.randomUUID(),
                conversationId: selectedConvId,
                senderId: participantId,
                text: `Response to: "${messageInput.trim()}"`,
                timestamp: new Date().toISOString(),
                status: 'sent',
            };

            // Add response to messages
            setMessages(prev => [...prev, responseMsg]);
        }, (index + 1) * 1000); // Delay responses
    });

    setMessageInput('');
    setReplyTo(null);
    setShowEmojiPicker(false);
    simulateDeliveryStatus(newMsg.id);
};


  const simulateDeliveryStatus = (messageId) => {
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => (m.id === messageId ? { ...m, status: 'delivered' } : m))
      );
      setTimeout(() => {
        setMessages(prev =>
          prev.map(m => (m.id === messageId ? { ...m, status: 'read' } : m))
        );
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    if (!selectedConvId) return;
    const conv = conversations.find(c => c.id === selectedConvId);
    if (!conv) return;
    const otherParticipants = conv.participants.filter(p => p !== currentUser.id);
    if (otherParticipants.length === 0) return;

    const typingTimer = setInterval(() => {
      const userIndex = Math.floor(Math.random() * otherParticipants.length);
      setTypingUsers([otherParticipants[userIndex]]);
      setTimeout(() => setTypingUsers([]), 3000);
    }, 10000);

    return () => clearInterval(typingTimer);
  }, [selectedConvId, conversations]);

  const addEmoji = (emoji) => {
    setMessageInput(mi => mi + emoji);
  };

  const onKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === 'NumpadEnter') && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-full w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg overflow-hidden">
      {/* Conversations list */}
      <div className="flex flex-col w-80 p-4 border-r border-gray-300 dark:border-gray-700">
        <input
          type="search"
          placeholder="Search conversations..."
          className="mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Search conversations"
          onChange={() => { }}
        />
        {conversations.map(conv => {
          const isActive = conv.id === selectedConvId;
          return (
            <button
              key={conv.id}
              className={`flex items-center gap-3 p-3 rounded-lg w-full text-left font-semibold transition ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 via-teal-500 to-blue-500 text-white shadow-lg'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedConvId(conv.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="material-icons">
                {conv.type === 'group' ? 'groups' : 'person'}
              </span>
              <span>{conv.name}</span>
              {conv.unreadCount > 0 && (
                <span className="ml-auto px-2 py-1 text-xs font-bold rounded-full bg-green-500 text-white">
                  {conv.unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Chat area */}
      <div className="flex flex-col flex-1">
        {selectedConversation ? (
          <>
            <header className="flex items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <span className="material-icons mr-3">
                {selectedConversation.type === 'group' ? 'groups' : 'person'}
              </span>
              <h3 className="font-semibold text-lg">{selectedConversation.name}</h3>
              {typingUsers.length > 0 && (
                <span className="ml-4 italic text-sm text-gray-500 dark:text-gray-400 select-none">
                  {typingUsers.map(id => users.find(u => u.id === id)?.name).join(', ') || 'Someone'} typing...
                </span>
              )}
            </header>
            <ChatMessages
              messages={conversationMessages}
              currentUser={currentUser}
              users={users}
            />
            <footer className="flex items-center p-4 border-t border-gray-300 dark:border-gray-700 gap-3 relative">
              {replyTo && (
                <div className="absolute top-0 left-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-md flex items-center gap-3">
                  <span className="truncate max-w-xs">Replying to: {replyTo.text}</span>
                  <button onClick={() => setReplyTo(null)} aria-label="Cancel reply" className="text-xl font-bold">&times;</button>
                </div>
              )}
              <textarea
                rows={1}
                className="flex-1 p-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Message input"
              />
              <button
                onClick={sendMessage}
                disabled={!messageInput.trim()}
                className="disabled:opacity-50 disabled:cursor-not-allowed bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-teal-500 transition"
                aria-label="Send message"
              >
                <span className="material-icons">send</span>
              </button>
              <button
                onClick={() => setShowEmojiPicker(s => !s)}
                aria-label={showEmojiPicker ? 'Close emoji picker' : 'Open emoji picker'}
                className="text-purple-600 hover:text-teal-500 transition text-2xl"
              >
                <span className="material-icons">emoji_emotions</span>
              </button>
              {showEmojiPicker && (
                <EmojiPicker onSelect={addEmoji} onClose={() => setShowEmojiPicker(false)} />
              )}
            </footer>
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow text-gray-500 dark:text-gray-400 select-none">
            Select a conversation to start chatting
          </div>
        )}
      </div>
      {/* Right panel */}
      <aside className="w-72 p-4 border-l border-gray-300 dark:border-gray-700 hidden md:block overflow-y-auto">
        {selectedConversation && (
          <>
            <h4 className="text-xl font-semibold mb-4 text-purple-600 dark:text-teal-400">Conversation Info</h4>
            <p><strong>Name:</strong> {selectedConversation.name}</p>
            <p><strong>Type:</strong> {selectedConversation.type}</p>
            <p><strong>Participants:</strong></p>
            <ul className="list-disc ml-5">
              {selectedConversation.participants.map(pid => {
                const u = users.find(usr => usr.id === pid) || {};
                return <li key={pid}>{u.name || 'Unknown'}</li>;
              })}
            </ul>
            <p><strong>Created:</strong> {new Date(selectedConversation.createdAt).toLocaleDateString()}</p>
          </>
        )}
      </aside>
    </div>
  );
};

export default MessagingApp;
