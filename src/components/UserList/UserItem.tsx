import React, { useState } from 'react';
import axios from 'axios';
import Avatar from '../Avatar/Avatar';
import Typography from '@mui/material/Typography';
import { User } from '@prisma/client';
import { ListItemButton } from '@mui/material';
import { useRouter } from 'next/navigation';

interface UserBoxProps {
    data: User;
    handleClose: () => void;
}

const UserItem: React.FC<UserBoxProps> = ({ data, handleClose }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleConversationStart = async () => {
        axios.post('/api/conversations', { userId: data.id })
            .then((data) => {
                router.push(`/conversations/${data.data.id}`);
            }).finally(() => {
                handleClose();
            })
    };

    return (
        <ListItemButton onClick={() => handleConversationStart()} sx={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            padding: 2,
            backgroundColor: '#f3f4f6',
            '&:hover': {
                backgroundColor: 'background.hover',
            },
            cursor: 'pointer',
            borderRadius: '4px',
            '&:not(:last-child)': {
                marginBottom: '14px',
            }
        }}>
            {data.name && <Avatar name={data.name} img={data.image} />}
            <div style={{ minWidth: 0, flex: 1 }}>
                <div>
                    <span style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', fontWeight: 'medium', color: 'text.primary' }}>
                            {data.name}
                        </Typography>
                    </div>
                </div>
            </div>
        </ListItemButton>
    );
};

export default UserItem;
