import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputAdornment from '@mui/material/InputAdornment';
import moment from 'moment';

const ChatApp = ({ groupId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
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
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const fileResponse = await fetch('http://localhost:3001/api/Resources', {
        method: 'POST',
        body: formData,
      });

      const fileData = await fileResponse.json();

      const payload = {
        message: newMessage,
        group_id: groupId,
        user_id: profileId,
        displayName: displayName,
        timestamp: moment().utc(),
        attachment: {
          filename: fileData.filename,
          url: fileData.url,
        },
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
      setSelectedFile(null);
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
    if (paperRef.current) {
      paperRef.current.scrollTop = paperRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '600px',minWidth: '400px',  }}>
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px', height: 'calc(100vh - 12rem)', overflowY: 'auto', width: '100%', background: '#d8d8d8', color: 'white' }} ref={paperRef}>
        {
          messages.length === 0 ? <span className='text-black'>Start a conversation with the group members!</span> :
          messages.map((message, index) => (
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
                {
                  message.attachment && (
                    <div>
                      <a href={message.attachment.url} target="_blank" rel="noopener noreferrer">
                        {message.attachment.filename}
                      </a>
                    </div>
                  )
                }
              </Paper>
            </div>
          ))
        }
      </Paper>
      <TextField
        label="New Message"
        variant="outlined"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <label htmlFor="file-input">
                <CloudUploadIcon style={{ cursor: 'pointer', color: '#2979FF' }} />
              </label>
              <input
                id="file-input"
                type="file"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </InputAdornment>
          ),
        }}
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
