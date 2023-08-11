import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RolesAuthRoute } from './context/RolesAuthRoute';
import AccountManagement from './pages/admin/AccountManagement/AccountManagement';
import Admin from './pages/admin/Admin';
import AdminHome from './pages/admin/AdminHome';
import AreaManagement from './pages/admin/AreaManagement/AreaManagement';
import DashboardPage from './pages/admin/DashboardPage';
import CustomerManagement from './pages/admin/CustomerManagement/CustomerManagement';
import StoreManagement from './pages/admin/StoreManagement';
import BoxSizeManagement from './pages/admin/BoxSizeManagement';
import ServiceTypeManagement from './pages/admin/ServiceTypeManagement';
import ServiceConfig from './pages/admin/ServiceConfig';
import CreateStore from './pages/admin/CreateStore';
import BoxTypeManagement from './pages/admin/BoxTypeManagement';
import PriceTableManagement from './pages/admin/PriceTableManagement';
import PriceTableItemManagement from './pages/admin/PriceTableItemManagement';
import LockerManagement from './pages/admin/LockerManagement';
import CreateLocker from './pages/admin/CreateLocker';
import StoreDetail from './pages/admin/StoreDetail';
import ConfigPage from './pages/admin/ConfigPage';
import StoreConfig from './pages/admin/StoreConfig';
import BoxConfig from './pages/admin/BoxConfig';
import CreatePriceTable from './pages/admin/CreatePriceTable';
import OrderManagement from './pages/admin/OrderManagement';
import OrderDetailAdmin from './pages/admin/OrderDetail';
import StoreOwner from './pages/storeOwner/StoreOwner';
import StoreOwnerHome from './pages/storeOwner/StoreOwnerHome';
import Staff from './pages/staff/Staff';
import StaffHome from './pages/staff/StaffHome';
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
import OpenBox from './pages/guest/OpenBox';
import theme from './theme';
import Wallet from './pages/customer/Wallet/Wallet';
import CustomerLanding from './pages/customer/CustomerLanding/CustomerLanding';

import UpdateAccount from './pages/admin/AccountManagement/components/UpdateAccount/UpdateAccount';
import ShowAccInfo from './pages/admin/AccountManagement/ShowAccInfo/ShowAccInfo';
import UpdateCustomer from './pages/admin/CustomerManagement/components/UpdateAccount/UpdateAccount';
import ShowCustomerInfo from './pages/admin/CustomerManagement/ShowAccInfo/ShowAccInfo';
import AdAnalytics from './pages/admin/Analytics';
import SOAnalytics from './pages/storeOwner/Analytics';
import StaffManagement from './pages/storeOwner/AccountManagement/AccountManagement';
import CreateStaff from './pages/storeOwner/CreateAccount/CreateAccount';
import UpdateStaff from './pages/storeOwner/StoreDetail/components/UpdateAccount/UpdateAccount';
import ShowStaffInfo from './pages/storeOwner/StoreDetail/ShowAccInfo/ShowAccInfo';
import SOStoreManagement from './pages/storeOwner/StoreManagement';
import SOStoreDetail from './pages/storeOwner/StoreDetail';
import CabinetDetail from './pages/storeOwner/CabinetDetail';
import CreateAccount from './pages/admin/CreateAccount/CreateAccount';
import 'antd/dist/reset.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css';
import { CusAuthRoute } from './context/CusAuthRoute';

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
            <Route path='/open-box/39' element={<OpenBox />} />

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
              <Route path='dashboard' element={<AdAnalytics />} />
              <Route path='user' element={<AccountManagement />} />
              <Route path='customer' element={<CustomerManagement />} />
              <Route path='new-user' element={<CreateAccount />} />
              <Route path='update-user' element={<UpdateAccount />} />
              <Route path='user/user-information' element={<ShowAccInfo />} />
              <Route path='update-customer' element={<UpdateCustomer />} />
              <Route
                path='customer/customer-information'
                element={<ShowCustomerInfo />}
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
              <Route path='new-price-table' element={<CreatePriceTable />} />
              <Route
                path='price-table-item'
                element={<PriceTableItemManagement />}
              />
              <Route path='cabinet' element={<LockerManagement />} />
              <Route path='new-cabinet' element={<CreateLocker />} />
              <Route path='config' element={<ConfigPage />} />
              <Route path='store-config' element={<StoreConfig />} />
              <Route path='box-config' element={<BoxConfig />} />
              <Route path='order' element={<OrderManagement />} />
              <Route path='order-detail' element={<OrderDetailAdmin />} />
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
              <Route path='dashboard' element={<SOAnalytics />} />
              <Route path='staff' element={<StaffManagement />} />
              <Route path='new-staff' element={<CreateStaff />} />
              <Route path='update-staff' element={<UpdateStaff />} />
              <Route
                path='staff/staff-information'
                element={<ShowStaffInfo />}
              />
              <Route path='store' element={<SOStoreManagement />} />
              <Route path='store-detail' element={<SOStoreDetail />} />
              <Route path='cabinet-detail' element={<CabinetDetail />} />
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
                  <CusAuthRoute roles={['4']}>
                    <Customer />
                  </CusAuthRoute>
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
