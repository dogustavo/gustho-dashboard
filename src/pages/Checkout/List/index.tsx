import { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import { CardSearch, BoxTitle, Table, Loading } from '@/components';
import LayoutDefault from '@/layout';
import { Container, Box, Typography, Button, Modal, Grid } from '@mui/material';

import { getCheckout } from '@/service';
import { convertDate, formatMoney } from '@/utils';

export default function ProductList() {
  const navigate = useNavigate();
  const methods = useForm();

  const [open, setOpen] = useState<boolean>(false);
  const [checkout, setCheckout] = useState<any>([]);
  const [checkoutSelected, setCheckoutSelected] = useState<any>({});
  const [buttonText, setButtonText] = useState('Buscar produto');
  const [filter, setFilter] = useState({
    page: 1,
    limit: 15,
    search: '',
  });

  const {
    data: allCheckout,
    isLoading,
    isSuccess,
    isFetching,
  } = useQuery(['getAllCheckout', filter], () => getCheckout(filter), {
    keepPreviousData: true,
  });

  const onSubmit = methods.handleSubmit(async ({ search }) => {
    if (!search) {
      setFilter({
        page: 1,
        limit: 10,
        search: '',
      });
      setButtonText('Buscar produto');
      return;
    }

    setFilter((state) => ({ ...state, search }));
    setButtonText('Limpar');
    methods.setValue('search', '');
  });

  useEffect(() => {
    if (isSuccess) {
      const table = allCheckout?.data?.map((item) => ({
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
    }
  }, [isSuccess, isFetching]);

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
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{
              height: '100%',
            }}
          >
            <Box
              sx={{
                width: 1200,
                height: 700,
                backgroundColor: '#fff',
                borderRadius: '30px',
                padding: '20px',
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Resumo da compra
              </Typography>
              <br />

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

              <Grid container spacing={3}>
                <Grid item xs>
                  <Typography component="p">Nome do cliente:</Typography>
                  <Typography variant="h6" component="p">
                    {checkoutSelected?.client?.name}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography component="p">Telefone:</Typography>
                  <Typography variant="h6" component="p">
                    {checkoutSelected?.client?.phone}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography component="p">Email:</Typography>
                  <Typography variant="h6" component="p">
                    {checkoutSelected?.client?.mail}
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

              <Grid
                direction="column"
                justifyContent="space-between"
                sx={{ height: '400px' }}
                display="flex"
              >
                <div
                  style={{
                    width: '100%',
                    height: '80%',
                    overflowY: 'scroll',
                  }}
                >
                  {checkoutSelected?.products?.map(renderItemModal)}
                </div>

                <Grid display="flex" direction="row" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Fechar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Modal>
      </Container>
    </LayoutDefault>
  );
}
