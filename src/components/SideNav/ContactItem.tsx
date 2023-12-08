'use client';

import { useMemo } from "react";
import { ListItem, ListItemAvatar, ListItemButton, Divider } from "@mui/material";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import useOtherUser from "@/app/utils/useOtherUser";
import { FullConversationType } from "@/app/types";
import Link from "next/link";
import Avatar from "../Avatar/Avatar";

interface ConversationBoxProps {
  data: FullConversationType,
  key: string;
}

const ContactItem: React.FC<ConversationBoxProps> = ({
  data,
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const currentRoute = usePathname();

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => session.data?.user?.email,
    [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray
      .filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.body) {
      return lastMessage?.body
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <Link
      href={`/conversations/${data.id}`}
      style={{ textDecoration: "none", color: "inherit", }}
    >
      <ListItem
        alignItems="flex-start"
        sx={{
          background: currentRoute === `/conversations/${data.id}` ? theme => theme.palette.grey[100] : 'inherit',
        }}
        disablePadding
      >
        <ListItemButton sx={{ py: '15px' }}>
          <ListItemAvatar>
            {otherUser.name && <Avatar name={otherUser.name} img={otherUser.image} />}
          </ListItemAvatar>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>{otherUser.name}</div>
              <div style={{ color: '#616161', fontSize: '12px' }}>
                {lastMessage?.createdAt && format(new Date(lastMessage.createdAt), 'p')}
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end'
            }}>
              <div style={{
                color: hasSeen ? '#616161' : 'black',
                fontWeight: hasSeen ? '400' : '800'
              }}>
                {lastMessageText}
              </div>
              {!hasSeen &&
                <div style={{
                  fontSize: '12px',
                  backgroundColor: '#673AB7',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '2px',
                  paddingRight: '8px',
                  paddingLeft: '8px',
                  borderRadius: '33px'
                }}>
                  new</div>
              }
            </div>
          </div>
        </ListItemButton>
      </ListItem>
      <Divider sx={{ ml: 0 }} variant="inset" component="li" />
    </Link>
  );
}

export default ContactItem;
