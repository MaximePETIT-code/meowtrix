'use client';
import { Box, Container, Typography, Button } from "@mui/material";
import axios from "axios";
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { BsGithub, BsGoogle  } from 'react-icons/bs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";

import Input from "../Input/Input";
import AuthSocialButton from './AuthSocialButton';
import { toast } from "react-hot-toast";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/conversations')
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  
    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
      .then(() => signIn('credentials', {
        ...data,
        redirect: false,
      }))
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/conversations')
        }
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/conversations')
        }
      })
      .finally(() => setIsLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          router.push('/conversations')
        }
      })
      .finally(() => setIsLoading(false));
  } 

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          padding: 4,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              variant='outlined'
              required
              id="name"
              label="Name"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            variant='outlined'
            required
            id="email"
            label="Email address"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            variant='outlined'
            required
            id="password"
            label="Password"
            type="password"
          />
          <Button
            disabled={isLoading}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disableElevation
            sx={{ marginTop: 1 }}
          >
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" color="textSecondary" textAlign="center">
            Or continue with
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2, gap: 2}}>
            <AuthSocialButton
              icon={BsGithub}
              title={'GITHUB'}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              title={'GOOGLE'}
              onClick={() => socialAction("google")}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Typography variant="body2" color="textSecondary">
            {variant === "LOGIN" ? "New to Meowtrix?" : "Already have an account?"}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            sx={{ marginLeft: 1, cursor: "pointer", textDecoration: "underline" }}
            onClick={toggleVariant}
          >
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
 
export default AuthForm;
