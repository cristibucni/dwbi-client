import React, { useEffect, useState } from 'react';
import OLTPService from '../../service/OLTPService';
import jwt_decode from 'jwt-decode';
import SalesTable from './table';
import _ from 'lodash';
import { LoadingIndicator } from '../../components/loading-indicator';

const Sales = () => {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);
  useEffect(async () => {
    const { data } = await OLTPService.getAllSales();

    setSales(data);
    setLoading(false);
  }, []);

  return (
    <div>{loading ? <LoadingIndicator /> : <SalesTable data={sales} />}</div>
  );
};

export default Sales;
