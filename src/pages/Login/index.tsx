import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Container,
  Box,
  CssBaseline,
  Avatar,
  Typography,
  Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LockOutlined } from '@mui/icons-material';

import { Input } from '@/components';
import { authLogin } from '@/service';
import { useAuth } from '@/models';

import schema from './validation';

export default function Login() {
  const navigate = useNavigate();
  const theme = createTheme();
  const methods = useForm({ resolver: yupResolver(schema) });

  const { isAuth, autorize } = useAuth();

  const { mutate, data, isSuccess } = useMutation(authLogin);

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      navigate('/');
    }
  }, []);

  const handleSubmit = methods.handleSubmit(async ({ mail, password }) => {
    mutate({ mail, password });
  });

  useEffect(() => {
    if (isSuccess && !isAuth) {
      autorize({
        isAuth: !!data?.token,
        token: data.token,
      });

      navigate('/');
    }
  }, [isSuccess]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        component="article"
      >
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Gustho
          </Typography>
          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Input required id="mail" label="Email" name="mail" autoFocus />
              <Input
                required
                name="password"
                label="Senha"
                id="password"
                autoComplete="current-password"
                textFieldProps={{
                  type: 'password',
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
