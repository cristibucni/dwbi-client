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

export default function VendorModal({
  vendor,
  setDoubleClickedVendor,
  setSelectedStatus,
  selectedStatus,
  editVendor,
  flag,
}) {
  const [edit, setEdit] = useState(false);
  const [newVendor, setNewVendor] = useState({ ...vendor });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(vendor)) {
      setOpen(true);
      setNewVendor(vendor);
    }
  }, [vendor]);

  const onEditClick = () => {
    setEdit(!edit);
  };

  const handleEdit = (e) => {
    setNewVendor({ ...newVendor, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setDoubleClickedVendor(null);
  };

  const handleSave = () => {
    editVendor(newVendor);
    handleClose();
  };

  if (_.isEmpty(vendor)) return <div></div>;

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
              Vendor {newVendor.id}
            </Typography>
          </Toolbar>
        </AppBar>
        {edit ? (
          <>
            <ListItem button>
              <ListItemText primary={`Vendor ID`} secondary={newVendor.id} />
            </ListItem>
            {(flag === 'firstdb' || flag === 'globaldb') && (
              <TextField
                sx={{ margin: '15px' }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name={'name'}
                value={newVendor.name}
                onChange={(e) => handleEdit(e)}
              />
            )}
            {(flag === 'seconddb' || flag === 'globaldb') && (
              <>
                <TextField
                  sx={{ margin: '15px' }}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name={'email'}
                  value={newVendor.email}
                  onChange={(e) => handleEdit(e)}
                />

                <TextField
                  sx={{ margin: '15px' }}
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  name={'phone'}
                  value={newVendor.phone}
                  onChange={(e) => handleEdit(e)}
                />
              </>
            )}
          </>
        ) : (
          <List>
            <ListItem button>
              <ListItemText primary={`Vendor ID`} secondary={newVendor.id} />
            </ListItem>
            <Divider />

            <ListItem button>
              <ListItemText primary={`First Name`} secondary={newVendor.name} />
            </ListItem>
            <Divider />

            <ListItem button>
              <ListItemText primary={`Email`} secondary={newVendor.email} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary={`Phone`} secondary={newVendor.phone} />
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
