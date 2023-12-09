"use client"
import { Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import React from 'react';
import Avatar from '@/components/Avatar/Avatar';
import Box from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CircularProgress } from "@mui/material";


interface MessageItemProps {
  data?: Message & {
    sender?: User;
  } | null;
  dataInProgress?: {
    id: number;
    name: string;
    body: string;
    image: string | null;
    createdAt: number;
  }
}

const MessageItem: React.FC<MessageItemProps> = ({ data, dataInProgress = null }) => {
  const session = useSession();

  const isOwn = () => {
    if (dataInProgress) {
      return true
    }
    return (
      session.data?.user?.email === data?.sender?.email
    )
  }

  const isInProgress = dataInProgress;

  return (
    <Box
      elevation={0}
      sx={{
        display: 'flex',
        padding: '20px',
        flexDirection: isOwn() ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: '10px',
      }}
    >
      <div>
        {
          data ? data.sender && data.sender.name &&
            <Avatar name={data?.sender?.name} img={data?.sender?.image} />
            : dataInProgress?.name &&
            <Avatar name={dataInProgress?.name} img={dataInProgress?.image ?? null} />
        }
      </div>
      <div style={{ flex: 1, marginLeft: isOwn() ? '8px' : '0', marginRight: isOwn() ? '0' : '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: isOwn() ? 'flex-end' : 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '10px' }}>
            <Typography variant="body2" style={{ color: '#616161' }}>
              {data ? data?.sender?.name : dataInProgress?.name}
            </Typography>
            {
              data ? (
                <Typography variant="caption" style={{ color: '#9e9e9e', fontSize: '11px' }}>
                  {format(new Date(data.createdAt), 'p')}
                </Typography>
              ) : (
                <div style={{ width: '43.54px', height: '18.26', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-10px', right: 0 }}>
                    <CircularProgress size="0.8rem" color="inherit" />
                  </div>
                </div>
              )
            }
          </div>
          <Box elevation={0} sx={{
            backgroundColor: isOwn() ? '#673ab7' : '#e0e0e0',
            opacity: isInProgress ? '0.7' : '1',
            color: isOwn() ? 'white' : 'black',
            px: "1rem",
            py: "0.5rem",
            borderRadius: '20px',
            maxWidth: '60%'

          }}>
            {data ? data.body : dataInProgress?.body}
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default MessageItem;
