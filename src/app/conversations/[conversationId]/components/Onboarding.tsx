"use client"
import { useState } from "react";
import { ReactNode } from "react";
import { Box, Container, List, Typography } from "@mui/material";
import { User } from "@prisma/client";
import Image from "next/image";
import { NewUserCard } from './NewUserCard';

interface WelcomeProps {
    users: User[];
    children: ReactNode;
}

export const Onboarding: React.FC<WelcomeProps> = ({ users, children }) => {
    const [newUser, setNewUser] = useState<boolean>(true);

    const latestUsers = users.slice(0, 3);

    if (newUser) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    py: 12,
                    backgroundColor: "#f3f4f6",
                }}
            >
                <Container component="main" maxWidth="md">
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Image
                            height={52}
                            width={52}
                            className="mx-auto w-auto"
                            src="/images/logo.png"
                            alt="Logo"
                        />
                        <Typography component="h3" variant="h3" mt={1} mb={2}>
                            Welcome on Meowtrix !
                        </Typography>
                        <Typography>
                            Choose a recent member to start a conversation, <br />
                            or select "New Message" to chat with any user.
                        </Typography>

                        <List sx={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
                            {latestUsers.map((user, id) => (
                                <NewUserCard key={id} data={user} setNewUser={setNewUser} />
                            ))}
                        </List>
                    </Box>
                </Container>
            </Box>
        );
    }
    return children;
};
