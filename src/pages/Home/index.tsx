import { Loading, Table } from '@/components';
import LayoutDefault from '@/layout';
import { getCheckout, getCurrentUser } from '@/service';
import { Container, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { formatMoney, convertDate } from '@/utils';

const filter = {
  page: 1,
  limit: 5,
  search: '',
};

export default function Home() {
  const { data, isLoading, isSuccess, isFetching } = useQuery(
    ['getCurrentUser'],
    () => getCurrentUser(),
    {
      keepPreviousData: true,
    }
  );

  const {
    data: allCheckout,
    isLoading: isLoadingCheckout,
    isSuccess: isSuccessCheckout,
    isFetching: isFetchingCheckout,
  } = useQuery(['getAllCheckout'], () => getCheckout(filter), {
    keepPreviousData: true,
  });

  const renderTitle = useCallback(() => {
    if (!data?.name) {
      return <></>;
    }

    return (
      <Typography variant="h5" component="h1">
        Seja Bem-Vindo, {data?.name}!
      </Typography>
    );
  }, [data]);

  const renderLastBuys = useCallback(() => {
    if (isLoadingCheckout) {
      return <></>;
    }

    const dataList = allCheckout?.data.map((item) => ({
      ...item,
      total: formatMoney(item.total),
      createdAt: convertDate(item.createdAt),
    }));

    return (
      <Table
        paginate={{
          count: allCheckout?.total || 1,
          page: allCheckout?.page || 1,
          rowsPerPage: allCheckout?.limit || 10,
        }}
        setFilter={() => {}}
        filter={filter}
        data={dataList as any}
        rows={[
          {
            header: 'ID',
            acessor: 'id',
          },
          {
            header: 'Total',
            acessor: 'total',
          },
          {
            header: 'Status',
            acessor: 'status',
          },
          {
            header: 'Data',
            acessor: 'createdAt',
          },
        ]}
      />
    );
  }, [allCheckout, isLoadingCheckout]);

  return (
    <LayoutDefault>
      <Container maxWidth="xl">
        {renderTitle()}
        <br />
        <br />

        <Typography variant="h6" component="h2">
          Últimas compras
        </Typography>
        {renderLastBuys()}
        <Loading isOpen={isLoading} />
      </Container>
    </LayoutDefault>
  );
}
