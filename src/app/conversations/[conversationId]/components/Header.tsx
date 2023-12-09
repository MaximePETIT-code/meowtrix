'use client';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format } from 'date-fns';
import { Box } from '@mui/material';
import Avatar from "@/components/Avatar/Avatar";
import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/utils/useOtherUser";

interface HeaderProps {
  conversation: Conversation & {
    users: User[]
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const formattedDate = otherUser && formatDistanceToNow(new Date(otherUser.createdAt), { addSuffix: true });
  const registrationDate = otherUser && format(new Date(otherUser.createdAt), 'MMMM yyyy');

  return (
    <Box sx={{
      position: 'fixed',
      width: 'calc(100% - 430px)',
      height: '100px',
      top: 0,
      zIndex: 2,
      backgroundColor: 'white',
      marginBottom: '16px',
      padding: '20px',
      paddingLeft: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #e0e0e0'
    }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {otherUser ?
          otherUser.name && <Avatar name={otherUser.name} img={otherUser.image} />
          : <Avatar name={'?'} img={null} />}
        <div>
          <div style={{ fontSize: '18px' }}>{otherUser ? otherUser.name : 'This user has been deleted'}</div>
          {otherUser &&
            <div style={{
              color: '#616161',
              fontSize: '12px'
            }}>
              Active since {formattedDate}
            </div>
          }
        </div>
      </div>
    </Box>
  );
}

export default Header;
