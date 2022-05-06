import { Home, UserDetail, UserList } from '@/pages'

const routes = [
  {
    path: '/',
    element: <Home />,
    isAuth: true
  },
  {
    path: '/users',
    element: <UserList />,
    isAuth: true
  },
  {
    path: '/users/:id',
    element: <UserDetail />,
    isAuth: true
  }
]

export default routes
