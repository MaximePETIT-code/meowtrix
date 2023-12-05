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
  );
};

export default Body;
