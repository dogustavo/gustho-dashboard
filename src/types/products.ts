export interface IProduct {
  name: string
  price: number
  quantity: number
  images: string[]
  shortDescription: string
  description: string
  metric: 'unidade' | 'peso'
}

export interface IProductAll {
  id: number
  name: string
  price: number
  quantity: number
  images: string[]
  shortDescription: string
  description: string
  metric: 'unidade' | 'peso'
}

export interface IProducts {
  products: IProductAll[]
}
