import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { hasChildren } from '../../utils';
import { Link } from 'react-router-dom';

const SingleLevel = ({ item }) => {
  return (
    <ListItem button>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

const MultiLevel = ({ item }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem
        sx={{
          borderBottom: open ? '0' : '1px solid #1976D2',
          marginBottom: '1px',
          transition: 'all 0.5s',
          color: '#1976D2',
          fontWeight: 'bold',
        }}
        button
        onClick={handleClick}
      >
        <ListItemIcon sx={{ color: '#1976D2' }}>{item.icon}</ListItemIcon>
        <ListItemText sx={{ fontWeight: 'bold' }} primary={item.name} />
        {open ? (
          <ExpandLess sx={{ marginLeft: 'auto' }} />
        ) : (
          <ExpandMore sx={{ marginLeft: 'auto' }} />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child, key) => (
            <Link
              key={key}
              to={child.href}
              style={{
                display: 'flex',
                textDecoration: 'none',
                alignItems: 'center',
                color: 'inherit',
                width: '100%',
              }}
            >
              <MenuItem key={key} item={child} sx={{ padding: '15px' }} />
            </Link>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};
