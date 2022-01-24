import React, { useEffect, useState } from 'react';
import OLTPService from '../../service/OLTPService';
import jwt_decode from 'jwt-decode';
import { Select, MenuItem, Button } from '@mui/material';
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

const Menus = () => {
  const [loading, setLoading] = useState(true);
  const [menus, setMenus] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(async () => {
    const { data } = await OLTPService.getMenus();

    setMenus(data);
    setLoading(false);
  }, []);

  const handleAddItem = (item) => {
    if (selectedItems.find((_item) => _item.id === item.id)) {
      setSelectedItems([
        ...selectedItems.filter((_item) => _item.id !== item.id),
      ]);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const getItemTotal = () => {
    let sum = 0;
    selectedItems.forEach((item) => (sum += item.price));

    return sum;
  };

  return (
    <div>
      {loading ? (
        <div>Loading ... </div>
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
              style={{
                width: '100%',
                minHeight: '500px',
                padding: '16px',
              }}
            >
              Comanda
              <br />
              {selectedItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '10px 0',
                  }}
                >
                  <div>{item.title}</div>
                  <div>{item.price} RON</div>
                </div>
              ))}
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
            </Paper>
          </div>
        </div>
      )}
    </div>
  );
};
export default Menus;
