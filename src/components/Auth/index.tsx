import React, { useEffect } from 'react';

import { useAuth } from '@/models';
import api from '@/service';

type IProvider = {
  children: React.ReactNode;
};

export default function Provider({ children }: IProvider) {
  const userToken = localStorage.getItem('userToken');
  const { autorize } = useAuth();

  useEffect(() => {
    if (userToken) {
      api.defaults.headers.common.authorization = `Bearer ${userToken}`;

      autorize({
        isAuth: !!userToken,
        token: userToken,
      });
    }
  }, [userToken]);

  return <>{children}</>;
}
