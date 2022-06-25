import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

import { CardSearch, BoxTitle, Table, Loading } from '@/components';
import LayoutDefault from '@/layout';
import { Container, Box } from '@mui/material';

import { getProducts } from '@/service';
import { formatMoney } from '@/utils';

export default function ProductList() {
  const navigate = useNavigate();
  const methods = useForm();

  const [products, setProducts] = useState<any>([]);
  const [buttonText, setButtonText] = useState('Buscar produto');
  const [filter, setFilter] = useState({
    page: 1,
    limit: 15,
    search: '',
  });

  const {
    data: allProducts,
    isLoading,
    isSuccess,
    isFetching,
  } = useQuery(['getAllProducts', filter], () => getProducts(filter), {
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
      const table = allProducts?.data?.map((product) => ({
        id: product.id,
        name: product.name,
        qty: product.quantity,
        price: formatMoney(product.price),
      }));

      setProducts(table);
    }
  }, [isSuccess, isFetching]);

  return (
    <LayoutDefault>
      <Container maxWidth="xl">
        <BoxTitle
          button="Novo Produto"
          buttonClick={() => navigate('/produtos/novo')}
          title="Lista de Produtos"
        />

        <FormProvider {...methods}>
          <CardSearch text={buttonText} action={onSubmit} />
        </FormProvider>

        <Box component="div" sx={{ marginTop: 8, paddingBottom: 8 }}>
          <Table
            paginate={{
              count: allProducts?.total || 1,
              page: allProducts?.page || 1,
              rowsPerPage: allProducts?.limit || 10,
            }}
            setFilter={setFilter}
            filter={filter}
            data={products}
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
                header: 'Quantidade',
                acessor: 'qty',
              },
              {
                header: 'Preço',
                acessor: 'price',
              },
            ]}
          />
        </Box>
        <Loading isOpen={isLoading} />
      </Container>
    </LayoutDefault>
  );
}
