import React, { useEffect, useState } from 'react';
import { SERVICE_MAPPING } from '../../service';
import { LoadingIndicator } from '../../components/loading-indicator';
import Table from './table';
import VendorModal from './modal';
import { Button, Paper } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { CreateVendor } from './create';

const Vendor = () => {
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [doubleClickedVendor, setDoubleClickedVendor] = useState(null);
  const flag = window.location.href.split('/')[3];

  useEffect(() => {
    setLoading(true);
    setVendors([]);
    getVendors();
  }, [flag]);

  const getVendors = async () => {
    try {
      const { data } = await SERVICE_MAPPING[flag].getVendors();

      setVendors(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSelectRow = (e) => {
    setSelectedRow(e.id);
  };

  const onDoubleClickRow = (params, event) => {
    if (!event.ctrlKey) {
      event.defaultMuiPrevented = true;
    }
    const { id } = params;
    setDoubleClickedVendor(vendors.find((_vendor) => _vendor.id === id));
  };

  const editVendor = async (vendor) => {
    setLoading(true);
    const payload = {
      id: vendor.id,
    };

    if (flag === 'firstdb') {
      payload.name = vendor.name;
    }
    if (flag === 'seconddb') {
      payload.email = vendor.email;
      payload.phone = vendor.phone;
    }

    if (flag === 'globaldb') {
      payload.name = vendor.name;
      payload.email = vendor.email;
      payload.phone = vendor.phone;
    }

    await SERVICE_MAPPING[flag].editVendor(payload);
    await getVendors();
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const payload = {
      id,
    };
    await SERVICE_MAPPING[flag].deleteVendor(payload);
    await getVendors();
  };

  const onCreateVendor = async (payload) => {
    try {
      setLoading(true);
      await SERVICE_MAPPING[flag].createVendor(payload);
      await getVendors();
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <VendorModal
            vendor={doubleClickedVendor}
            setDoubleClickedVendor={setDoubleClickedVendor}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            editVendor={editVendor}
            flag={flag}
          />
          <div style={{ display: 'flex', width: '100%', gap: '30px' }}>
            <div style={{ width: '65%' }}>
              <Table
                data={vendors}
                onSelectRow={onSelectRow}
                onDoubleClickRow={onDoubleClickRow}
              />
              <Button
                sx={{ marginTop: '20px' }}
                variant="contained"
                onClick={() => handleDelete(selectedRow)}
              >
                Delete selected vendor
                <Delete />
              </Button>
            </div>
            <div style={{ width: '30%', minHeight: '500px' }}>
              {' '}
              <Paper
                elevation={3}
                sx={{
                  width: '100%',
                  minHeight: '500px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CreateVendor onSubmit={onCreateVendor} />
              </Paper>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Vendor;
