import { useNavigate } from 'react-router-dom';
import LayoutDefault from '@/layout';

import { CardSearch, BoxTitle, Table } from '@/components';

import { Container, Box } from '@mui/material';

export default function ProductList() {
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const values = new FormData(event.currentTarget);

    console.log(values.get('search'));
  };

  return (
    <LayoutDefault>
      <Container maxWidth="xl">
        <BoxTitle
          button="Novo Produto"
          buttonClick={() => navigate('/produtos/novo')}
          title="Lista de Produtos"
        />

        <CardSearch text="Buscar produto" action={onSubmit} />

        <Box component="div" sx={{ marginTop: 8, paddingBottom: 8 }}>
          <Table
            paginate={{ page: 0, rowsPerPage: 5 }}
            data={[
              {
                name: 'Nintendo',
                qty: 32,
                sellers: 10,
              },
              {
                name: 'Io Io',
                qty: 12,
                sellers: 10,
              },
              {
                name: 'Cadeira',
                qty: 23,
                sellers: 10,
              },
              {
                name: 'Nintendo Ds',
                qty: 32,
                sellers: 10,
              },
              {
                name: 'Half life',
                qty: 12,
                sellers: 10,
              },
              {
                name: 'Mouse',
                qty: 23,
                sellers: 10,
              },
            ]}
            rows={[
              {
                header: 'Teste',
                acessor: 'name',
              },
              {
                header: 'Quantidade',
                acessor: 'qty',
              },
              {
                header: 'Vendas',
                acessor: 'sellers',
              },
            ]}
          />
        </Box>
      </Container>
    </LayoutDefault>
  );
}
