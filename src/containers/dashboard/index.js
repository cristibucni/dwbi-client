import React, { useEffect, useState } from 'react';
import OLTPService from '../../service/OLTPService';
import jwt_decode from 'jwt-decode';
import { Select, MenuItem, Button } from '@mui/material';
import DashboardTable from './table';
import _ from 'lodash';
import { ORDER_STATUSES } from '../../utils/constants';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(0);
  useEffect(async () => {
    const { data } = await OLTPService.getOrders(199);

    setOrders(data);
    setLoading(false);
  }, []);

  const getOrders = async () => {
    const { data } = await OLTPService.getOrders(199);

    setOrders(data);
    setLoading(false);
  };

  const onSelectRow = (e) => {
    setSelectedRow(e[0]);
    setSelectedStatus(
      ORDER_STATUSES[orders.find((order) => order.id === e[0]).status]
    );
  };

  const editOrder = async () => {
    const payload = {
      billId: orders.find((order) => order.id === selectedRow).id,
      statusId: selectedStatus,
    };
    setLoading(true);
    await OLTPService.editOrder(payload);
    await getOrders();
  };

  return (
    <div>
      {loading ? (
        <div>Loading ... </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              width: '50%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <div>Selected row {selectedRow}</div>
            <div>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {Object.keys(ORDER_STATUSES).map((status) => (
                  <MenuItem value={ORDER_STATUSES[status]}>{status}</MenuItem>
                ))}
              </Select>
            </div>

            <div>
              {' '}
              <Button variant="contained" onClick={() => editOrder()}>
                Edit
              </Button>
            </div>
          </div>
          <DashboardTable data={orders} onSelectRow={onSelectRow} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
