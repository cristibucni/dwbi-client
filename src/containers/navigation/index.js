import React from 'react';
import { routes } from '../../routes/config';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import history from '../../utils/history';

import { Logout } from '@mui/icons-material';

import { connect } from 'react-redux';

import { logout } from '../../store/actions/login';

const Navigation = (props) => {
  const role = props.auth.user.role;
  return (
    <div
      style={{
        width: '150px',
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
        {routes
          .filter((route) => route.roles.includes(role))
          .map((route) => (
            <ListItem disablePadding key={route.name}>
              <ListItemButton sx={{ width: '100%' }}>
                <Link
                  to={route.href}
                  style={{
                    display: 'flex',
                    textDecoration: 'none',
                    alignItems: 'center',
                    color: 'inherit',
                    width: '100%',
                  }}
                >
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.name} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))}

        <ListItem disablePadding style={{ marginTop: 'auto' }}>
          <ListItemButton onClick={() => props.logout()}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.main,
});

export default connect(mapStateToProps, { logout })(Navigation);
