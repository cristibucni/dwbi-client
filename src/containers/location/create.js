import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export const CreateLocation = ({ onSubmit }) => {
  const [locationData, setLocationData] = useState({
    address: '',
    cityId: 1,
  });

  const handleChange = (e) => {
    setLocationData({ ...locationData, [e.target.name]: e.target.value });
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
      Create location
      <br />
      <TextField
        id="outlined-basic"
        label="Address"
        variant="outlined"
        name={'address'}
        fullWidth
        value={locationData.address}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="City ID"
        variant="outlined"
        name={'cityId'}
        fullWidth
        value={locationData.cityId}
        onChange={(e) => handleChange(e)}
      />
      <Button
        variant="contained"
        onClick={() =>
          onSubmit({
            ...locationData,
            cityId: Number(locationData.cityId),
          })
        }
      >
        Create
      </Button>
    </div>
  );
};
