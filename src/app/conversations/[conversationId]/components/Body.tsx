"use client"
import { useRef, useEffect } from "react";
import Message from "./Message";

const Body = () => {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollIntoView({ block: "end" });
    }
  }, []);

  return (
    <div style={{ height: '100vh', overflowY: 'auto', marginTop: '100px', marginBottom: '70px' }}>
      <div ref={messageContainerRef}>
        <Message />
        <Message isOwn />
        <Message />
        <Message isOwn />
        <Message />
        <Message isOwn />
        <Message />
        <Message isOwn />
        <Message />
      </div>
    </div>
  );
};

export default Body;
