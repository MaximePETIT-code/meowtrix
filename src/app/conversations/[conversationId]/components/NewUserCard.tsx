"use client"
import { useState, useCallback } from "react";
import { ListItem, ListItemButton, ListItemAvatar } from "@mui/material";
import Avatar from "@/components/Avatar/Avatar";
import { User } from "@prisma/client";
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface NewUserCardProps {
    data: User;
    setNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewUserCard: React.FC<NewUserCardProps> = ({ data, setNewUser }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleConversationStart = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/conversations', { userId: data.id })
            .then((data) => {
                router.push(`/conversations/${data.data.id}`);
            })
            .finally(() => {
                setIsLoading(false)
                setNewUser(false)
            });
    }, [data, router]);
    return (
        <ListItem
            onClick={handleConversationStart}
            sx={{
                background: theme => theme.palette.grey[300],
                borderRadius: '6px',
                width: '200px',
            }}
            disablePadding
        >
            <ListItemButton sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', py: '16px' }}>
                <ListItemAvatar>
                    {data.name && <Avatar name={data.name} img={data.image} sx={{ width: 52, height: 52 }} />}
                </ListItemAvatar>
                {data.name}
            </ListItemButton>
        </ListItem>
    )
}