import React from 'react';
import BankCard from './components/BankCard';
import OrderHistoryImage from '../../../assets/images/historyOrder.svg';
import Wallet from '../../../assets/images/Wallet.svg';
import Cabinet from '../../../assets/images/Cabinet.svg';
import { useNavigate } from 'react-router-dom';

const CustomerLanding = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex bg-slate-100 overflow-hidden">

                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                    <main>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto md:flex md:justify-center">
                            <div className="md:w-[40%]">
                                <div className='md:bg-white md:px-[18%] md:pb-[25%] md:pt-3'>
                                    <BankCard />
                                    <div className="flex flex-wrap gap-5 justify-between pt-5">

                                        <button className="btn border-slate-200 hover:border-slate-300 text-black w-[45%] max-md:bg-white text-base font-bold"
                                                 onClick={() => navigate('/customer/order')}
                                        >
                                            {/* <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                                                <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
                                            </svg> */}
                                             <img src={OrderHistoryImage} alt="Your SVG" width='40px'/>
                                            <span className="ml-2">Đơn hàng</span>
                                        </button>

                                        <button className="btn border-slate-200 hover:border-slate-300 text-black w-[45%] max-md:bg-white text-base font-bold"
                                                 onClick={() => navigate('/customer/wallet')}
                                        >
                                        <img src={Wallet} alt="Your SVG" width='40px'/>
                                            <span className="ml-2">Ví</span>
                                        </button>

                                        <button className="btn border-slate-200 hover:border-slate-300 text-black w-[100%] max-md:bg-white text-base font-bold"
                                                 onClick={() => navigate('/customer/search-store')}
                                        >
                                        <img src={Cabinet} alt="Your SVG" width='40px'/>
                                            <span className="ml-2">Thuê tủ</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </main>

                </div>

            </div>
        </>
    )
}

export default CustomerLanding