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
import LogoutIcon from '@mui/icons-material/Logout';
import ContactList from '@/components/SideNav/ContactList';

const DRAWER_WIDTH = 430;

const BOTTOM_LINKS = [
    { text: 'Logout', icon: LogoutIcon },
];

export default function SideNav() {

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
            <Button variant="contained" size="large" startIcon={<SendIcon />} disableElevation sx={{ width: '100%', borderRadius: 0, height: '100px' }}>
                New message
            </Button>

            <ContactList />

            <Divider sx={{ mt: 'auto' }} />
            <List>
                {BOTTOM_LINKS.map(({ text, icon: Icon }) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
