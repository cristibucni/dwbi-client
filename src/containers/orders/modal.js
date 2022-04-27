import React, { useEffect } from 'react';
import _ from 'lodash';
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
import { Select, MenuItem } from '@mui/material';
import { ORDER_STATUSES } from '../../utils/constants';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderModal({
  order,
  setDoubleClickedOrder,
  setSelectedStatus,
  selectedStatus,
  editOrder,
}) {
  useEffect(() => {
    if (!_.isEmpty(order)) {
      setOpen(true);
    }
  }, [order]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    editOrder(order);
    setOpen(false);
    setDoubleClickedOrder(null);
  };

  if (_.isEmpty(order)) return <div></div>;

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
              Order {order.id}
            </Typography>

            <>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value)}
                sx={{
                  marginRight: '30px',
                  color: 'white',
                }}
              >
                {Object.keys(ORDER_STATUSES).map((status) => (
                  <MenuItem value={ORDER_STATUSES[status]}>{status}</MenuItem>
                ))}
              </Select>
              <Button variant="standard" onClick={() => handleClose()}>
                Save
              </Button>
            </>
          </Toolbar>
        </AppBar>
        <List>
          {order.orderItems.map((_item) => (
            <>
              <ListItem key={_item.id} button>
                <ListItemText
                  primary={`${_item.quantity} x ${_item.item.title} - ${_item.price} RON`}
                  secondary={`${_item.item.summary} `}
                />
              </ListItem>
              <Divider />
            </>
          ))}

          <ListItem button>
            <ListItemText
              primary={`1 x Taxa ${order.shippingCost} RON`}
              secondary={`Taxa de livrare`}
            />
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    </div>
  );
}
