"use client"
import { createContext, ReactNode, useContext, useState } from 'react';

interface Message {
    id: number;
    name: string;
    body: string;
    image: string | null;
    createdAt: number;
}

interface MessageContextProps {
    sendingMessages: Message[] | null;
    setSendingMessages: React.Dispatch<React.SetStateAction<Message[] | null>>;
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sendingMessages, setSendingMessages] = useState<Message[] | null>(null);

    return (
        <MessageContext.Provider value={{ sendingMessages, setSendingMessages }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessageContext = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessageContext must be used within a MessageProvider');
    }
    return context;
};
