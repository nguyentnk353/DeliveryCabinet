import moment from 'moment/moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CardOrderCustomer({ order }) {
  const navigate = useNavigate();
  return (
    <>
      <ul>
        <div className='pt-2 flex justify-between'>
          {order?.total !== 0 ?
            <div className="inline-flex text-sm font-medium bg-emerald-100 text-emerald-600 rounded-full px-2 pt-1">{order?.total} VNĐ</div> : <div></div>}
          <div className='text-green-500 font-medium'>{order?.statusName}</div> </div>
        {/* Cart item */}
        <li className="sm:flex items-center md:py-6 max-md:py-2 border-b border-slate-200">
          <a className="block mb-4 sm:mb-0 md:mr-5 md:w-32 xl:w-auto shrink-0">
            <img className="rounded-sm w-full" src={order?.box?.locker?.store?.imgUrl} alt="Order" />
          </a>
          <div className="grow">
            {/* <a href="#0"> */}
            <h3 className="text-lg font-semibold text-slate-800 mb-1">{order?.box?.locker?.store?.name}</h3>
            {/* </a> */}
            <div className="text-sm mb-2">{order?.box?.locker?.store?.address}</div>
            <div className='text-sm flex justify-end'>Bắt đầu: {moment(order?.createTime).format('H:mm DD-MM-YYYY')}</div>
            {order?.endTime !== null ? <div className='text-sm flex justify-end'>Kết thúc: {moment(order?.endTime).format('H:mm DD-MM-YYYY')}</div> : <div></div>}
            {/* Product meta */}
            <div className="flex flex-wrap justify-between items-center">
              {/* Rating and price */}
              <div className="flex flex-wrap items-center space-x-2 mr-2">
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  {/* Stars */}
                  {/* <div className="flex space-x-1">
                    <button>
                      <span className="sr-only">1 star</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">2 stars</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">3 stars</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">4 stars</span>
                      <svg className="w-4 h-4 fill-current text-amber-500" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                    <button>
                      <span className="sr-only">5 stars</span>
                      <svg className="w-4 h-4 fill-current text-slate-300" viewBox="0 0 16 16">
                        <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                      </svg>
                    </button>
                  </div> */}
                  {/* Rate */}
                  {/* <div className="inline-flex text-sm font-medium text-amber-600">4.2</div> */}
                </div>
                {/* <div className="text-slate-400">·</div> */}
                {/* Price */}

              </div>
              {/* <button className="text-base mt-1 font-semibold hover:underline">View detail</button> */}
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

export default CardOrderCustomer;