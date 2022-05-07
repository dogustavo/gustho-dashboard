import { Box, Typography, Button } from '@mui/material'

import { styled } from '@mui/material/styles'

interface ITitle {
  button?: string
  title: string
}

const Wrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center'
  }
}))

export default function Title({ button, title }: ITitle) {
  return (
    <Wrapper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}
    >
      <Typography variant="h5" component="h1">
        {title}
      </Typography>

      {button && (
        <Button color="primary" variant="outlined">
          {button}
        </Button>
      )}
    </Wrapper>
  )
}
