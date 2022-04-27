import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button,
} from '@mui/material';
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
            <Grid item xs={2} sm={4} md={4} key={idx}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {route.name}
                  </Typography>
                  {route.items.map((child, key) => (
                    <React.Fragment key={key}>
                      <Link
                        to={child.href}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          width: '100%',
                        }}
                      >
                        <Button
                          size="small"
                          sx={{ justifyContent: 'flex-start' }}
                        >
                          {child.name}
                        </Button>
                      </Link>
                      <br />
                    </React.Fragment>
                  ))}
                </CardContent>
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
