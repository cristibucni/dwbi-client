import React, { useEffect, useState } from 'react';
import OLTPService from '../../service/OLTPService';
import jwt_decode from 'jwt-decode';
import SalesTable from './table';
import _ from 'lodash';

const Sales = () => {
  const [loading, setLoading] = useState(true);
  const [sales, setSales] = useState([]);
  useEffect(async () => {
    const { data } = await OLTPService.getAllSales();

    setSales(data);
    setLoading(false);
  }, []);

  return (
    <div>{loading ? <div>Loading ... </div> : <SalesTable data={sales} />}</div>
  );
};

export default Sales;
