import axios from 'axios';
import api from '@/service';
import { IProductAll } from '@/types';

interface IClient {
  id: number;
  name: string;
  cpf?: string;
  birthdate: Date;
  mail: string;
  phone: string;
}

interface IFilter {
  page?: number;
  limit?: number;
  search?: string;
}

interface ICheckoutPaginate {
  data: {
    id: number;
    status: string;
    total: number;
    clientsId: number;
    clientAddressId: number;
    products: IProductAll[];
    client: IClient;
    createdAt: string;
  }[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export const getCheckout = async (filter: IFilter) => {
  try {
    const response = await api.get<ICheckoutPaginate>('/checkout/all', {
      params: filter,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      throw new Error('Ouve um problema com a chamada ');

    throw new Error('An unexpected error occurred');
  }
};
