import { format, parseISO } from 'date-fns'

export const convertDate = (date: string) => {
  const parsed = parseISO(date)
  const formatedDate = format(parsed, 'dd/MM/yyyy')
  return formatedDate
}
