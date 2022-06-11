import React, { useEffect } from 'react';

import { useAuth } from '@/models';
import api from '@/serivce';

type IProvider = {
  children: React.ReactNode;
};

export default function Provider({ children }: IProvider) {
  const { token, autorize } = useAuth();

  useEffect(() => {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }, [token]);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
      api.defaults.headers.common.authorization = `Bearer ${userToken}`;

      autorize({
        isAuth: !!userToken,
        token: userToken,
      });

      //TODO Lógica para buscar informação do user
    }
  }, [autorize]);

  return <>{children}</>;
}
