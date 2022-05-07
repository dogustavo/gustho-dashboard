import { useState } from 'react'
import { styled } from '@mui/material/styles'

import {
  CssBaseline,
  Box,
  Toolbar,
  Divider,
  IconButton,
  AppBarProps as MuiAppBarProps,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar
} from '@mui/material'
import { Menu, ChevronLeft, Logout } from '@mui/icons-material'

import { MenuItens } from './menuItens'

const drawerWidth: number = 240

export default function DrawerMenu() {
  const [open, setOpen] = useState(false)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MuiAppBar>
        <Toolbar
          sx={{
            pr: '24px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Abrir menu"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { opacity: '0' })
              }}
            >
              <Menu />
            </IconButton>

            <IconButton color="inherit">
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>
      </MuiAppBar>
      <MuiDrawer
        anchor="left"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1]
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <Divider />

        <Box component="nav" sx={{ minWidth: '16rem' }}>
          <MenuItens />
        </Box>
      </MuiDrawer>
    </Box>
  )
}
