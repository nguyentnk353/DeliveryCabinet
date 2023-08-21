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
import checkWarningOverDue from './../../../services/Customer/checkWarningOverDue';
import WarningOverDue from './components/WarningOverDue';

const index = () => {
  const [isOpenOverDue, setIsOpenOverDue] = useState(false);
  const [isOpenWanring, setIsOpenWanring] = useState(false);
  useMount(() => {
    checkOverDue()
      .then((res) => {
        if (res.status == 200) {
          setIsOpenOverDue(true)
        }
      })
      .catch((err) => {
        console.log(err);
      });
    checkWarningOverDue()
      .then((res) => {
        if (res.status == 200) {
          setIsOpenWanring(true)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (<>
    <CustomerHeader02 />
    <div>
      <OverDueModal isOpenOverDue={isOpenOverDue} setIsOpenOverDue={setIsOpenOverDue} />
      <WarningOverDue isOpenWanring={isOpenWanring} setIsOpenWanring={setIsOpenWanring} />
      <Outlet />
    </div>

    <CustomerFooter />
  </>
  );
};

export default index;
