import React from 'react';
import CustomerHeader from '../components/CustomerHeader/CustomerHeader';
import { Outlet } from 'react-router-dom';
import CustomerFooter from '../components/CustomerFooter/CustomerFooter';
import CustomerHeader02 from '../components/CustomerHeader02/CustomerHeader02';
import CustomerMobileSibar from '../components/CustomerMobileSibar/CustomerMobileSibar';
import { useMount } from 'ahooks';
import checkOverDue from '../../../services/Customer/checkOverDue';
import { useState } from 'react';
import OverDueModal from './components/OverDueModal';

const index = () => {
  const [isOpenOverDue, setIsOpenOverDue] = useState(false);
  useMount(() => {
    checkOverDue()
        .then((res) => {
          if(res.status == 200){
            setIsOpenOverDue(true)
          }
        })
        .catch((err) => {
            console.log(err);
        });
});
  return( <>
    <CustomerHeader02 />
    <div>
      <OverDueModal isOpenOverDue={isOpenOverDue} setIsOpenOverDue={setIsOpenOverDue} />
      <Outlet />
    </div>

      <CustomerFooter />
    </>
  );
};

export default index;
