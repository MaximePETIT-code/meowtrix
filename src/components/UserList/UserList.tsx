'use client';

import { User } from "@prisma/client";
import UserItem from "./UserItem";
import { Modal, Typography, Box, List } from "@mui/material";

interface UserListProps {
    users: User[];
    open: boolean;
    handleClose: () => void;
}

const UserList: React.FC<UserListProps> = ({
    users,
    open,
    handleClose
}) => {

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    variant="h3"
                    component="h3"
                    sx={{ fontSize: '1rem', fontWeight: 'bold', mb: 4 }}
                >
                    Choose a user to start a conversation
                </Typography>
                <List sx={{maxHeight: '35vh', overflowY: 'auto'}}>
                    {users.map((item) => (
                        <UserItem
                            key={item.id}
                            data={item}
                            handleClose={handleClose}
                        />
                    ))}
                </List>
            </Box>
        </Modal>
    );
}

export default UserList;