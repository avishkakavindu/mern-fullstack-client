import React from 'react';
import Header from '@components/Header';
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  return (
    <div className="private-layout">
      <Header />
      <div className="content">
        PrivateLayout
        <Outlet />
      </div>
    </div>
  );
};

export default PrivateLayout;
