import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable({ data, onSelectRow, onDoubleClickRow }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'lastName', headerName: 'Last name' },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'phone', headerName: 'Phone' },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'dateOfBirth', headerName: 'Date of birth', width: 150 },
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
