import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export const CreateVendor = ({ onSubmit }) => {
  const [vendorData, setVendorData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setVendorData({ ...vendorData, [e.target.name]: e.target.value });
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
      Create vendor
      <br />
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        name={'name'}
        fullWidth
        value={vendorData.name}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        name={'email'}
        fullWidth
        value={vendorData.email}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Phone"
        variant="outlined"
        name={'phone'}
        fullWidth
        value={vendorData.phone}
        onChange={(e) => handleChange(e)}
      />
      <Button
        variant="contained"
        onClick={() =>
          onSubmit({
            ...vendorData,
          })
        }
      >
        Create
      </Button>
    </div>
  );
};
