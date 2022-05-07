import LayoutDefault from '@/layout'

import { CardSearch, BoxTitle } from '@/components'

import { Container } from '@mui/material'

export default function UserList() {
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
        <BoxTitle title="Lista de Usuários" />

        <CardSearch text="Buscar usuário" action={onSubmit} />
      </Container>
    </LayoutDefault>
  )
}
