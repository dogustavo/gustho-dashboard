import { Home, ProductList, UserList, ProductRegister } from '@/pages';
import { CheckoutList } from '@/pages/Checkout';

const routes = [
  {
    path: '/',
    element: <Home />,
    isAuth: true,
  },
  {
    path: '/produtos',
    element: <ProductList />,
    isAuth: true,
  },
  {
    path: '/produtos/novo',
    element: <ProductRegister />,
    isAuth: true,
  },
  {
    path: '/usuarios',
    element: <UserList />,
    isAuth: true,
  },
  {
    path: '/compras',
    element: <CheckoutList />,
    isAuth: true,
  },
];

export default routes;
