import { useState, useEffect } from 'react';
import LayoutDefault from '@/layout';

import { CardSearch, BoxTitle, Loading, Table } from '@/components';

import { Container, Box } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { useQuery } from 'react-query';

import { getUsers } from '@/service';
import { convertDate } from '@/utils';

export default function UserList() {
  const methods = useForm();

  const [buttonText, setButtonText] = useState('Buscar usuário');
  const [users, setUsers] = useState<any>([]);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 25,
    search: '',
  });

  const {
    data: allUsers,
    isLoading,
    isSuccess,
    isFetching,
  } = useQuery(['getAllUsers', filter], () => getUsers(filter), {
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
      const table = allUsers?.data.map((client) => ({
        id: client.id,
        name: client.name,
        mail: client.mail,
        birthdate: convertDate(client.birthdate),
        phone: client.phone,
      }));

      setUsers(table);
    }
  }, [isSuccess, isFetching]);

  return (
    <LayoutDefault>
      <Container maxWidth="xl">
        <BoxTitle title="Lista de Usuários" />

        <FormProvider {...methods}>
          <CardSearch text={buttonText} action={onSubmit} />
        </FormProvider>

        <Box component="div" sx={{ marginTop: 8, paddingBottom: 8 }}>
          <Table
            paginate={{
              count: 1,
              page: 1,
              rowsPerPage: 10,
            }}
            setFilter={setFilter}
            filter={filter}
            data={users}
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
                header: 'E-mail',
                acessor: 'mail',
              },
              {
                header: 'Aniversário',
                acessor: 'birthdate',
              },
              {
                header: 'Celular',
                acessor: 'phone',
              },
            ]}
          />
        </Box>
        <Loading isOpen={isLoading} />
      </Container>
    </LayoutDefault>
  );
}
