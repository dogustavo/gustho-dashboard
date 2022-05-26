import LayoutDefault from '@/layout'

import { BoxTitle } from '@/components'

import {
  Container,
  Box,
  TextField,
  InputAdornment
} from '@mui/material'

// id: string
//   name: string
//   slug: string
//   price: number
//   quantity: number
//   images: string[]
//   short_description: string
//   description: string

export default function ProductRegister() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const values = new FormData(event.currentTarget)

    console.log({
      email: values.get('email'),
      passwprd: values.get('password')
    })
  }

  return (
    <LayoutDefault>
      <Container maxWidth="xl">
        <BoxTitle title="Novo Produto" />

        <Box component="div" sx={{ marginTop: 8, paddingBottom: 8 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Nome"
                name="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="Preço"
                name="price"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      $
                    </InputAdornment>
                  )
                }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="quantity"
                label="Quantidade"
                name="quantity"
                autoFocus
              />
            </Box>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <TextField
                required
                multiline
                fullWidth
                rows={2}
                id="short_description"
                label="Descrição curta"
                name="short_description"
                autoFocus
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </LayoutDefault>
  )
}
