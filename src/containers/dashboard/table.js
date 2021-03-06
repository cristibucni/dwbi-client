import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';

export default function DataTable({ data, onSelectRow }) {
  function calculateItemsTotal(items) {
    let sum = 0;
    items.forEach((item) => (sum += item.price));
    return sum;
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'createdAt', headerName: 'Created at', width: 200 },
    { field: 'items', headerName: 'Items cost', width: 200 },
    { field: 'shipping', headerName: 'Shipping cost', width: 200 },
    { field: 'total', headerName: 'Total cost', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
  ];

  const rows = data.map((order) => ({
    id: order.id,
    createdAt: new Date(order.createdAt).toLocaleString('ro-RO'),
    items: calculateItemsTotal(order.orderItems) + ' RON',
    shipping: order.shippingCost + ' RON',
    total: order.shippingCost + calculateItemsTotal(order.orderItems) + ' RON',
    status: order.status,
  }));
  return (
    <div style={{ height: 800 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 15, 30, 100]}
        checkboxSelection={false}
        onSelectionModelChange={onSelectRow}
      />
    </div>
  );
}
