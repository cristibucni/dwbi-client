import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import OLTPService from '../../service/OLTPService';
import jwt_decode from 'jwt-decode';
import { Select, MenuItem, Button } from '@mui/material';
import DashboardTable from './table';
import _ from 'lodash';
import { ORDER_STATUSES } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { routes } from '../../routes/config';
import { connect } from 'react-redux';
const Dashboard = (props) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {routes
          .filter((route) => route.name !== 'Home')
          .map((route, idx) => (
            <Grid item xs={2} sm={4} md={3} key={idx}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Navigate
                  </Typography>
                  <Typography variant="h5" component="div">
                    {route.name}
                  </Typography>
                  <Typography variant="body2">{route.description}</Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to={route.href}
                    style={{
                      textDecoration: 'none',
                      alignItems: 'center',
                      color: 'inherit',
                      width: '100%',
                    }}
                  >
                    <Button size="small">Access</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.main,
});

export default connect(mapStateToProps)(Dashboard);
