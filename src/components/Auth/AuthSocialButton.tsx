"use client"
import React from "react";
import { Button } from "@mui/material";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  title: string;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ icon: Icon, title, onClick }) => {
  return (
    <Button
      variant="outlined"
      fullWidth
      startIcon={<Icon />}
      onClick={onClick}
      className="mt-2"
    >
      {title}
    </Button>
  );
};

export default AuthSocialButton;
