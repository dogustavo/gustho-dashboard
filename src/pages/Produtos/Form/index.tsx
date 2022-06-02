import LayoutDefault from '@/layout'

import { BoxTitle, Editor } from '@/components'

import {
  Container,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  ImageList,
  ImageListItem
} from '@mui/material'
import { useState } from 'react'
import { PhotoCamera } from '@mui/icons-material'

export default function ProductRegister() {
  const [editorText, setEditorText] = useState<string>('')
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const images = formData.getAll('images')

    if (images.length < 2 || images.length > 3) {
      console.log('invalido images')
      return
    }

    if (!editorText) {
      console.log('invalido editorText')
      return
    }

    for (const [key, value] of formData) {
      console.log(key, value)
    }
  }

  const handleShowSelectedImages = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = evt.target.files
    let images = []

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        images.push(URL.createObjectURL(fileList[i]))
      }
    }

    setPreviewImages(images)
  }

  console.log(editorText)

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
                fullWidth
                id="name"
                label="Nome"
                name="name"
                autoFocus
              />
              <TextField
                margin="normal"
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
              />
              <TextField
                margin="normal"
                fullWidth
                id="quantity"
                label="Quantidade"
                name="quantity"
                type="number"
              />
            </Box>
            <Box
              sx={{ display: 'flex', gap: '1rem', marginBottom: 8 }}
            >
              <TextField
                multiline
                fullWidth
                rows={2}
                id="short_description"
                label="Descrição curta"
                name="short_description"
              />
            </Box>
            <Editor content={editorText} setContent={setEditorText} />

            <div>
              <p>Imagens do produto</p>
              <label htmlFor="images">
                <input
                  accept=".jpg, .jpeg, .png"
                  name="images"
                  multiple
                  id="images"
                  type="file"
                  onChange={(e) => handleShowSelectedImages(e)}
                  hidden
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>

                {previewImages && (
                  <ImageList
                    sx={{ width: 500, height: 'auto' }}
                    cols={3}
                    rowHeight={164}
                  >
                    {previewImages.map((item) => (
                      <ImageListItem key={item}>
                        <img src={item} alt={item} loading="lazy" />
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </label>
            </div>

            <button>enviar</button>
          </Box>
        </Box>
      </Container>
    </LayoutDefault>
  )
}
