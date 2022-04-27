import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

export const CreateItem = ({ onSubmit }) => {
  const [itemData, setItemData] = useState({
    title: '',
    summary: '',
    sku: '',
    price: 0,
    cooking: 0,
    vendorId: 1,
  });

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
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
      Create item
      <br />
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        name={'title'}
        fullWidth
        value={itemData.title}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="Summary"
        variant="outlined"
        name={'summary'}
        fullWidth
        value={itemData.summary}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        id="outlined-basic"
        label="SKU"
        variant="outlined"
        name={'sku'}
        fullWidth
        value={itemData.sku}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        type="number"
        id="outlined-basic"
        label="SKU"
        variant="outlined"
        name={'price'}
        fullWidth
        value={itemData.price}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        type="number"
        id="outlined-basic"
        label="Vendor ID"
        variant="outlined"
        name={'vendorId'}
        fullWidth
        value={itemData.vendorId}
        onChange={(e) => handleChange(e)}
      />
      <Button
        variant="contained"
        onClick={() =>
          onSubmit({
            ...itemData,
            vendorId: Number(itemData.vendorId),
          })
        }
      >
        Create
      </Button>
    </div>
  );
};
