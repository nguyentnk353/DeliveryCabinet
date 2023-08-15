import React from 'react';
import CustomerHeader from '../components/CustomerHeader/CustomerHeader';
import { Outlet } from 'react-router-dom';
import CustomerFooter from '../components/CustomerFooter/CustomerFooter';
import CustomerHeader02 from '../components/CustomerHeader02/CustomerHeader02';
import CustomerMobileSibar from '../components/CustomerMobileSibar/CustomerMobileSibar';

const index = () => {
  return <>
    <CustomerHeader02 />
    <div>
      <Outlet />
    </div>

    <CustomerFooter />
  </>;
};

export default index;
