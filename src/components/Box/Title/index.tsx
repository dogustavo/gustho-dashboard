import { Box, Typography, Button } from '@mui/material'

import { styled } from '@mui/material/styles'

interface ITitle {
  button?: string
  buttonClick?: () => void
  title: string
}

const Wrapper = styled('div')(({ theme }: any) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center'
  }
}))

export default function Title({
  button,
  buttonClick,
  title
}: ITitle) {
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
        <Button
          color="primary"
          onClick={buttonClick}
          variant="outlined"
        >
          {button}
        </Button>
      )}
    </Wrapper>
  )
}
