import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'

import {
  Container,
  Box,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { LockOutlined } from '@mui/icons-material'
import { authLogin, ILogin } from '@/serivce'
import { useAuth } from '@/models/indext'

export default function Login() {
  const navigate = useNavigate()
  const theme = createTheme()

  const { isAuth, autorize } = useAuth()

  const { mutate, data, isLoading, isSuccess } =
    useMutation(authLogin)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    }
  }, [])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const payload = {
      mail: values.get('email'),
      password: values.get('password')
    } as ILogin

    mutate({ ...payload })
  }

  useEffect(() => {
    if (isSuccess && !isAuth) {
      autorize({
        isAuth: !!data?.token,
        token: data.token
      })

      navigate('/')
    }
  }, [isSuccess])

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        component="article"
      >
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Gustho
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
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
        </Box>
      </Container>
    </ThemeProvider>
  )
}
