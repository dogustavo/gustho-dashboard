import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom'

import { Login } from '@/pages'

import routes from './router'

interface IRoutes {
  isLogged: boolean
}

const PrivateRoute = ({ isLogged }: IRoutes) => {
  const isAuth = localStorage.getItem('token') !== null

  if (!isAuth && isLogged) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, id) => (
          <Route
            key={id}
            element={<PrivateRoute isLogged={route.isAuth} />}
          >
            <Route element={route.element} path={route.path} />
          </Route>
        ))}

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}
