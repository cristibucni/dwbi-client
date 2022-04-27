import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import DashboardTable from './table';
import _ from 'lodash';
import { ORDER_STATUSES } from '../../utils/constants';
import OrderModal from './modal';
import { LoadingIndicator } from '../../components/loading-indicator';
import { SERVICE_MAPPING } from '../../service';

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [doubleClickedOrder, setDoubleClickedOrder] = useState(null);

  const flag = window.location.href.split('/')[3];

  useEffect(() => {
    setLoading(true);
    setOrders([]);
    getOrders();
  }, [flag]);

  const getOrders = async () => {
    try {
      const { data } = await SERVICE_MAPPING[flag].getOrders();

      setOrders(_.uniqBy(data, 'id'));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSelectRow = (e) => {
    setSelectedRow(e[0]);
    setSelectedStatus(
      ORDER_STATUSES[orders.find((order) => order.id === e[0]).status]
    );
  };

  const onDoubleClickRow = (params, event) => {
    if (!event.ctrlKey) {
      event.defaultMuiPrevented = true;
    }
    const { id } = params;
    setDoubleClickedOrder(orders.find((_order) => _order.id === id));
  };

  const editOrder = async (order) => {
    const payload = {
      billId: order.id,
      statusId: selectedStatus,
    };
    setLoading(true);
    await SERVICE_MAPPING[flag].editOrder(payload);
    await getOrders();
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const payload = {
      id,
    };
    await SERVICE_MAPPING[flag].deleteOrder(payload);
    await getOrders();
  };

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <OrderModal
            order={doubleClickedOrder}
            setDoubleClickedOrder={setDoubleClickedOrder}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            editOrder={editOrder}
          />
          <DashboardTable
            data={orders}
            onSelectRow={onSelectRow}
            onDoubleClickRow={onDoubleClickRow}
          />
          <Button
            sx={{ marginTop: '20px' }}
            variant="contained"
            onClick={() => handleDelete(selectedRow)}
          >
            Delete selected order
            <Delete />
          </Button>
        </>
      )}
    </div>
  );
};

export default Orders;
