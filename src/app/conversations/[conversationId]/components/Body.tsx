"use client"
import { useRef, useEffect, useState } from "react";
import { pusherClient } from "@/libs/pusher";
import MessageItem from "./MessageItem";
import { Message } from "@prisma/client";
import useConversation from "@/app/utils/useConversation";
import { find } from "lodash";
import axios from "axios";
import { useMessageContext } from "@/app/context/MessageContext";

interface BodyProps {
  initialMessages: Message[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState(initialMessages);
  const { sendingMessages } = useMessageContext();

  const { conversationId } = useConversation();

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollIntoView({ block: "end" });
    }
  }, [sendingMessages]);

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    const messageHandler = (message: Message) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message]
      });
    };

    const updateMessageHandler = (newMessage: Message) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }

        return currentMessage;
      }))
    };


    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId]);

  return (
    <div style={{ height: '100vh', overflowY: 'auto', marginTop: '100px', marginBottom: '86px' }}>
      <div ref={messageContainerRef}>
        {messages.map((message) => (
          <MessageItem key={message.id} data={message} />
        ))}
        {sendingMessages && sendingMessages.map((messageInProgress) => (
          <MessageItem key={messageInProgress.id} dataInProgress={messageInProgress} />
        ))}
      </div>
    </div>
  );
};

export default Body;
