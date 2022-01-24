import React from 'react';
import Navigation from '../../containers/navigation';
import Header from './header';

const Container = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <Navigation />
        <div
          style={{
            width: 'calc(100%  - 150px)',
            textAlign: 'left',
            padding: '20px',
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Container;
