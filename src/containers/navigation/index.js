import React from 'react';
import { routes } from '../../routes/config';
import List from '@mui/material/List';
import { MenuItem } from './comp';

const Navigation = (props) => {
  return (
    <div
      style={{
        width: '250px',
        display: 'flex',
        height: 'calc(100vh - 64px)',
        flexDirection: 'column',
        textAlign: 'left',
      }}
    >
      <List
        disablePadding
        style={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        {routes.map((route, index) => (
          <MenuItem key={index} item={route} />
        ))}
      </List>
    </div>
  );
};

export default Navigation;
