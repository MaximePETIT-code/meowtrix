import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Box } from "@mui/material";
import { SideNav } from '@/components/SideNav/SideNav';
import getUsers from '../actions/getUsers';

const DRAWER_WIDTH = 430;

export default async function ConversationsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession()

  if (!session) {
    redirect('/')
  }

  const users = await getUsers();

  return (
    <>
      <SideNav users={users} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${DRAWER_WIDTH}px`,
          mt: ['0', '0', '0'],
        }}
      >
        {children}
      </Box>
    </>
  );
}
