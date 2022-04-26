import React, { useEffect, useState } from 'react';
import { SERVICE_MAPPING } from '../../service';
import _ from 'lodash';
import { LoadingIndicator } from '../../components/loading-indicator';
import Table from './table';
import LocationModal from './modal';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const Location = () => {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [doubleClickedLocation, setDoubleClickedLocation] = useState(null);
  const flag = window.location.href.split('/')[3];

  useEffect(() => {
    getLocations();
  }, [flag]);

  const getLocations = async () => {
    const { data } = await SERVICE_MAPPING[flag].getLocations();

    setLocations(data);
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
    setDoubleClickedLocation(
      locations.find((_location) => _location.id === id)
    );
  };

  const editLocation = async (location) => {
    setLoading(true);
    const payload = {
      id: location.id,
      address: location.address,
      cityId: Number(location.cityId),
    };
    await SERVICE_MAPPING[flag].editLocation(payload);
    await getLocations();
  };

  const handleDelete = async (id) => {
    console.log(id);
    setLoading(true);
    const payload = {
      id,
    };
    await SERVICE_MAPPING[flag].deleteLocation(payload);
    await getLocations();
  };

  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <LocationModal
            location={doubleClickedLocation}
            setDoubleClickedLocation={setDoubleClickedLocation}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            editLocation={editLocation}
          />
          <Table
            data={locations}
            onSelectRow={onSelectRow}
            onDoubleClickRow={onDoubleClickRow}
          />
          <Button
            sx={{ marginTop: '20px' }}
            variant="contained"
            onClick={() => handleDelete(selectedRow)}
          >
            Delete selected location
            <Delete />
          </Button>
        </>
      )}
    </div>
  );
};

export default Location;
