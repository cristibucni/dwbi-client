import React, { useEffect, useState } from 'react';
import { SERVICE_MAPPING } from '../../service';
import _ from 'lodash';
import { LoadingIndicator } from '../../components/loading-indicator';
import Table from './table';
import CustomerModal from './modal';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const Customer = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [doubleClickedCustomer, setDoubleClickedCustomer] = useState(null);
  const flag = window.location.href.split('/')[3];

  useEffect(() => {
    getCustomers();
  }, [flag]);

  const getCustomers = async () => {
    const { data } = await SERVICE_MAPPING[flag].getCustomers();

    setCustomers(data);
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
    setDoubleClickedCustomer(
      customers.find((_customer) => _customer.id === id)
    );
  };

  const editCustomer = async (customer) => {
    setLoading(true);
    const payload = {
      customerId: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
    };
    await SERVICE_MAPPING[flag].editCustomer(payload);
    await getCustomers();
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const payload = {
      id,
    };
    await SERVICE_MAPPING[flag].deleteCustomer(payload);
    await getCustomers();
  };

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <CustomerModal
            customer={doubleClickedCustomer}
            setDoubleClickedCustomer={setDoubleClickedCustomer}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            editCustomer={editCustomer}
          />
          <Table
            data={customers}
            onSelectRow={onSelectRow}
            onDoubleClickRow={onDoubleClickRow}
          />
          <Button
            sx={{ marginTop: '20px' }}
            variant="contained"
            onClick={() => handleDelete(selectedRow)}
          >
            Delete selected customer
            <Delete />
          </Button>
        </>
      )}
    </div>
  );
};

export default Customer;
