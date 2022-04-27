import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { ButtonGroup, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListLocationText from '@mui/material/ListItemText';
import ListLocation from '@mui/material/ListItem';
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

export default function LocationModal({
  location,
  setDoubleClickedLocation,
  setSelectedStatus,
  selectedStatus,
  editLocation,
}) {
  const [edit, setEdit] = useState(false);
  const [newLocation, setNewLocation] = useState({ ...location });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(location)) {
      setOpen(true);
      setNewLocation(location);
      setEdit(false);
    }
  }, [location]);

  const onEditClick = () => {
    setEdit(!edit);
  };

  const handleEdit = (e) => {
    setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setDoubleClickedLocation(null);
  };

  const handleSave = () => {
    editLocation(newLocation);
    handleClose();
  };

  if (_.isEmpty(location)) return <div></div>;

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
              Location {newLocation.id}
            </Typography>
          </Toolbar>
        </AppBar>
        {edit ? (
          <>
            <ListLocation button>
              <ListLocationText
                primary={`Location ID`}
                secondary={newLocation.id}
              />
            </ListLocation>
            <TextField
              sx={{ margin: '15px' }}
              id="outlined-basic"
              label="Address"
              variant="outlined"
              name={'address'}
              value={newLocation.address}
              onChange={(e) => handleEdit(e)}
            />
            <TextField
              sx={{ margin: '15px' }}
              id="outlined-basic"
              label="City ID"
              variant="outlined"
              name={'cityId'}
              value={newLocation.cityId}
              onChange={(e) => handleEdit(e)}
            />
          </>
        ) : (
          <List>
            <ListLocation button>
              <ListLocationText
                primary={`Location ID`}
                secondary={newLocation.id}
              />
            </ListLocation>
            <Divider />

            <ListLocation button>
              <ListLocationText
                primary={`Address`}
                secondary={newLocation.address}
              />
            </ListLocation>
            <Divider />

            <ListLocation button>
              <ListLocationText
                primary={`City ID`}
                secondary={newLocation.cityId}
              />
            </ListLocation>
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
