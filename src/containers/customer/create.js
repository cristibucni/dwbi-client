import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const CreateCustomer = ({ onSubmit }) => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    gender: 'F',
    addressId: 0,
    userId: 0,
  });

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '15px',
        padding: '10px',
        flexDirection: 'column',
      }}
    >
      Create order
      <br />
      <TextField
        id="outlined-basic"
        label="Last Name"
        variant="outlined"
        name={'lastName'}
        fullWidth
        value={customerData.lastName}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="First Name"
        variant="outlined"
        name={'firstName'}
        fullWidth
        value={customerData.firstName}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        name={'email'}
        fullWidth
        value={customerData.email}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Phone"
        variant="outlined"
        name={'phone'}
        fullWidth
        value={customerData.phone}
        onChange={(e) => handleChange(e)}
      />
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={customerData.gender}
        label="Gender"
        name="gender"
        onChange={(e) => handleChange(e)}
      >
        <MenuItem value={'F'}>F</MenuItem>
        <MenuItem value={'M'}>M</MenuItem>
      </Select>
      <DatePicker
        label="Date of birth"
        value={customerData.dateOfBirth}
        onChange={(newValue) => {
          handleChange({ target: { name: 'dateOfBirth', value: newValue } });
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <TextField
        id="outlined-basic"
        label="Address ID"
        variant="outlined"
        name={'addressId'}
        fullWidth
        value={customerData.addressId}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="User ID"
        variant="outlined"
        name={'userId'}
        fullWidth
        value={customerData.userId}
        onChange={(e) => handleChange(e)}
      />
      <Button
        variant="contained"
        onClick={() =>
          onSubmit({
            ...customerData,
            dateOfBirth: new Date(customerData.dateOfBirth)
              .toISOString()
              .replace('Z', ''),
            addressId: Number(customerData.addressId),
            userId: Number(customerData.userId),
          })
        }
      >
        Create
      </Button>
    </div>
  );
};
