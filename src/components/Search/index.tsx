import {
  Button,
  Card,
  TextField,
  InputAdornment,
  SvgIcon
} from '@mui/material'

import { styled } from '@mui/material/styles'

import { Search } from '@mui/icons-material'

interface ISearch {
  text: string
  action: (event: React.FormEvent<HTMLFormElement>) => void
}

const CardContent = styled('form')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center'
  }
}))

export default function CardSearch({ text, action }: ISearch) {
  return (
    <Card sx={{ mt: 5 }}>
      <CardContent
        onSubmit={action}
        style={{ padding: '16px' }}
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <TextField
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <Search />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          placeholder={text}
          variant="outlined"
          name="search"
          id="search"
          sx={{ maxWidth: 500 }}
        />

        <Button color="primary" variant="contained" type="submit">
          {text}
        </Button>
      </CardContent>
    </Card>
  )
}
