import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface MessageProps {
  isOwn?: boolean;
}

const Message: React.FC<MessageProps> = ({ isOwn }) => {

  return (
    <Box
      elevation={0}
      style={{
        display: 'flex',
        padding: '20px',
        flexDirection: isOwn ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: '10px',
      }}
    >
      <div>
        <Avatar alt="Ricky Smith" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
      </div>
      <div style={{ flex: 1, marginLeft: isOwn ? '8px' : '0', marginRight: isOwn ? '0' : '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: isOwn ? 'flex-end' : 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Typography variant="body2" style={{ color: '#616161' }}>
              Ricky Smith
            </Typography>
            <Typography variant="caption" style={{ color: '#9e9e9e' }}>
              11:00 AM
            </Typography>
          </div>
          <Box elevation={0} sx={{
            backgroundColor: isOwn ? '#673ab7' : '#e0e0e0', color: isOwn ? 'white' : 'black', px: "1rem", py: "0.5rem", borderRadius: '33px',

          }}>
            hello world
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default Message;
