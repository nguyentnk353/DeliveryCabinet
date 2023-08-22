import React, { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react';
import moment from 'moment';
import Image from '../../../../assets/images/transactions-image-04.svg';
import currency from 'currency.js';


const TransactionDetailModal = ({ isOpen, setIsOpen, transaction }) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={() => { setIsOpen(false) }}
                >
                    <Transition.Child
                        as={Fragment}
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center relative">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-600"
                                enterFrom="opacity-0 -translate-x-full"
                                enterTo="opacity-100 translate-x-0"
                                leave="transition ease-in-out duration-600"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 -translate-x-full"
                            >
                                <Dialog.Panel
                                    className={`fixed top-0 left-0 bottom-0 max-h-full w-full max-w-sm overflow-auto rounded bg-slate-100 shadow-lg`}
                                >
                                    <div className="flex flex-col justify-between w-full">

                                        <div className="w-full border-b border-gray-100 flex justify-between items-center relative ltr:pr-5 rtl:pl-5 ltr:md:pr-7 rtl:md:pl-7 flex-shrink-0 py-0.5">
                                            <button

                                                onClick={() => { setIsOpen(false) }}
                                                className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
                                                aria-label="close"
                                            >
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth={0}
                                                    viewBox="0 0 512 512"
                                                    className="text-black"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={48}
                                                        d="M244 400L100 256l144-144M120 256h292"
                                                    />
                                                </svg>
                                            </button>
                                            <h2 className="font-bold text-xl md:text-2xl m-0 text-heading w-full max-md:pl-14 md:pl-12 ltr:pr-6 rtl:pl-6">
                                                Chi tiết giao dịch
                                            </h2>
                                        </div>


                                        <div className="py-8 px-4 lg:px-8">
                                            <div className="max-w-sm mx-auto lg:max-w-none">
                                                <div className="text-slate-800 font-semibold text-center mb-1">Thông tin giao dịch</div>
                                                <div className="text-sm text-center italic">{moment(transaction?.createTime).format('DD-MM-YYYY H:mm')}</div>
                                                {/* Details */}
                                                <div className="drop-shadow-lg mt-12">
                                                    {/* Top */}
                                                    <div className="bg-white rounded-t-xl px-5 pb-2.5 text-center">
                                                        <div className="mb-3 text-center">
                                                            <img className="inline-flex w-12 h-12 rounded-full -mt-6" src={Image} width="48" height="48" alt="Transaction 04" />
                                                        </div>
                                                        {transaction?.paymentId ?
                                                            (
                                                                <div className="text-2xl font-semibold text-red-500 mb-1">- {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(transaction?.amount)}</div>
                                                            ) : (
                                                                <div className="text-2xl font-semibold text-emerald-500 mb-1">+ {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(transaction?.amount)}</div>
                                                            )
                                                        }
                                                        <div className="text-sm font-medium text-slate-800 mb-3">Giao dịch DC Pay</div>
                                                         {transaction?.isSucceed ? 
                                                         (
                                                            <div className="text-xs inline-flex font-medium bg-emerald-100  text-emerald-500 rounded-full text-center px-2.5 py-1">Thành công</div>
                                                         ) : (
                                                            <div className="text-xs inline-flex font-medium bg-red-100  text-red-500 rounded-full text-center px-2.5 py-1">Thất bại</div>
                                                         )}
                                                        
                                                    </div>
                                                    {/* Divider */}
                                                    <div className="flex justify-between items-center" aria-hidden="true">
                                                        <svg className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                                                        </svg>
                                                        <div className="grow w-full h-5 bg-white flex flex-col justify-center">
                                                            <div className="h-px w-full border-t border-dashed border-slate-200" />
                                                        </div>
                                                        <svg className="w-5 h-5 fill-white rotate-180" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 20c5.523 0 10-4.477 10-10S5.523 0 0 0h20v20H0Z" />
                                                        </svg>
                                                    </div>
                                                    {/* Bottom */}
                                                    <div className="bg-white rounded-b-xl p-5 pt-2.5 text-sm space-y-3">
                                                        <div className="flex justify-between space-x-1">
                                                            <span className="italic">Mã giao dịch:</span>
                                                            <span className="font-medium text-slate-700 text-right">DC11 2207 1010 {transaction?.id}</span>
                                                        </div>
                                                        <div className="flex justify-between space-x-1">
                                                            <span className="italic">Loại giao dịch:</span>
                                                            {transaction?.paymentId ?
                                                            (
                                                                <span className="font-medium text-slate-700 text-right">Thanh toán thuê tủ</span>
                                                            ) : (
                                                                <span className="font-medium text-slate-700 text-right">Nạp tiền</span>
                                                            )
                                                        }
                                                        </div>
                                                        <div className="flex justify-between space-x-1">
                                                            <span className="italic">Số tiền:</span>
                                                            <span className="font-medium text-slate-700 text-right">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(transaction?.amount)}</span>
                                                        </div>
                                                        <div className="flex justify-between space-x-1">
                                                            <span className="italic">Thời gian:</span>
                                                            <span className="font-medium text-slate-700 text-right">{moment(transaction?.createTime).format('DD-MM-YYYY H:mm')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Notes */}
                                                {/* <div className="mt-6">
                                                    <div className="text-sm font-semibold text-slate-800 mb-2">Notes</div>
                                                    <form>
                                                        <label className="sr-only" htmlFor="notes">
                                                            Write a note
                                                        </label>
                                                        <textarea id="notes" className="form-textarea w-full focus:border-slate-300" rows="4" placeholder="Write a note…" defaultValue={''} />
                                                    </form>
                                                </div> */}
                                            </div>
                                        </div>

                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default TransactionDetailModal