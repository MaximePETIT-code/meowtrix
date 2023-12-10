'use client';
import List from '@mui/material/List';
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { find } from 'lodash';
import { pusherClient } from "@/libs/pusher";
import ContactItem from "./ContactItem";
import { FullConversationType } from "@/app/types";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users
}) => {
  const [items, setItems] = useState(initialItems);

  const router = useRouter();
  const session = useSession();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {

    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          };
        }

        return currentConversation;
      }));
    }

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current]
      });
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      });
    }

    pusherClient.bind('conversation:update', updateHandler)
    pusherClient.bind('conversation:new', newHandler)
    pusherClient.bind('conversation:remove', removeHandler)
  }, [pusherKey, router]);

  return (
    <List sx={{ width: '100%' }} disablePadding>
      {items.map((item) => (
        <ContactItem
          key={item.id}
          data={item}
        />
      ))}
    </List>
  );
}

export default ConversationList;
