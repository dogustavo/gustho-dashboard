import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

import { Login } from '@/pages';

import routes from './router';

interface IRoutes {
  isLogged: boolean;
}

const PrivateRoute = ({ isLogged }: IRoutes) => {
  const isAuth = localStorage.getItem('userToken');
  const location = useLocation();

  if (!isAuth && isLogged) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, id) => (
          <Route key={id} element={<PrivateRoute isLogged={route.isAuth} />}>
            <Route element={route.element} path={route.path} />
          </Route>
        ))}

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
