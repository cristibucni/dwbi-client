import React, { useEffect, useState } from 'react';
import OLTPService from '../../service/OLTPService';
import jwt_decode from 'jwt-decode';
import { Select, MenuItem, Button } from '@mui/material';
import DashboardTable from './table';
import _ from 'lodash';
import { ORDER_STATUSES } from '../../utils/constants';
import OrderModal from './modal';
import { LoadingIndicator } from '../../components/loading-indicator';
import { useSelector } from 'react-redux';

import { isManager, isEmployee } from '../../utils/constants';

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [doubleClickedOrder, setDoubleClickedOrder] = useState(null);

  const user = useSelector((state) => state.main.user);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const { data } =
      isManager(user) || isEmployee(user)
        ? await OLTPService.getAllOrders()
        : await OLTPService.getOrders(user.id);

    setOrders(_.uniqBy(data, 'id'));
    setLoading(false);
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
    await OLTPService.editOrder(payload);
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
        </>
      )}
    </div>
  );
};

export default Orders;
