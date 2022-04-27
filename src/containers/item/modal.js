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

export default function ItemModal({ item, setDoubleClickedItem, editItem }) {
  const [edit, setEdit] = useState(false);
  const [newItem, setNewItem] = useState({ ...item });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(item)) {
      setOpen(true);
      setNewItem(item);
      setEdit(false);
    }
  }, [item]);

  const onEditClick = () => {
    setEdit(!edit);
  };

  const handleEdit = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setDoubleClickedItem(null);
  };

  const handleSave = () => {
    editItem(newItem);
    handleClose();
  };

  if (_.isEmpty(item)) return <div></div>;

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
              Item {newItem.id}
            </Typography>
          </Toolbar>
        </AppBar>
        {edit ? (
          <>
            <ListItem button>
              <ListItemText primary={`Item ID`} secondary={newItem.id} />
            </ListItem>
            <TextField
              sx={{ margin: '15px' }}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              name={'title'}
              value={newItem.title}
              onChange={(e) => handleEdit(e)}
            />
            <TextField
              sx={{ margin: '15px' }}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              name={'vendorId'}
              value={newItem.vendorId}
              onChange={(e) => handleEdit(e)}
            />
          </>
        ) : (
          <List>
            <ListItem button>
              <ListItemText primary={`Item ID`} secondary={newItem.id} />
            </ListItem>
            <Divider />

            <ListItem button>
              <ListItemText primary={`Title`} secondary={newItem.title} />
            </ListItem>
            <Divider />

            <ListItem button>
              <ListItemText
                primary={`Vendor ID`}
                secondary={newItem.vendorId}
              />
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
