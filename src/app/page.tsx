'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MediaCard from '@/components/MediaCard';
import { redirect } from 'next/navigation';
import { useSession} from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect(`/api/auth/signin?callbackUrl=/${window.location.pathname}`)
    }
})
  return (
    <Box sx={{ display: 'flex' }}>
      you are connected
    </Box>
  );
}
