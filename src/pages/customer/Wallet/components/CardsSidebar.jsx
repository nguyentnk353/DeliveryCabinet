import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BankCard from '../../CustomerLanding/components/BankCard';
import { useMount } from 'ahooks';
import getWallet from '../../../../services/Customer/getWallet';
import TopupZaloModal from './TopupZaloModal';
import currency from 'currency.js';

const CardsSidebar = ({info}) => {
    const navigate = useNavigate();
    const [wallet, setWallet] = useState({})
    
    const [isOpenTopup, setIsOpenTopup] = useState(false);
    useMount(() => {
        getWallet()
          .then((res) => {
            const newWallet = res.items[0];
            setWallet(newWallet);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    return (
        <>
            <TopupZaloModal isOpen={isOpenTopup} setIsOpen={setIsOpenTopup} />
            <div>
                <div className="lg:sticky lg:top-16 bg-white lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-[390px] lg:h-[calc(100vh-64px)]">
                    <div className="py-8 px-4 lg:px-8">
                        <div className="max-w-sm mx-auto lg:max-w-none">

                            <div className="text-slate-800 font-semibold text-center mb-6">Thông tin ví Delivery cabinet</div>

                            {/* Credit Card */}
                            
                            <BankCard />

                            {/* Details */}
                            <div className="mt-6">
                                <div className="text-sm font-semibold text-slate-800 mb-1">Thông tin chi tiết</div>
                                <ul>
                                    <li className="flex items-center justify-between py-3 border-b border-slate-200">
                                        <div className="text-sm">Tên Khách Hàng</div>
                                        <div className="text-sm font-medium text-slate-800 ml-2">{info?.fullName}</div>
                                    </li>
                                    <li className="flex items-center justify-between py-3 border-b border-slate-200">
                                        <div className="text-sm">Số dư: </div>
                                        <div className="flex items-center whitespace-nowrap">
                                            {/* <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" /> */}    
                                            <div className="text-sm font-medium text-slate-800">{new Intl.NumberFormat("nb-NO").format(wallet?.balance)} VNĐ</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Payment Limits */}
                            {/* <div className="mt-6">
                                <div className="text-sm font-semibold text-slate-800 mb-4">Payment Limits</div>
                                <div className="pb-4 border-b border-slate-200">
                                    <div className="flex justify-between text-sm mb-2">
                                        <div>Spent This Month</div>
                                        <div className="italic">
                                            $750,00 <span className="text-slate-400">/</span> $1,500.00
                                        </div>
                                    </div>
                                    <div className="relative w-full h-2 bg-slate-300">
                                        <div className="absolute inset-0 bg-emerald-500" aria-hidden="true" style={{ width: '50%' }} />
                                    </div>
                                </div>
                            </div> */}

                            {/* Withdrawal Limits */}
                            {/* <div className="mt-6">
                                <div className="text-sm font-semibold text-slate-800 mb-4">Withdrawal Limits</div>
                                <div className="pb-4 border-b border-slate-200">
                                    <div className="flex justify-between text-sm mb-2">
                                        <div>Withdrawn This Month</div>
                                        <div className="italic">
                                            $100,00 <span className="text-slate-400">/</span> $1,500.00
                                        </div>
                                    </div>
                                    <div className="relative w-full h-2 bg-slate-300">
                                        <div className="absolute inset-0 bg-emerald-500" aria-hidden="true" style={{ width: '7.5%' }} />
                                    </div>
                                </div>
                            </div> */}

                            {/* Button */}
                            <div className="flex items-center space-x-3 mt-6">
                                <div className="w-1/2">
                                    <button className="btn w-full border-[#3c50e0] hover:bg-[#3c50e0] hover:text-white text-[#3c50e0]"
                                            onClick={(e)=>{
                                                e.stopPropagation();
                                                setIsOpenTopup(true);
                                                }
                                            }      
                                    >
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            height="1em"
                                            width="1em"
                                        >
                                            <path d="M5 3 H19 A2 2 0 0 1 21 5 V19 A2 2 0 0 1 19 21 H5 A2 2 0 0 1 3 19 V5 A2 2 0 0 1 5 3 z" />
                                            <path d="M12 8v8M8 12h8" />
                                        </svg>
                                        <span className="ml-2">Nạp tiền</span>
                                    </button>
                                </div>
                                <div className="w-1/2">
                                    <button className="btn w-full border-[#3c50e0] hover:bg-[#3c50e0] hover:text-white text-[#3c50e0]"
                                            onClick={() => {
                                                navigate('/customer/search-store') 
                                            }}
                                    >
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            height="1em"
                                            width="1em"

                                        >
                                            <path d="M4 2 H20 A2 2 0 0 1 22 4 V8 A2 2 0 0 1 20 10 H4 A2 2 0 0 1 2 8 V4 A2 2 0 0 1 4 2 z" />
                                            <path d="M4 14 H20 A2 2 0 0 1 22 16 V20 A2 2 0 0 1 20 22 H4 A2 2 0 0 1 2 20 V16 A2 2 0 0 1 4 14 z" />
                                            <path d="M6 6h.01M6 18h.01" />
                                        </svg>
                                        <span className="ml-2">Thuê tủ</span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsSidebar