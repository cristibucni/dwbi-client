import React, { useEffect, useState } from 'react';
import { SERVICE_MAPPING } from '../../service';
import _ from 'lodash';
import { LoadingIndicator } from '../../components/loading-indicator';
import Table from './table';
import ItemModal from './modal';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const Item = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [doubleClickedItem, setDoubleClickedItem] = useState(null);
  const flag = window.location.href.split('/')[3];

  useEffect(() => {
    getItems();
  }, [flag]);

  const getItems = async () => {
    const { data } = await SERVICE_MAPPING[flag].getItems();

    setItems(data);
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
        </>
      )}
    </div>
  );
};

export default Item;
