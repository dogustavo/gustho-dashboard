import LayoutDefault from '@/layout';

import { BoxTitle, Editor } from '@/components';

import { Container, Box, TextField, InputAdornment } from '@mui/material';
import { useState } from 'react';

// id: string
//   name: string
//   slug: string
//   price: number
//   quantity: number
//   images: string[]
//   short_description: string
//   description: string

// Import React dependencies.

export default function ProductRegister() {
  const [editorText, setEditorText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // console.log(values.get('name'), editorText);

    for (const [key, value] of formData) {
      console.log(key, value);
    }
  };

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
                    <InputAdornment position="start">$</InputAdornment>
                  ),
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
            <Box sx={{ display: 'flex', gap: '1rem', marginBottom: 8 }}>
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
            <Editor content={editorText} setContent={setEditorText} />

            <button>enviar</button>
          </Box>
        </Box>
      </Container>
    </LayoutDefault>
  );
}
