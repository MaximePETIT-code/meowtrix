"use client"
import * as React from 'react';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { ListItemAvatar } from '@mui/material';
import { usePathname } from 'next/navigation';


export default function ContactList() {
  const currentRoute = usePathname();

  const contacts = [
    {
      id: 0,
      name: 'Brunch this weekend?',
      preview: "Ali Connors — I'll be in your neighborhood doing errands this…",
    },
    {
      id: '1',
      name: 'Summer BBQ',
      preview: "to Scott, Alex, Jennifer — Wish I could come, but I'm out of town this…",
    },
    {
      id: '2',
      name: 'Oui Oui',
      preview: 'Sandra Adams — Do you have Paris recommendations? Have you ever…',
    },
  ];

  return (
    <List sx={{ width: '100%' }} disablePadding>
      {contacts.map((contact, index) => (
        <Link
          key={index}
          href={`/conversations/${contact.id}`} 
          style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem
            alignItems="flex-start"
            sx={{ background: currentRoute === `/conversations/${contact.id}` ? theme => theme.palette.grey[100] : 'inherit' }}
            disablePadding>
            < ListItemButton >
              <ListItemAvatar>
                <Avatar {...stringAvatar(contact.name)} />
              </ListItemAvatar>
              <ListItemText
                primary={contact.name}
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {contact.preview}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          {index < contacts.length - 1 && <Divider sx={{ ml: 0 }} variant="inset" component="li" />}
        </Link >
      ))
      }
    </List >
  );
}


// generate color based on name
function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  const lightness = 75;

  return `hsl(${hue}, 50%, ${lightness}%)`;
}

// display only the first letter of the name
function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name[0],
  };
}