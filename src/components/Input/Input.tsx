"use client"

import React from "react";
import clsx from "clsx";
import { TextField } from "@mui/material";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label?: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  sx?: object;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  placeholder,
  errors,
  type = "text",
  disabled,
  variant="standard",
  sx
}) => {
  return (
    <TextField
      id={id}
      type={type}
      autoComplete={id}
      disabled={disabled}
      {...register(id, { required })}
      variant={variant}
      label={label}
      placeholder={placeholder}
      fullWidth
      error={!!errors[id]}
      className={clsx(
        errors[id] && "focus:ring-rose-500",
        disabled && "opacity-50 cursor-default"
      )}
      sx={{ marginBottom: '24px', ...sx }}
    />

  );
};

export default Input;
