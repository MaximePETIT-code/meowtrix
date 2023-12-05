'use client';

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
        {otherUser.name && <Avatar name={otherUser.name} />}
        <div>
          <div>{otherUser.name}</div>
        </div>
      </div>
    </Box>
  );
}

export default Header;
