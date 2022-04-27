import React, { useEffect, useState } from 'react';
import { SERVICE_MAPPING } from '../../service';
import { LoadingIndicator } from '../../components/loading-indicator';
import Table from './table';
import LocationModal from './modal';
import { Button, Paper } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { CreateLocation } from './create';

const Location = () => {
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [doubleClickedLocation, setDoubleClickedLocation] = useState(null);
  const flag = window.location.href.split('/')[3];

  useEffect(() => {
    setLoading(true);
    getLocations();
  }, [flag]);

  const getLocations = async () => {
    try {
      const { data } = await SERVICE_MAPPING[flag].getLocations();

      setLocations(data);
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
    setLoading(true);
    const payload = {
      id,
    };
    await SERVICE_MAPPING[flag].deleteLocation(payload);
    await getLocations();
  };

  const onCreateLocation = async (payload) => {
    try {
      setLoading(true);
      await SERVICE_MAPPING[flag].createLocation(payload);
      await getLocations();
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
          <LocationModal
            location={doubleClickedLocation}
            setDoubleClickedLocation={setDoubleClickedLocation}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            editLocation={editLocation}
          />
          <div style={{ display: 'flex', width: '100%', gap: '30px' }}>
            <div style={{ width: '65%' }}>
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
                <CreateLocation onSubmit={onCreateLocation} />
              </Paper>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Location;
