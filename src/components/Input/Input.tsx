"use client"

import React from "react";
import clsx from "clsx";
import { TextField, InputAdornment } from "@mui/material";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = "text",
  disabled,
}) => {
  return (
    <div>
      {/* <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label> */}
      <div className="mt-2">
        <TextField
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          variant="outlined"
          label={label}
          fullWidth
          error={!!errors[id]}
          className={clsx(
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
          sx={{marginBottom: '24px'}}
        />
      </div>
    </div>
  );
};

export default Input;
