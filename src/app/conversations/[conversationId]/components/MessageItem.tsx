"use client"
import { Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import React from 'react';
import Avatar from '@/components/Avatar/Avatar';
import Box from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


interface MessageItemProps {
  data: Message & {
    sender: User
  };
}

const MessageItem: React.FC<MessageItemProps> = ({ data }) => {
  const session = useSession();
  const isOwn = session.data?.user?.email === data?.sender?.email

  console.log(data)

  return (
    <Box
      elevation={0}
      sx={{
        display: 'flex',
        padding: '20px',
        flexDirection: isOwn ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: '10px',
      }}
    >
      <div>
        {data.sender.name && <Avatar name={data.sender.name} img={data.sender.image} />}
      </div>
      <div style={{ flex: 1, marginLeft: isOwn ? '8px' : '0', marginRight: isOwn ? '0' : '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: isOwn ? 'flex-end' : 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '10px' }}>
            <Typography variant="body2" style={{ color: '#616161' }}>
              {data.sender.name}
            </Typography>
            <Typography variant="caption" style={{ color: '#9e9e9e', fontSize: '11px' }}>
              {format(new Date(data.createdAt), 'p')}
            </Typography>
          </div>
          <Box elevation={0} sx={{
            backgroundColor: isOwn ? '#673ab7' : '#e0e0e0', 
            color: isOwn ? 'white' : 'black', 
            px: "1rem", 
            py: "0.5rem", 
            borderRadius: '20px',
            maxWidth: '60%'

          }}>
            {data.body}
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default MessageItem;
