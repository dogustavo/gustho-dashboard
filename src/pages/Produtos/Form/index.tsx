import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Box, InputAdornment, Button } from '@mui/material';
import styled from '@emotion/styled';

import LayoutDefault from '@/layout';
import { BoxTitle, Editor, Input, InputFile } from '@/components';

import { createProduct } from '@/service';

import schema from './validation';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const methods = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const { mutate, data, isLoading, isSuccess, error } =
    useMutation(createProduct);

  const handleSubmit = methods.handleSubmit(async (values) => {
    const { description, images, name, price, quantity, shortDescription } =
      values;

    mutate({
      description,
      images,
      name,
      price,
      quantity,
      shortDescription,
      metric: 'unidade',
    });
  });

  useEffect(() => {
    if (isSuccess) {
      navigate('/produtos');
    }
  }, [isSuccess]);

  return (
    <LayoutDefault>
      <Container maxWidth="xl">
        <BoxTitle title="Novo Produto" />

        <FormProvider {...methods}>
          <Box component="div" sx={{ marginTop: 8, paddingBottom: 8 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                mt: 1,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ alignSelf: 'flex-start' }}>
                <InputFile name="images" label="Fotos do produto" />
              </Box>

              <Wrapper>
                <Input fullWidth id="name" label="Nome" name="name" autoFocus />
                <Input
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
                  alignItems: 'flex-start',
                  gap: '1rem',
                  flexDirection: 'column',
                }}
              >
                <Input
                  id="shortDescription"
                  label="Descrição curta"
                  name="shortDescription"
                  textFieldProps={{
                    multiline: true,
                    rows: 4,
                  }}
                />
                <Editor name="description" />
              </Box>

              <Button
                sx={{
                  marginTop: '1rem',
                  alignSelf: 'flex-end',
                }}
                color="primary"
                variant="contained"
                type="submit"
              >
                Enviar
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </Container>
    </LayoutDefault>
  );
}
