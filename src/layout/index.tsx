import { DrawerMenu } from '@/components'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { CssBaseline, Box, Toolbar } from '@mui/material'

interface ILayout {
  children: React.ReactElement
}

const mdTheme = createTheme()

export default function LayoutDefault({ children }: ILayout) {
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <DrawerMenu />
        <Box
          component="article"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar
            style={{ paddingLeft: 0, paddingRight: 0 }}
            sx={{
              paddingTop: '120px',
              paddingBottom: '50px',
              height: '100%',
              display: 'inherit'
            }}
          >
            {children}
          </Toolbar>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
