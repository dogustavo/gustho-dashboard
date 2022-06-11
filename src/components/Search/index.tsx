import { Button, Card, Box, InputAdornment, SvgIcon } from '@mui/material';

import { Input } from '@/components';

import { styled } from '@mui/material/styles';

import { Search } from '@mui/icons-material';

interface ISearch {
  text: string;
  action: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CardContent = styled('form')(({ theme }: any) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const Wrapper = styled('div')(({ theme }: any) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '50%',
  },
}));

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
          gap: '1rem',
        }}
      >
        <Wrapper>
          <Input
            textFieldProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <Search />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            placeholder={text}
            variant="outlined"
            name="search"
            id="search"
            label="Buscar"
            sx={{ maxWidth: 500 }}
          />
        </Wrapper>

        <Button color="primary" variant="contained" type="submit">
          {text}
        </Button>
      </CardContent>
    </Card>
  );
}
