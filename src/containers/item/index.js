import React, { useEffect, useState } from 'react';
import { SERVICE_MAPPING } from '../../service';
import { LoadingIndicator } from '../../components/loading-indicator';
import Table from './table';
import ItemModal from './modal';
import { Button, Paper } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { CreateItem } from './create';

const Item = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [doubleClickedItem, setDoubleClickedItem] = useState(null);
  const flag = window.location.href.split('/')[3];

  useEffect(() => {
    setLoading(true);
    setItems([]);
    getItems();
  }, [flag]);

  const getItems = async () => {
    try {
      const { data } = await SERVICE_MAPPING[flag].getItems();

      setItems(data);
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
    setDoubleClickedItem(items.find((_item) => _item.id === id));
  };

  const editItem = async (item) => {
    setLoading(true);
    const payload = {
      id: item.id,
      title: item.title,
      vendorId: item.vendorId,
    };
    await SERVICE_MAPPING[flag].editItem(payload);
    await getItems();
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const payload = {
      id,
    };
    await SERVICE_MAPPING[flag].deleteItem(payload);
    await getItems();
  };

  const onCreateItem = async (payload) => {
    try {
      setLoading(true);
      await SERVICE_MAPPING[flag].createItem(payload);
      await getItems();
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
          <ItemModal
            item={doubleClickedItem}
            setDoubleClickedItem={setDoubleClickedItem}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            editItem={editItem}
          />
          <div style={{ display: 'flex', width: '100%', gap: '30px' }}>
            <div style={{ width: '65%' }}>
              <Table
                data={items}
                onSelectRow={onSelectRow}
                onDoubleClickRow={onDoubleClickRow}
              />
              <Button
                sx={{ marginTop: '20px' }}
                variant="contained"
                onClick={() => handleDelete(selectedRow)}
              >
                Delete selected item
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
                <CreateItem onSubmit={onCreateItem} />
              </Paper>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
