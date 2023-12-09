"use client"
import * as React from 'react';
import { Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ConversationList from './ContactList';
import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';
import UserList from '../UserList/UserList';
import Avatar from '../Avatar/Avatar';
import { FullConversationType } from '@/app/types';
import { useCallback } from 'react';
import axios from 'axios';
import SettingsModal from './SettingsModal';

interface SideNavProps {
  users: User[];
  currentUser: {
    createdAt: string;
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    hashedPassword: string | null;
    conversationIds: string[];
    seenMessageIds: string[];
  } | null;
  initialItems: FullConversationType[];
}

const DRAWER_WIDTH = 430;

const BOTTOM_LINKS = [
  { text: 'Logout', icon: LogoutIcon, isLogoutLink: true },
  { text: 'Settings', icon: SettingsIcon, isSettings: true },
];

export const SideNav: React.FC<SideNavProps> = ({ users, currentUser, initialItems }) => {
  const [open, setOpen] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          height: 'auto',
          bottom: 0,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Button
        variant="contained"
        size="large"
        startIcon={<SendIcon />}
        disableElevation
        onClick={handleOpen}
        sx={{ width: '100%', borderRadius: 0, height: '100px' }}
      >
        New message
      </Button>

      <ConversationList users={users} initialItems={initialItems} />

      <UserList users={users} open={open} handleClose={handleClose} />

      <SettingsModal open={openSettings} handleClose={handleCloseSettings} currentUser={currentUser} />

      <Divider sx={{ mt: 'auto' }} />
      <List disablePadding>
        {BOTTOM_LINKS.map(({ text, icon: Icon, isLogoutLink, isSettings }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={isLogoutLink ? () => signOut() : () => handleOpenSettings()} sx={{ padding: '20px 16px' }}>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
              {
                isSettings && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {currentUser && currentUser.name &&
                      <>
                        <Avatar name={currentUser.name} img={currentUser.image} sx={{ width: '24px', height: '24px', fontSize: '14px' }} />
                        <div style={{ color: '#616161', fontSize: '14px' }}>{currentUser.name}</div>
                      </>
                    }
                  </div>
                )
              }
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
