import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import moment from 'moment';

const ChatApp = ({ groupId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const paperRef = useRef(null);
  let profileId = localStorage.getItem('profile.id');
  profileId = JSON.parse(profileId);
  let displayName = localStorage.getItem('displayName');
  displayName = JSON.parse(displayName);
  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/discussions?filter={"where":{"group_id":"${groupId}"},"order":"timestamp ASC"}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const postMessage = async () => {
    // let profileId = localStorage.getItem('profile.id');
    // profileId = JSON.parse(profileId);
    // let displayName = localStorage.getItem('displayName');
    // displayName = JSON.parse(displayName);

    try {
      const payload = {
        message: newMessage,
        group_id: groupId,
        user_id: profileId,
        displayName: displayName,
        timestamp: moment().utc(),
      };
      const response = await fetch('http://localhost:3001/api/discussions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Scroll down to the latest message when new messages arrive
    if (paperRef.current) {
      paperRef.current.scrollTop = paperRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '600px', margin: 'auto' }}>
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px', height: 'calc(100vh - 10rem)', overflowY: 'auto', width: '100%', background: 'black', color: 'white' }} ref={paperRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.user_id === profileId ? 'flex-end' : 'flex-start',
              marginBottom: '8px',
            }}
          >
            <Paper
              elevation={3}
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: message.user_id === profileId ? '#2979FF' : 'white',
                color: message.user_id === profileId ? 'white' : 'black',
                maxWidth: '70%',
              }}
            >
              <Typography variant="body2" style={{ fontSize: '14px' }}>
                {message.message}
              </Typography>
              <Typography variant="caption" style={{ marginTop: '8px', textAlign: 'right' }}>
                {message.displayName}, {moment(message.timestamp).fromNow()}
              </Typography>
            </Paper>
          </div>
        ))}
      </Paper>
      <TextField
        label="New Message"
        variant="outlined"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        style={{ marginBottom: '8px', background: 'white' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={postMessage}
        style={{ borderRadius: '12px', background: '#2979FF', color: 'white', fontSize: '16px' }}
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </div>
  );
};

export default ChatApp;
