import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';

export default function DataTable({ data }) {
  const formattedData = [];
  data.forEach((item) => {
    if (!formattedData.find((_item) => _item.billId === item.billId)) {
      formattedData.push({
        ...item,
        items: [],
        id: formattedData.length + 1,
      });
    }
  });
  data.forEach((item) => {
    if (formattedData.findIndex((_item) => _item.billId === item.billId) >= 0) {
      const index = formattedData.findIndex(
        (_item) => _item.billId === item.billId
      );
      formattedData[index].items = [...formattedData[index].items, item.item];
    }
  });
  formattedData.forEach((item) => delete item.item);

  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'billId', headerName: 'Bill ID', width: 200 },
    { field: 'deliveryId', headerName: 'Delivery ID', width: 200 },
    { field: 'product', headerName: 'Product', width: 200 },

    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'address', headerName: 'Addess', width: 200 },
    // { field: 'createdAt', headerName: 'Created at',  width:200},
    // { field: 'items', headerName: 'Items cost',  width:200 },
    // { field: 'shipping', headerName: 'Shipping cost',  width:200 },
    // { field: 'total', headerName: 'Total cost',  width:200 },
    // { field: 'status', headerName: 'Status',  width:200 },
  ];

  const tableRows = data.map((entry, idx) => ({
    id: idx,
    billId: entry.billId,
    deliveryId: entry.deliveryId,
    product: entry.item.title,
    price: entry.item.currentPrice,
    address:
      entry.locationAddress?.address + ', ' + entry.locationAddress?.city,
    // price:
    //   entry.items.reduce((acc, curr) => acc.currentPrice + curr.currentPrice) +
    //   ' RON',
  }));

  const rows = [];
  return (
    <div style={{ height: 800 }}>
      <DataGrid
        rows={tableRows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 15, 30, 100]}
        checkboxSelection={false}
      />
    </div>
  );
}
