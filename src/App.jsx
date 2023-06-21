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
import AccountManagement from './pages/admin/AccountManagement/AccountManagement';
import StoreManagement from './pages/admin/StoreManagement';
import BoxSizeManagement from './pages/admin/BoxSizeManagement';
import ServiceTypeManagement from './pages/admin/ServiceTypeManagement';
import ServiceConfig from './pages/admin/ServiceConfig';
import CreateStore from './pages/admin/CreateStore';
import UpdateStore from './pages/admin/UpdateStore';
import BoxTypeManagement from './pages/admin/BoxTypeManagement';
import PriceTableManagement from './pages/admin/PriceTableManagement';
import PriceTableItemManagement from './pages/admin/PriceTableItemManagement';
import LockerManagement from './pages/admin/LockerManagement';
import CreateLocker from './pages/admin/CreateLocker';
import StoreDetail from './pages/admin/StoreDetail';
import StoreOwner from './pages/storeOwner/StoreOwner';
import StoreOwnerHome from './pages/storeOwner/StoreOwnerHome';
import Staff from './pages/staff/Staff';
import StaffHome from './pages/staff/StaffHome';
import Customer from './pages/customer/Customer';
import CustomerHome from './pages/customer/CustomerHome';
import StoreTypeManagement from './pages/admin/StoreTypeManagement/StoreTypeManagement';
import AreaManagement from './pages/admin/AreaManagement/AreaManagement';
import CreateAccount from './pages/admin/CreateAccount/CreateAccount';
import TestUI from './pages/admin/TestUI/TestUI';
import { SnackbarProvider } from 'notistack';
import UpdateAccount from './pages/admin/AccountManagement/components/UpdateAccount/UpdateAccount';
import ShowAccInfo from './pages/admin/AccountManagement/ShowAccInfo/ShowAccInfo';
import 'antd/dist/reset.css';
import './index.css';

function App() {
  return (
    <ProSidebarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={4}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
        >
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
              <Route path='new-account' element={<CreateAccount />} />
              <Route path='update-account' element={<UpdateAccount />} />
              <Route
                path='account/account-information'
                element={<ShowAccInfo />}
              />
              <Route path='store' element={<StoreManagement />} />
              <Route path='store-detail' element={<StoreDetail />} />
              <Route path='new-store' element={<CreateStore />} />
              <Route path='update-store' element={<UpdateStore />} />
              <Route path='store-type' element={<StoreTypeManagement />} />
              <Route path='area' element={<AreaManagement />} />
              <Route path='box-size' element={<BoxSizeManagement />} />
              <Route path='service-type' element={<ServiceTypeManagement />} />
              <Route path='service-config' element={<ServiceConfig />} />
              <Route path='box-type' element={<BoxTypeManagement />} />
              <Route path='price-table' element={<PriceTableManagement />} />
              <Route
                path='price-table-item'
                element={<PriceTableItemManagement />}
              />
              <Route path='cabinet' element={<LockerManagement />} />
              <Route path='new-locker' element={<CreateLocker />} />
              <Route path='testUI' element={<TestUI />} />
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
        </SnackbarProvider>
      </ThemeProvider>
    </ProSidebarProvider>
  );
}

export default App;
