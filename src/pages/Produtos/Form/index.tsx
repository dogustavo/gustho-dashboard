import { useState } from 'react'
import LayoutDefault from '@/layout'

import { BoxTitle, Editor } from '@/components'

import {
  Container,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  ImageList,
  ImageListItem,
  Button,
  Alert
} from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import styled from '@emotion/styled'

import { getBase64 } from '@/utils'
import { isError } from 'react-query'

const Wrapper = styled('div')(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row'
  }
}))

export default function ProductRegister() {
  const [editorText, setEditorText] = useState<string>('')
  const [error, setError] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
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

    const convertedImages = await Promise.all(
      images.map((image) => getBase64(image))
    )

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
      if (fileList.length > 3) {
        setError(true)
        return
      }

      for (let i = 0; i < fileList.length; i++) {
        images.push(URL.createObjectURL(fileList[i]))
      }
    }

    setError(false)
    setPreviewImages(images.slice(0, 3))
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
            <Wrapper>
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
            </Wrapper>
            <Box
              component="div"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexDirection: 'column'
              }}
            >
              <TextField
                margin="normal"
                multiline
                fullWidth
                rows={2}
                id="short_description"
                label="Descrição curta"
                name="short_description"
              />
              <Editor
                content={editorText}
                setContent={setEditorText}
              />
              <Box sx={{ width: '100%' }}>
                <div>
                  <p>Imagens do produto</p>
                  {error && (
                    <Alert severity="error">
                      Suporte máximo para 3 imagens
                    </Alert>
                  )}
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
                        sx={{ maxWidth: 500, height: 'auto' }}
                        cols={3}
                        rowHeight={164}
                      >
                        {previewImages.map((item: string) => (
                          <ImageListItem key={item}>
                            <img
                              src={item}
                              alt={item}
                              loading="lazy"
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    )}
                  </label>
                </div>
              </Box>
            </Box>

            <Button color="primary" variant="contained" type="submit">
              Enviar
            </Button>
          </Box>
        </Box>
      </Container>
    </LayoutDefault>
  )
}
