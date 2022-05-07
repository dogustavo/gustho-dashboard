import {
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@mui/material'

import { Search } from '@mui/icons-material'

interface ISearch {
  text: string
  action: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function CardSearch({ text, action }: ISearch) {
  return (
    <Card sx={{ mt: 5 }}>
      <CardContent
        component="form"
        onSubmit={action}
        style={{ padding: '16px' }}
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between'
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
