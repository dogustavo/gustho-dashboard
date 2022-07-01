import axios from 'axios';
import api from '@/service';

import { IProduct, IProductAll } from '@/types';

interface IPrductsPaginate {
  data: IProductAll[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

interface IFilter {
  page?: number;
  limit?: number;
  search?: string;
}

export const createProduct = async (payload: IProduct) => {
  try {
    const response = await api.post<IProduct>('/products', payload);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      throw new Error('Ouve um problema com a chamada ');

    throw new Error('An unexpected error occurred');
  }
};

export const getProducts = async (filter: IFilter) => {
  try {
    const response = await api.get<IPrductsPaginate>('/products/all', {
      params: filter,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      throw new Error('Ouve um problema com a chamada ');

    throw new Error('An unexpected error occurred');
  }
};
