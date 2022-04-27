import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { tableConfig } from '../../utils/constants';

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
