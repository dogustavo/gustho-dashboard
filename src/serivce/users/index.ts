import axios from 'axios'
import api from '@/serivce'

interface IFilter {
  page?: number
  limit?: number
  search?: string
}

interface IUsersPaginate {
  data: {
    birthdate: string
    mail: string
    name: string
    phone: string
    id: number
  }[]
}

export const getUsers = async (filter: IFilter) => {
  try {
    const response = await api.get<IUsersPaginate>('/clients/all', {
      params: filter
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error))
      throw new Error('Ouve um problema com a chamada ')

    throw new Error('An unexpected error occurred')
  }
}
