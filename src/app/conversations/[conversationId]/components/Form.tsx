"use client"
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { IconButton, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Input from '@/components/Input/Input';
import useConversation from '@/app/utils/useConversation';

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId
    })
  }

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      conversationId: conversationId
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        padding: '20px',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: 0,
        position: 'fixed',
        bottom: '0',
        width: 'calc(100% - 430px)',
        height: '73px',
      }}
    >
      <Input
        id="message"
        register={register}
        errors={errors}
        required
        placeholder="Write a message"
        sx={{ width: '100%', marginBottom: '16px' }}
      />
      <IconButton type="submit" color="primary" aria-label="send" style={{ backgroundColor: '#673ab7' }}>
        <SendIcon style={{ color: '#fff', width: '20px', height: '20px' }} />
      </IconButton>
    </form>
  );
};

export default Form;
