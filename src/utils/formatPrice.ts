export const formatMoney = (value: number) => {
  if (!value) {
    return
  }

  return value?.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })
}
