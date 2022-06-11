import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import LayoutDefault from '@/layout';
import { BoxTitle, Editor, Input, InputFile } from '@/components';

import {
  Container,
  Box,
  InputAdornment,
  IconButton,
  ImageList,
  ImageListItem,
  Button,
  Alert,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import styled from '@emotion/styled';

import { getBase64 } from '@/utils';

const Wrapper = styled('div')(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

export default function ProductRegister() {
  const methods = useForm();

  const [error, setError] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleSubmit = async (values: any) => {
    console.log(values);
    // event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const images = formData.getAll('images');
    // if (images.length < 2 || images.length > 3) {
    //   console.log('invalido images');
    //   return;
    // }
    // if (!editorText) {
    //   console.log('invalido editorText');
    //   return;
    // }
    // const convertedImages = await Promise.all(
    //   images.map((image) => getBase64(image))
    // );
    // for (const [key, value] of formData) {
    //   console.log(key, value);
    // }
  };

  const handleShowSelectedImages = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList = evt.target.files;
    let images = [];

    if (fileList) {
      if (fileList.length > 3) {
        setError(true);
        return;
      }

      for (let i = 0; i < fileList.length; i++) {
        images.push(URL.createObjectURL(fileList[i]));
      }
    }

    setError(false);
    setPreviewImages(images.slice(0, 3));
  };

  return (
    <LayoutDefault>
      <Container maxWidth="xl">
        <BoxTitle title="Novo Produto" />

        <FormProvider {...methods}>
          <Box component="div" sx={{ marginTop: 8, paddingBottom: 8 }}>
            <Box
              component="form"
              onSubmit={methods.handleSubmit(handleSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Wrapper>
                <Input fullWidth id="name" label="Nome" name="name" autoFocus />
                <Input
                  margin="normal"
                  id="price"
                  label="Preço"
                  name="price"
                  textFieldProps={{
                    type: 'number',
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
                <Input
                  margin="normal"
                  id="quantity"
                  label="Quantidade"
                  name="quantity"
                  textFieldProps={{
                    type: 'number',
                  }}
                />
              </Wrapper>
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexDirection: 'column',
                }}
              >
                <Input
                  margin="normal"
                  id="short_description"
                  label="Descrição curta"
                  name="short_description"
                  textFieldProps={{
                    multiline: true,
                    rows: 4,
                  }}
                />
                <Editor name="product_description" />
                <Box sx={{ alignSelf: 'flex-start' }}>
                  <InputFile name="images" />
                </Box>
              </Box>

              <Button color="primary" variant="contained" type="submit">
                Enviar
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </Container>
    </LayoutDefault>
  );
}
