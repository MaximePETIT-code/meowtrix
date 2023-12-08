"use client"
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { IconButton, Box, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Input from '@/components/Input/Input';
import useConversation from '@/app/utils/useConversation';

const Form = () => {
  const { conversationId } = useConversation();
  const [loading, setLoading] = useState(false);

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    try {
      // Simuler une pause pour montrer le chargement
      await new Promise(resolve => setTimeout(resolve, 1000));

      await axios.post('/api/messages', {
        ...data,
        conversationId: conversationId
      });

      setValue('message', '', { shouldValidate: true });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
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
        height: '86px',
        backgroundColor: '#fff',
      }}
    >
      <Input
        id="message"
        register={register}
        errors={errors}
        required
        placeholder="Write a message"
        sx={{ width: '100%', marginBottom: '16px', }}
      />
      <IconButton type="submit" color="primary" aria-label="send" style={{ backgroundColor: '#673ab7' }}>
        {loading ? (
          <CircularProgress style={{ color: '#fff', width: '20px', height: '20px' }} />
        ) : (
          <SendIcon style={{ color: '#fff', width: '20px', height: '20px' }} />
        )}
      </IconButton>
    </form>
  );
};

export default Form;
