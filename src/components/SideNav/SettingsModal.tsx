'use client';
import { useCallback, useState } from "react";
import { signOut } from 'next-auth/react';
import axios from "axios";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Modal, Box, Button } from "@mui/material";
import Input from "../Input/Input";
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from "react-hot-toast";

interface UserListProps {
    open: boolean;
    handleClose: () => void;
    currentUser: {
        createdAt: string;
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
        hashedPassword: string | null;
        conversationIds: string[];
        seenMessageIds: string[];
    } | null;
}

const SettingsModal: React.FC<UserListProps> = ({
    open,
    handleClose,
    currentUser
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
        }
    });

    const onDelete = useCallback(() => {
        axios.delete(`/api/settings`)
            .then(() => {
                signOut()
            })
            .catch(() => console.error('Something went wrong!'))
    }, []);


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/settings', data)
            .then(() => {
                router.refresh();
                handleClose();
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
    }

    const style = {
        position: 'absolute',
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
                <h2 style={{ margin: 0 }}>Profile</h2>
                <p style={{marginTop: '8px', marginBottom: '32px'}}>
                    Edit your public information.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        disabled={isLoading}
                        placeholder="John Doe"
                        id="name"
                        label="Name"
                        errors={errors}
                        required
                        register={register}
                        variant='outlined'
                    />
                    <Button
                        disabled={isLoading}
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disableElevation
                        sx={{ marginTop: 1, marginBottom: 3 }}
                    >
                        update
                    </Button>
                </form>
                <Button endIcon={<WarningAmberIcon />} variant="outlined" color="error" onClick={onDelete}>
                    delete my account
                </Button>
            </Box>
        </Modal >
    );
}

export default SettingsModal;