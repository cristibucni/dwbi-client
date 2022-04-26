import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({ data, onSelectRow, onDoubleClickRow }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'summary', headerName: 'Summary', width: 300 },
    { field: 'price', headerName: 'Price' },
    { field: 'sku', headerName: 'sku' },
    { field: 'vendorId', headerName: 'Vendor ID', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={onSelectRow}
        onRowDoubleClick={onDoubleClickRow}
      />
    </div>
  );
}
