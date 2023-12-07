"use client"
import { useRef, useEffect } from "react";
import MessageItem from "./MessageItem";
import { Message } from "@prisma/client";

interface BodyProps {
  messages: Message[];
}

const Body: React.FC<BodyProps> = ({ messages = [] }) => {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollIntoView({ block: "end" });
    }
  }, [messages]);

  return (
    <div style={{ height: '100vh', overflowY: 'auto', marginTop: '100px', marginBottom: '70px' }}>
      <div ref={messageContainerRef}>
        {messages.map((message) => (
          <MessageItem key={message.id} data={message} />
        ))}
      </div>
    </div>
  );
};

export default Body;
