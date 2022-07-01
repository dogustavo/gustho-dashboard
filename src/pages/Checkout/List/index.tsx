import { useState, useCallback } from 'react';
import { useQuery } from 'react-query';

import { Table, Loading } from '@/components';
import LayoutDefault from '@/layout';
import { Container, Box, Typography, Button, Modal, Grid } from '@mui/material';

import { getCheckout } from '@/service';
import { convertDate, formatMoney } from '@/utils';
import styled from '@emotion/styled';
import { useAuth } from '@/models';

const Wrapper = styled('div')(({ theme }: any) => ({
  height: '100vh',
  backgroundColor: '#fff',
  borderRadius: '8px 0 0 8px',
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '50%',
  },
}));

export default function ProductList() {
  const { isAuth } = useAuth();

  const [open, setOpen] = useState<boolean>(false);
  const [checkout, setCheckout] = useState<any>([]);
  const [checkoutSelected, setCheckoutSelected] = useState<any>({});
  const [filter, setFilter] = useState({
    page: 1,
    limit: 15,
    search: '',
  });

  const { data: allCheckout, isLoading } = useQuery(
    ['getAllCheckout', filter],
    () => getCheckout(filter),
    {
      onSuccess: (items) => {
        const table = items?.data?.map((item) => ({
          id: item.id,
          name: item.client.name,
          total: formatMoney(item.total),
          createdAt: convertDate(item.createdAt),
          action: (
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
                setCheckoutSelected(item);
              }}
            >
              Ver mais
            </Button>
          ),
        }));

        setCheckout(table);
      },
      enabled: isAuth,
      keepPreviousData: true,
    }
  );

  const renderItemModal = useCallback((item: any, key: number) => {
    return (
      <Box
        sx={{
          borderBottom: '1px solid',
          padding: '15px 0',
        }}
      >
        <Grid container spacing={3} key={key}>
          <Grid item xs>
            <Typography component="p">{item?.name}</Typography>
          </Grid>
          <Grid item xs>
            <Typography component="p">
              {item?.CheckoutItemsDTO?.quantity}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography component="p">
              {formatMoney(item?.CheckoutItemsDTO?.valueUnit)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  }, []);

  return (
    <LayoutDefault>
      <Container maxWidth="xl">
        <Typography variant="h5" component="h1">
          Lista de Compras
        </Typography>

        <Box component="div" sx={{ marginTop: 8, paddingBottom: 8 }}>
          <Table
            paginate={{
              count: allCheckout?.total || 1,
              page: allCheckout?.page || 1,
              rowsPerPage: allCheckout?.limit || 10,
            }}
            setFilter={setFilter}
            filter={filter}
            data={checkout}
            rows={[
              {
                header: 'ID',
                acessor: 'id',
              },
              {
                header: 'Nome',
                acessor: 'name',
              },
              {
                header: 'Total',
                acessor: 'total',
              },
              {
                header: 'Data',
                acessor: 'createdAt',
              },
              {
                header: 'Ação',
                acessor: 'action',
              },
            ]}
          />
        </Box>
        <Loading isOpen={isLoading} />

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid container justifyContent="flex-end">
            <Wrapper>
              <div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Resumo da compra
                </Typography>
                <br />

                <Grid container spacing={3}>
                  <Grid item xs>
                    <Typography component="p">Nome do cliente:</Typography>
                    <Typography component="p">
                      {checkoutSelected?.client?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography component="p">Telefone:</Typography>
                    <Typography component="p">
                      {checkoutSelected?.client?.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography component="p">Email:</Typography>
                    <Typography component="p">
                      {checkoutSelected?.client?.mail}
                    </Typography>
                  </Grid>
                </Grid>
                <hr />

                <Grid container spacing={3}>
                  <Grid item xs>
                    <Typography component="p">Data da compra:</Typography>
                    <Typography component="p">
                      {convertDate(
                        checkoutSelected?.createdAt || new Date().toISOString()
                      )}
                    </Typography>
                  </Grid>

                  <Grid item xs>
                    <Typography component="p">Valor da compra:</Typography>
                    <Typography component="p">
                      {formatMoney(checkoutSelected?.total || 0.0)}
                    </Typography>
                  </Grid>

                  <Grid item xs>
                    <Typography component="p">Status da compra:</Typography>
                    <Typography component="p">
                      {checkoutSelected?.status}
                    </Typography>
                  </Grid>
                </Grid>

                <hr />

                <br />
                <Grid container spacing={3}>
                  <Grid item xs>
                    <Typography component="h6">Produto</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography component="h6">Quantidade</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography component="h6">Valor</Typography>
                  </Grid>
                </Grid>

                <Box
                  component="div"
                  justifyContent="space-between"
                  flexDirection="column"
                  display="flex"
                >
                  {checkoutSelected?.products?.map(renderItemModal)}
                </Box>
              </div>

              <Button
                variant="contained"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Fechar
              </Button>
            </Wrapper>
          </Grid>
        </Modal>
      </Container>
    </LayoutDefault>
  );
}
