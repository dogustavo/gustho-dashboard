import LayoutDefault from '@/layout'

import { CardSearch, BoxTitle } from '@/components'

import { Container } from '@mui/material'

export default function ProductList() {
  const onSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()

    const values = new FormData(event.currentTarget)

    console.log(values.get('search'))
  }

  return (
    <LayoutDefault>
      <Container maxWidth="xl">
        <BoxTitle button="Novo Produto" title="Lista de Produtos" />

        <CardSearch text="Buscar produto" action={onSubmit} />
      </Container>
    </LayoutDefault>
  )
}
