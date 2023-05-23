import { useState, Suspense } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Login from './pages/guest/Login';
import { RolesAuthRoute } from './context/RolesAuthRoute';
import theme from './theme';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Guest from './pages/guest/Guest';
import GuestHome from './pages/guest/GuestHome';
import Admin from './pages/admin/Admin';
import AdminHome from './pages/admin/AdminHome';
import AccountManagement from './pages/admin/AccountManagement';
import StoreManagement from './pages/admin/StoreManagement';
import CreateStore from './pages/admin/CreateStore';
import StoreOwner from './pages/storeOwner/StoreOwner';
import StoreOwnerHome from './pages/storeOwner/StoreOwnerHome';
import Staff from './pages/staff/Staff';
import StaffHome from './pages/staff/StaffHome';
import Customer from './pages/customer/Customer';
import CustomerHome from './pages/customer/CustomerHome';

function App() {
  return (
    <ProSidebarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Admin /> */}
        <Routes>
          {/* public routes */}
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/' element={<Guest />}>
            <Route path='home' element={<GuestHome />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/login-admin' element={<Login />} />
          {/* <Route path='*' element={<MissingPage />} /> */}
          {/* protected routes */}
          <Route
            path='/admin'
            element={
              <Suspense fallback={<></>}>
                <RolesAuthRoute roles={['1']}>
                  <Admin />
                </RolesAuthRoute>
              </Suspense>
            }
          >
            <Route path='home' element={<AdminHome />} />
            <Route path='account' element={<AccountManagement />} />
            <Route path='store' element={<StoreManagement />} />
            <Route path='new-store' element={<CreateStore />} />
          </Route>
          <Route
            path='/store-owner'
            element={
              <Suspense fallback={<></>}>
                <RolesAuthRoute roles={['2']}>
                  <StoreOwner />
                </RolesAuthRoute>
              </Suspense>
            }
          >
            <Route path='home' element={<StoreOwnerHome />} />
          </Route>
          <Route
            path='/staff'
            element={
              <Suspense fallback={<></>}>
                <RolesAuthRoute roles={['3']}>
                  <Staff />
                </RolesAuthRoute>
              </Suspense>
            }
          >
            <Route path='home' element={<StaffHome />} />
          </Route>
          <Route
            path='/customer'
            element={
              <Suspense fallback={<></>}>
                <RolesAuthRoute roles={['4']}>
                  <Customer />
                </RolesAuthRoute>
              </Suspense>
            }
          >
            <Route path='home' element={<CustomerHome />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ProSidebarProvider>
  );
}

export default App;
