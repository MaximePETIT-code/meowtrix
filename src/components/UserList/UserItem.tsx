"use client"
import React, { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import Typography from '@mui/material/Typography';
import { User } from '@prisma/client';
import { ListItemButton } from '@mui/material';

interface UserBoxProps {
    data: User;
}

const UserItem: React.FC<UserBoxProps> = ({ data }) => {

    return (
        <ListItemButton sx={{
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
            {data.name && <Avatar name={data.name} />}
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
