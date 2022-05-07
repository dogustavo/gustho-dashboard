import { Home, ProductList, UserList } from '@/pages'

const routes = [
  {
    path: '/',
    element: <Home />,
    isAuth: true
  },
  {
    path: '/produtos',
    element: <ProductList />,
    isAuth: true
  },
  {
    path: '/usuarios',
    element: <UserList />,
    isAuth: true
  }
]

export default routes
