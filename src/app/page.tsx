"use client"
import React from "react";
import { Container, Typography, Box, CssBaseline } from "@mui/material";
import Image from "next/image";
import AuthForm from "../components/Auth/AuthForm";

const Auth = () => {
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
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Image
            height={48}
            width={48}
            className="mx-auto w-auto"
            src="/images/logo.png"
            alt="Logo"
          />
          <Typography
            component="h2"
            variant="h3"
            fontWeight="bold"
            mt={1}
            mb={2}
          >
            Sign in to your account
          </Typography>
        </Box>
        <AuthForm />
      </Container>
    </Box>
  );
};

export default Auth;
