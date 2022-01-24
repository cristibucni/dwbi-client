import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({ data }) {
  function calculateItemsTotal(items) {
    let sum = 0;
    items.forEach((item) => (sum += item.price));
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'createdAt', headerName: 'Created at', width: 70 },
  ];

  const rows = [
    { id: 1, createdAt: 'asadwa' },
    { id: 2, createdAt: 'adwagfaw' },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
