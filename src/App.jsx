import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RolesAuthRoute } from './context/RolesAuthRoute';
import AccountManagement from './pages/admin/AccountManagement/AccountManagement';
import ShowAccInfo from './pages/admin/AccountManagement/ShowAccInfo/ShowAccInfo';
import UpdateAccount from './pages/admin/AccountManagement/components/UpdateAccount/UpdateAccount';
import Admin from './pages/admin/Admin';
import AdminHome from './pages/admin/AdminHome';
import AreaManagement from './pages/admin/AreaManagement/AreaManagement';
import BoxSizeManagement from './pages/admin/BoxSizeManagement';
import BoxTypeManagement from './pages/admin/BoxTypeManagement';
import CreateAccount from './pages/admin/CreateAccount/CreateAccount';
import CreateLocker from './pages/admin/CreateLocker';
import CreateStore from './pages/admin/CreateStore';
import LockerManagement from './pages/admin/LockerManagement';
import PriceTableManagement from './pages/admin/PriceTableManagement';
import ServiceTypeManagement from './pages/admin/ServiceTypeManagement';
import StoreManagement from './pages/admin/StoreManagement';
import StoreTypeManagement from './pages/admin/StoreTypeManagement/StoreTypeManagement';
import TestUI from './pages/admin/TestUI/TestUI';
import UpdateStore from './pages/admin/UpdateStore';
import Account from './pages/customer/Account/Account';
import Customer from './pages/customer/Customer';
import CustomerHome from './pages/customer/CustomerHome';
import Order from './pages/customer/Order/Order';
import OrderDetail from './pages/customer/OrderDetail/OrderDetail';
import StoreInformation from './pages/customer/StoreInfomartion/StoreInformation';
import Guest from './pages/guest/Guest';
import LoginCustomer from './pages/guest/Guest/LoginCustomer/LoginCustomer';
import Login from './pages/guest/Login';
import Staff from './pages/staff/Staff';
import StaffHome from './pages/staff/StaffHome';
import StoreOwner from './pages/storeOwner/StoreOwner';
import StoreOwnerHome from './pages/storeOwner/StoreOwnerHome';
import theme from './theme';
import Wallet from './pages/customer/Wallet/Wallet';
import CustomerLanding from './pages/customer/CustomerLanding/CustomerLanding';


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
            <Route path='/home' element={<Guest />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login-admin' element={<Login />} />
            <Route path='/login-customer' element={<LoginCustomer />} />
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
              <Route path='account/account-information' element={<ShowAccInfo />} />
              <Route path='store' element={<StoreManagement />} />
              <Route path='new-store' element={<CreateStore />} />
              <Route path='update-store' element={<UpdateStore />} />
              <Route path='store-type' element={<StoreTypeManagement />} />
              <Route path='area' element={<AreaManagement />} />
              <Route path='box-size' element={<BoxSizeManagement />} />
              <Route path='service-type' element={<ServiceTypeManagement />} />
              <Route path='box-type' element={<BoxTypeManagement />} />
              <Route path='price-table' element={<PriceTableManagement />} />
              <Route path='locker' element={<LockerManagement />} />
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
              <Route path='' element={<CustomerLanding />} />
              <Route path='home' element={<CustomerLanding />} />
              <Route path='search-store' element={<CustomerHome />} />
              <Route path='store-information' element={<StoreInformation />} />
              <Route path='order' element={<Order />} />
              <Route path='order-detail' element={<OrderDetail />} />
              <Route path='profile' element={<Account />} />
              <Route path='wallet' element={<Wallet />} />
             
            </Route>
          </Routes>
        </SnackbarProvider>
      </ThemeProvider>
    </ProSidebarProvider>
  );
}

export default App;
