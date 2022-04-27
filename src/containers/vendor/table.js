import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { tableConfig } from '../../utils/constants';

export default function DataTable({ data, onSelectRow, onDoubleClickRow }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'phone', headerName: 'Phone', width: 300 },
  ];

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        {...tableConfig}
        onRowClick={onSelectRow}
        onRowDoubleClick={onDoubleClickRow}
      />
    </div>
  );
}
