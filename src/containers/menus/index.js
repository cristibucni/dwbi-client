import React, { useEffect, useState } from 'react';
import FirstDBService from '../../service/FirstDBService';
import OLTPService from '../../service/OLTPService';
import jwt_decode from 'jwt-decode';
import {
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  ButtonGroup,
} from '@mui/material';
import DashboardTable from './table';
import _ from 'lodash';
import { ORDER_STATUSES } from '../../utils/constants';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import HashLoader from 'react-spinners/HashLoader';
import { css } from '@emotion/react';
import { LoadingIndicator } from '../../components/loading-indicator';
import { useSelector } from 'react-redux';
const override = css`
  display: block;
  margin: auto;
  border-color: red;
`;

const Menus = () => {
  const [loading, setLoading] = useState(true);
  const [isDelivery, setIsDelivery] = useState(false);
  const [menus, setMenus] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);

  const flag = window.location.href.split('/')[3];

  useEffect(() => {
    getMenus();
  }, [flag]);

  const getMenus = async () => {
    try {
      setLoading(true);
      const { data } = await FirstDBService.getMenus();

      setMenus(data);
      setLoading(false);
    } catch (err) {
      setMenus([]);
      setLoading(false);
    }
  };

  const handleAddItem = (item) => {
    if (selectedItems.find((_item) => _item.id === item.id)) {
      setSelectedItems([
        ...selectedItems.filter((_item) => _item.id !== item.id),
      ]);
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleModifyQuantity = (item, newQuantity) => {
    if (newQuantity === 0) {
      return;
    }
    let items = [...selectedItems];
    const indexToUpdate = items.findIndex((_item) => _item.id === item.id);
    items[indexToUpdate].quantity = newQuantity;
    setSelectedItems(items);
  };

  const getItemTotal = () => {
    let sum = 0;
    selectedItems.forEach((item) => (sum += item.quantity * item.price));

    return sum;
  };

  const createNewOrder = async () => {
    const payload = {
      customerId: 0,
      isDelivery,
      items: selectedItems.map((_item) => ({
        id: _item.id,
        quantity: _item.quantity,
      })),
    };

    try {
      setOrderLoading(true);
      await OLTPService.createOrder(payload);
      setSelectedItems([]);
      setOrderLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div style={{ display: 'flex', width: '100%', gap: '30px' }}>
          <div style={{ width: '65%' }}>
            {menus.map((menu) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{menu.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{menu.summary}</Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Nume</TableCell>
                          <TableCell>Descriere</TableCell>
                          <TableCell>SKU</TableCell>
                          <TableCell>Gatire</TableCell>
                          <TableCell>Pret</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {menu.items.map((item) => (
                          <TableRow
                            key={item.title}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Checkbox
                                checked={
                                  !!selectedItems.find(
                                    (_item) => item.id === _item.id
                                  )
                                }
                                onChange={() => handleAddItem(item)}
                                inputProps={{
                                  'aria-label': 'controlled',
                                }}
                              />
                            </TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.summary}</TableCell>
                            <TableCell>{item.sku}</TableCell>
                            <TableCell>{item.cooking ? 'Da' : 'Nu'}</TableCell>
                            <TableCell>{item.price} RON</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* {menu.items.map(item => (
                        <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <div>{item.name}</div>
                            <div>{item.summary}</div>
                            <div>{item.sku}</div>
                            <div>{item.price} RON</div>
                        </div>
                    ))} */}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
          <div style={{ width: '30%', minHeight: '500px' }}>
            <Paper
              elevation={3}
              sx={{
                width: '100%',
                minHeight: '500px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              Order details
              <br />
              {orderLoading ? (
                <LoadingIndicator />
              ) : (
                selectedItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      margin: '10px 0',
                      padding: '10px 0',
                      borderBottom: '1px solid',
                    }}
                  >
                    {' '}
                    <div>{item.title}</div>
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                      sx={{ marginLeft: 'auto', marginRight: '15px' }}
                    >
                      <Button
                        onClick={() =>
                          handleModifyQuantity(item, Number(item.quantity) - 1)
                        }
                      >
                        -
                      </Button>
                      <Button color="secondary">{item.quantity}</Button>
                      <Button
                        onClick={() =>
                          handleModifyQuantity(item, Number(item.quantity) + 1)
                        }
                      >
                        +
                      </Button>
                    </ButtonGroup>
                    <div>{item.quantity * item.price} RON</div>
                  </div>
                ))
              )}
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '10px 0',
                  marginTop: 'auto',
                }}
              >
                <div>Total</div>
                <div> {getItemTotal()} RON</div>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    checked={isDelivery}
                    onChange={(e) => setIsDelivery(e.target.checked)}
                    name="delivery"
                  />
                }
                label={`${isDelivery ? 'With' : 'Without'} delivery`}
              />
              {isDelivery && <TextField label="Address" variant="standard" />}
              <Button onClick={() => createNewOrder()}>Place order</Button>
            </Paper>
          </div>
        </div>
      )}
    </div>
  );
};
export default Menus;
