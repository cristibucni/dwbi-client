import React, { useEffect, useState } from 'react';
import { SERVICE_MAPPING } from '../../service';
import { LoadingIndicator } from '../../components/loading-indicator';
import Table from './table';
import CustomerModal from './modal';
import { Button, Paper } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { CreateCustomer } from './create';

const Customer = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [doubleClickedCustomer, setDoubleClickedCustomer] = useState(null);
  const flag = window.location.href.split('/')[3];

  useEffect(() => {
    setLoading(true);
    setCustomers([]);
    getCustomers();
  }, [flag]);

  const getCustomers = async () => {
    try {
      const { data } = await SERVICE_MAPPING[flag].getCustomers();

      setCustomers(data);
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

  const onCreateCustomer = async (payload) => {
    try {
      setLoading(true);
      await SERVICE_MAPPING[flag].createCustomer(payload);
      await getCustomers();
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
          <CustomerModal
            customer={doubleClickedCustomer}
            setDoubleClickedCustomer={setDoubleClickedCustomer}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            editCustomer={editCustomer}
          />
          <div style={{ display: 'flex', width: '100%', gap: '30px' }}>
            <div style={{ width: '65%' }}>
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
            </div>
            <div style={{ width: '30%', minHeight: '500px' }}>
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
                <CreateCustomer onSubmit={onCreateCustomer} />
              </Paper>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Customer;
