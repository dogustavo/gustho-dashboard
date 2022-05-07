import { Box, Typography, Button } from '@mui/material'

interface ITitle {
  button: string
  title: string
}

export default function Title({ button, title }: ITitle) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      component="div"
    >
      <Typography variant="h5" component="h1">
        {title}
      </Typography>

      <Button color="primary" variant="outlined">
        {button}
      </Button>
    </Box>
  )
}
