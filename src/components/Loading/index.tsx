import { Backdrop, CircularProgress } from '@mui/material'

interface ILoading {
  isOpen: boolean
}

export default function Loading({ isOpen }: ILoading) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: 2 }} open={isOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
