import axios from 'axios';
import api from '@/serivce';

export interface ILogin {
  mail: string;
  password: string;
}

interface IAuth {
  token: string;
}

export const authLogin = async (login: ILogin) => {
  try {
    const response = await api.post<IAuth>('/auth/login', login);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      throw new Error('Ouve um problema com a chamada ');

    throw new Error('An unexpected error occurred');
  }
};
