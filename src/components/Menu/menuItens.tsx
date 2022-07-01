import * as React from 'react';
import { Link } from 'react-router-dom';

import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { Dashboard, People, Inventory, LocalAtm } from '@mui/icons-material';

const menuItens = [
  {
    icon: <Dashboard />,
    name: 'Início',
    goTo: '/',
  },
  {
    icon: <Inventory />,
    name: 'Produtos',
    goTo: '/produtos',
  },
  {
    icon: <People />,
    name: 'Usuários',
    goTo: '/usuarios',
  },
  {
    icon: <LocalAtm />,
    name: 'Compras',
    goTo: '/compras',
  },
];

export function MenuItens() {
  return (
    <React.Fragment>
      {menuItens.map((item) => (
        <ListItemButton key={item.name} to={item.goTo} component={Link}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
}
