import { Button } from '@mui/material';
import { Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const index = () => {
  const loginUser = JSON.parse(localStorage.getItem('loginUser'));
  const navigate = useNavigate();
  function goBack() {
    if (loginUser) {
      switch (loginUser?.Role) {
        case '1':
          localStorage.setItem('selected', 'Dashboard');
          localStorage.setItem('subConfig', false);
          localStorage.setItem('sidebarToggle', 'true');
          return navigate('/admin/dashboard', { replace: true });
        case '2':
          localStorage.setItem('selected', 'Dashboard');
          return navigate('/store-owner/dashboard', {
            replace: true,
          });
        case '3':
          return navigate('/staff/home', { replace: true });
        case '4':
          return navigate('/customer/home', { replace: true });
        default:
          return navigate('/login', { replace: true });
      }
    } else {
      return navigate('/home', { replace: true });
    }
  }
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button variant='contained' onClick={goBack}>
          Back Home
        </Button>
      }
    />
  );
};

export default index;
