import React, { useEffect, useState } from 'react';
import { SERVICE_MAPPING } from '../../service';
import _ from 'lodash';
import { LoadingIndicator } from '../../components/loading-indicator';
import Table from './table';
import VendorModal from './modal';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const Vendor = () => {
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [doubleClickedVendor, setDoubleClickedVendor] = useState(null);
  const flag = window.location.href.split('/')[3];

  useEffect(() => {
    getVendors();
  }, [flag]);

  const getVendors = async () => {
    const { data } = await SERVICE_MAPPING[flag].getVendors();

    setVendors(data);
    setLoading(false);
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
      name: vendor.name,
      email: vendor.email,
      phone: vendor.phone,
    };
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
          />
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
        </>
      )}
    </div>
  );
};

export default Vendor;
