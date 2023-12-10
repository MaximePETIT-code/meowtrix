"use client"
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Input from '@/components/Input/Input';
import useConversation from '@/app/utils/useConversation';
import toast from 'react-hot-toast';
import { useMessageContext } from '@/app/context/MessageContext';
import { useSession } from 'next-auth/react';

const Form = () => {
  const { conversationId } = useConversation();
  const { setSendingMessages } = useMessageContext();
  const session = useSession();

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
    setValue('message', '', { shouldValidate: true });
    try {
      setSendingMessages((prevMessages) => [
        ...(prevMessages || []),
        {
          id: Date.now(),
          name: session.data?.user?.name || '',
          body: data.message,
          image: session.data?.user?.image || null,
          createdAt: Date.now()
        },
      ]);

      await axios.post('/api/messages', {
        ...data,
        conversationId: conversationId
      });

      setSendingMessages((prevMessages) => {
        if (!prevMessages) {
          return null;
        }
        return prevMessages.filter((message) => message.body !== data.message);
      });

    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error sending message');
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
        <SendIcon style={{ color: '#fff', width: '20px', height: '20px' }} />
      </IconButton>
    </form>
  );
};

export default Form;
