import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CardOrderCustomer from './components/CardOrderCustomer'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import getListOrder from '../../../services/Customer/getListOrder';
import DateSelect from './components/DateSelect';
import { useNavigate } from 'react-router-dom';
import Image from '../../../assets/images/no-order.svg'
const Order = () => {
  const navigate = useNavigate();
  const [dataTabs, setDataTabs] = useState({ c1: '', c2: '', c3: '', c4: '', c5: '' });

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState();
  const [status, setStatus] = useState('');
  const [listOrder, setListOrder] = useState(null);

  // 0: Cancel
  // 1: ongoing
  // 2: Complete
  // 3: Overdue
  const handleChangeTabs = (locationa) => {
    setDataTabs({ [locationa]: 'text-[#1e88e5] whitespace-nowrap border-b-2 border-indigo-500' });
  }

  useEffect(() => {
    // if (search) {
    //   onPageChange(1);
    // }
    const payload = {
      PageIndex: page,
      PageSize: pageSize,
      search: searchText,
      status: status == 4 ? undefined : status,
    };

    getListOrder(payload)
      .then((res) => {
        const newListOrder = res.items.map((e) => e);
        newListOrder.forEach(function (cs, index) {
          switch (cs.status) {
            case 0:
              cs.statusName = 'Đã hủy';
              return;
            case 1:
              cs.statusName = 'Đang thuê';
              return;
            case 2:
              cs.statusName = 'Hoàn thành';
              return;
            case 3:
              cs.statusName = 'Quá hạn';
              return;
          }
        });
        setListOrder(newListOrder);
        setTotal(res.totalRecord);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dataTabs, searchText, page, pageSize, status]);


  return (
    <div className='bg-[#f1f5f9] md:px-[10%] md:py-[3%] max-md:px-3'>
      <div className='hidden'>
        <Paper sx={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', padding: '15px', fontWeight: '600' }}>
          <div className={`cursor-pointer	 ${dataTabs.c1}`} onClick={() => handleChangeTabs('c1')}>All</div>
          <div className={`cursor-pointer	${dataTabs.c2}`} onClick={() => handleChangeTabs('c2')}>Complete</div>
          <div className={`cursor-pointer	${dataTabs.c3}`} onClick={() => handleChangeTabs('c3')}>Onging</div>
          <div className={`cursor-pointer	${dataTabs.c4}`} onClick={() => handleChangeTabs('c4')}>Cancel</div>
          <div className={`cursor-pointer	${dataTabs.c5}`} onClick={() => handleChangeTabs('c5')}>Overdue</div>
        </Paper>
      </div>

      <div className="mb-2 mt-3 hidden">
        <form className="relative">
          <label htmlFor="app-search" className="sr-only">Search</label>
          <input id="app-search" className="form-input w-full pl-9 py-3 focus:border-slate-300 bg-white" type="search" placeholder="Search name store or address" onChange={(e) => setSearchText(e.target.value)} />
          <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
            <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
              <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
            </svg>
          </button>
        </form>
      </div>
      <div className='pt-3'>
        <DateSelect setStatus={setStatus} />
      </div>
      {listOrder ? (
        <div>
          {total != 0 ?
            (listOrder.map((order, index) => {
              return (
                <Paper sx={{ backgroundColor: 'white', padding: '0 20px', marginBottom: '10px' }} key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/customer/order-detail',
                      {
                        state: {
                          orderInfo: order,
                          storeInfo: order?.box?.locker?.store,
                        },
                      }
                    )
                  }}
                >
                  <CardOrderCustomer order={order} />
                </Paper>)
            })
            ) : (
              <div className='flex justify-center'>
                <img src={Image} alt="Your SVG" width='80%' />
              </div>
            )
          }
        </div>
      ) : (
        <div>
          <div
            role="status"
            className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
          >
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
            </div>
            <span className="sr-only">Loading...</span>
          </div>

        </div>
      )}

      <div className="py-6 flex justify-center md:justify-end">
        {pageSize <= total ? (
          <button className="p-3 rounded-lg text-sm font-medium text-white hover:text-indigo-600 bg-indigo-500"
            onClick={(e) => {
              e.stopPropagation();
              setPageSize(pageSize + 5);
            }}
          >
            Load more
          </button>
        ) : (<></>)}
      </div>

    </div>
  )
}

export default Order