import React, { useState } from 'react'
import TransactionPanel from './TransactionPanel';
import moment from 'moment';
import TransactionDetailModal from './TransactionDetailModal';
import currency from 'currency.js';

const CartTransaction = ({ transaction, key }) => {
    const [tranDetail, setTranDetail] = useState({})
    const [transactionOpen, setTransactionOpen] = useState(false);
    const [showMoreModal, setShowMoreModal] = useState(false);

    return (
        <>
            {/* <TransactionPanel transactionPanelOpen={transactionOpen} setTransactionPanelOpen={setTransactionOpen} transactionDetail={tranDetail}/> */}
            <TransactionDetailModal isOpen={showMoreModal} setIsOpen={setShowMoreModal} transaction={transaction} />
            <label className="relative block cursor-pointer text-left w-full bg-white my-2">
                <input type="radio" name="radio-buttons" className="peer sr-only" defaultChecked />
                <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                    <div
                        className="grid grid-cols-12 items-center gap-x-2"
                        onClick={(e) => {
                            e.stopPropagation();
                            setTranDetail(transaction);
                            setTransactionOpen(true);
                            setShowMoreModal(true)
                        }}
                    >
                        {/* Card */}
                        <div className="col-span-6 order-1 sm:order-none sm:col-span-3 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
                            <svg className="shrink-0" width="32" height="24" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient x1="1.829%" y1="100%" x2="100%" y2="2.925%" id="c1-a">
                                        <stop stopColor="#475569" offset="0%" />
                                        <stop stopColor="#1E293B" offset="100%" />
                                        <stop stopColor="#9FA1FF" offset="100%" />
                                    </linearGradient>
                                </defs>
                                <g fill="none" fillRule="evenodd">
                                    <rect fill="url(#c1-a)" width="32" height="24" rx="3" />
                                    <ellipse fill="#E61C24" fillRule="nonzero" cx="12.522" cy="12" rx="5.565" ry="5.647" />
                                    <ellipse fill="#F99F1B" fillRule="nonzero" cx="19.432" cy="12" rx="5.565" ry="5.647" />
                                    <path
                                        d="M15.977 7.578A5.667 5.667 0 0 0 13.867 12c0 1.724.777 3.353 2.11 4.422A5.667 5.667 0 0 0 18.087 12a5.667 5.667 0 0 0-2.11-4.422Z"
                                        fill="#F26622"
                                        fillRule="nonzero"
                                    />
                                </g>
                            </svg>
                            <div>
                                <div className="text-sm font-medium text-slate-800">{transaction?.paymentId ? (<span>Thuê tủ</span>):(<span>Nạp tiền</span>)}</div>
                                <div className="text-xs text-[#A9A9A9]">{transaction?.paymentId ? (<span>DC Pay</span>):(<span>ZaloPay</span>)}</div>
                            </div>
                        </div>
                        {/* Name */}
                        <div className="col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                            <div className="text-sm font-normal text-slate-800 truncate">{moment(transaction?.createTime).format('DD-MM-YYYY H:mm')}</div>
                        </div>
                        {/* Card limits */}
                        <div className="col-span-6 order-1 sm:order-none sm:col-span-4 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-4">
                            <div className="text-sm">{new Intl.NumberFormat("nb-NO").format(transaction?.amount)} / VNĐ</div>
                        </div>
                        {/* Card status */}
                        <div className="col-span-6 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">

                            {transaction?.isSucceed ?
                                (
                                    <div className="text-xs inline-flex font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2.5 py-1">
                                        <span>Thành công</span>
                                    </div>
                                ) : (
                                    <div className="text-xs inline-flex font-medium bg-rose-100 text-red-500 rounded-full text-center px-2.5 py-1">
                                        <span>Thất bại</span>
                                    </div>
                                )}

                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none"
                    aria-hidden="true"
                />
            </label>
        </>
    )
}

export default CartTransaction