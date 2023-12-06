import React from 'react';
import { Input, IconButton, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Form = () => {
  return (
    <Box sx={{
      padding: '20px',
      backgroundColor: '#fff',
      borderTop: '1px solid #e0e0e0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      borderRadius: 0,
      position: 'fixed',
      bottom: '0',
      width: 'calc(100% - 430px)',
      height: '73px',
    }}>
      <Input placeholder="Write a message" fullWidth />
      <IconButton
        color="primary"
        aria-label="send"
        style={{ backgroundColor: '#673ab7' }}
      >
        <SendIcon style={{ color: '#fff', width: '20px', height: '20px' }} />
      </IconButton>
    </Box>
  );
};

export default Form;
