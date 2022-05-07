import { Home, ProductList } from '@/pages'

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
  }
]

export default routes
