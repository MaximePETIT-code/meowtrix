import * as React from 'react';
import Box from '@mui/material/Box';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import AuthProvider from './context/AuthProvider'
import SideNav from '@/components/SideNav/SideNav';

export const metadata = {
  title: 'Next.js App Router + Material UI v5',
  description: 'Next.js App Router + Material UI v5',
};

const DRAWER_WIDTH = 430;

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  const session = await getServerSession(options)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeRegistry>
            <SideNav/>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                ml: `${DRAWER_WIDTH}px`,
                mt: ['0', '0', '0'],
                p: 3,
              }}
            >
              {children}
            </Box>
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
