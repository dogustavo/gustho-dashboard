import Router from './routes';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Auth } from '@/components';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Auth>
        <Router />
      </Auth>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
