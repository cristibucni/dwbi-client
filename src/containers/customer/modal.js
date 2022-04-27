import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { ButtonGroup, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomerModal({
  customer,
  setDoubleClickedCustomer,
  editCustomer,
}) {
  const [edit, setEdit] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ ...customer });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(customer)) {
      setOpen(true);
      setNewCustomer(customer);
    }
  }, [customer]);

  const onEditClick = () => {
    setEdit(!edit);
  };

  const handleEdit = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setDoubleClickedCustomer(null);
  };

  const handleSave = () => {
    editCustomer(newCustomer);
    handleClose();
  };

  if (_.isEmpty(customer)) return <div></div>;

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Customer {newCustomer.id}
            </Typography>
          </Toolbar>
        </AppBar>
        {edit ? (
          <>
            <ListItem button>
              <ListItemText
                primary={`Customer ID`}
                secondary={newCustomer.id}
              />
            </ListItem>
            <TextField
              sx={{ margin: '15px' }}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              name={'firstName'}
              value={newCustomer.firstName}
              onChange={(e) => handleEdit(e)}
            />
            <TextField
              sx={{ margin: '15px' }}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              name={'lastName'}
              value={newCustomer.lastName}
              onChange={(e) => handleEdit(e)}
            />
            <TextField
              sx={{ margin: '15px' }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name={'email'}
              value={newCustomer.email}
              onChange={(e) => handleEdit(e)}
            />
            <TextField
              sx={{ margin: '15px' }}
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              name={'phone'}
              value={newCustomer.phone}
              onChange={(e) => handleEdit(e)}
            />
          </>
        ) : (
          <List>
            <ListItem button>
              <ListItemText
                primary={`Customer ID`}
                secondary={newCustomer.id}
              />
            </ListItem>
            <Divider />

            <ListItem button>
              <ListItemText
                primary={`First Name`}
                secondary={newCustomer.firstName}
              />
            </ListItem>
            <Divider />

            <ListItem button>
              <ListItemText
                primary={`Last Name`}
                secondary={newCustomer.lastName}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary={`Email`} secondary={newCustomer.email} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary={`Phone`} secondary={newCustomer.phone} />
            </ListItem>
            <Divider />
          </List>
        )}

        <ButtonGroup
          disableElevation
          sx={{ gap: '10px', justifyContent: 'flex-end', marginRight: '10px' }}
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button color="secondary" onClick={() => onEditClick()}>
            Edit
          </Button>
          <Button color="primary" onClick={() => handleSave()}>
            Save
          </Button>
        </ButtonGroup>
      </Dialog>
    </div>
  );
}
