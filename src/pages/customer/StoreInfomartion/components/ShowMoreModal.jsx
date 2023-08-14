import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import storeDefault from '../../../../assets/images/storeDefault.jpg';
import { useMount } from 'ahooks';
import getStoreById from '../../../../services/Customer/getStoreById';
import { useNavigate } from 'react-router-dom';


const ShowMoreModal = ({ isOpen, setIsOpen, storeId }) => {
  const navigate = useNavigate();

  const [storeInfo, setStoreInfo] = useState();
  const [imgSrc, setImgSrc] = useState(storeDefault);

  useMount(() => {
    getStoreById(storeId)
      .then((res) => {
        setStoreInfo(res.items[0]);
        if(res.items[0]?.imgUrl)
        setImgSrc(res.items[0]?.imgUrl)
      })
      .catch((err) => {
        console.log(err);
      });
  })
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => { setIsOpen(false) }}
      >
        <Transition.Child
          as={Fragment}
        // enter="ease-out duration-300"
        // enterFrom="opacity-0"
        // enterTo="opacity-100"
        // leave="ease-in duration-200"
        // leaveFrom="opacity-100"
        // leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center relative">
            <Transition.Child
              as={Fragment}
              // enter="ease-out duration-300"
              // enterFrom="opacity-0 scale-95"
              // enterTo="opacity-100 scale-100"
              // leave="ease-in duration-200"
              // leaveFrom="opacity-100 scale-100"
              // leaveTo="opacity-0 scale-95"

              enter="transition ease-in-out duration-600"
              enterFrom="opacity-0 -translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-in-out duration-600"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-x-full"
            >
              <Dialog.Panel
                className={`fixed top-0 left-0 bottom-0 max-h-full w-full max-w-sm overflow-auto rounded bg-white shadow-lg`}
              >
                <div className="flex flex-col justify-between w-full h-full">

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
                    <h2 className="font-bold text-xl md:text-2xl m-0 text-heading w-full pl-12 ltr:pr-6 rtl:pl-6">
                      Thông tin cửa hàng
                    </h2>
                  </div>


                  <div className="flex flex-col px-6 pt-10 lg:pt-14">
                    <div className="w-full pb-8 text-center border-b border-gray-300">
                      <div className="w-32 h-32 mx-auto lg:w-auto lg:h-auto">
                        <span
                          style={{
                            boxSizing: "border-box",
                            display: "inline-block",
                            overflow: "hidden",
                            width: "initial",
                            height: "initial",
                            background: "none",
                            opacity: 1,
                            border: 0,
                            margin: 0,
                            padding: 0,
                            position: "relative",
                            maxWidth: "100%"
                          }}
                        >
                          <span
                            style={{
                              boxSizing: "border-box",
                              display: "block",
                              width: "initial",
                              height: "initial",
                              background: "none",
                              opacity: 1,
                              border: 0,
                              margin: 0,
                              padding: 0,
                              maxWidth: "100%"
                            }}
                          >
                            <img
                              alt=""
                              aria-hidden="true"
                              src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27180%27%20height=%27180%27/%3e"
                              style={{
                                display: "block",
                                maxWidth: "100%",
                                width: "initial",
                                height: "initial",
                                background: "none",
                                opacity: 1,
                                border: 0,
                                margin: 0,
                                padding: 0
                              }}
                            />
                          </span>
                          <img
                            alt="Store Image"
                            // srcSet="/_next/image?url=%2Fassets%2Fimages%2Fshop%2Fshop-logo-1.jpg&w=256&q=75 1x, /_next/image?url=%2Fassets%2Fimages%2Fshop%2Fshop-logo-1.jpg&w=384&q=75 2x"
                            // src="/_next/image?url=%2Fassets%2Fimages%2Fshop%2Fshop-logo-1.jpg&w=384&q=75"
                            src={imgSrc}
                            onError={() => setImgSrc(storeDefault)}
                            layout="fill"
                            objectfit="cover"
                            decoding="async"
                            data-nimg="intrinsic"
                            className="rounded-xl"
                            style={{
                              position: "absolute",
                              inset: 0,
                              boxSizing: "border-box",
                              padding: 0,
                              border: "none",
                              margin: "auto",
                              display: "block",
                              width: 0,
                              height: 0,
                              minWidth: "100%",
                              maxWidth: "100%",
                              minHeight: "100%",
                              maxHeight: "100%"
                            }}
                          />
                        </span>
                      </div>
                      <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold mt-6 mb-1.5">
                        {storeInfo?.name}
                      </h4>
                      <p className="text-sm sm:leading-6 leading-7 text-body">
                        Thông tin chi tiết cửa hàng
                      </p>
                      {/* <div className="flex items-center flex-wrap justify-center gap-x-2 pt-4 mt-0.5">
                        <button
                          aria-label="facebook"
                          className="react-share__ShareButton"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            padding: 0,
                            font: "inherit",
                            color: "inherit",
                            cursor: "pointer"
                          }}
                        >
                          <svg
                            viewBox="0 0 64 64"
                            width={25}
                            height={25}
                            className="transition-all hover:opacity-90"
                          >
                            <circle cx={32} cy={32} r={31} fill="#3b5998" />
                            <path
                              d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"
                              fill="white"
                            />
                          </svg>
                        </button>
                        <button
                          aria-label="twitter"
                          className="react-share__ShareButton"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            padding: 0,
                            font: "inherit",
                            color: "inherit",
                            cursor: "pointer"
                          }}
                        >
                          <svg
                            viewBox="0 0 64 64"
                            width={25}
                            height={25}
                            className="transition-all hover:opacity-90"
                          >
                            <circle cx={32} cy={32} r={31} fill="#00aced" />
                            <path
                              d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"
                              fill="white"
                            />
                          </svg>
                        </button>
                        <button
                          aria-label="linkedin"
                          className="react-share__ShareButton"
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            padding: 0,
                            font: "inherit",
                            color: "inherit",
                            cursor: "pointer"
                          }}
                        >
                          <svg
                            viewBox="0 0 64 64"
                            width={25}
                            height={25}
                            className="transition-all hover:opacity-90"
                          >
                            <circle cx={32} cy={32} r={31} fill="#007fb1" />
                            <path
                              d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"
                              fill="white"
                            />
                          </svg>
                        </button>
                      </div> */}
                    </div>
                    <div className="space-y-6 py-7">
                      <div className="block">
                        <h4 className="text-heading font-semibold text-sm mb-1.5">Địa chỉ:</h4>
                        <p className="text-sm sm:leading-6 leading-7 text-body">
                        {storeInfo?.address}
                        </p>
                      </div>
                      <div className="block">
                        <h4 className="text-heading font-semibold text-sm mb-1.5">Chủ sở hữu:</h4>
                        <p className="text-sm sm:leading-6 leading-7 text-body">
                        {storeInfo?.user?.fullName}
                        </p>
                      </div>
                      <div className="block">
                        <h4 className="text-heading font-semibold text-sm mb-1.5">Số điện thoại:</h4>
                        <div className="flex items-center justify-between">
                          <p className="text-sm sm:leading-6 leading-7 text-body">
                          {storeInfo?.user?.phone}
                          </p>
                          {/* <button className="flex-shrink-0 text-sm font-semibold transition-all text-heading hover:opacity-80">
                            Call Now
                          </button> */}
                        </div>
                      </div>
                      {/* <div className="block">
                        <h4 className="text-heading font-semibold text-sm mb-1.5">Website:</h4>
                        <div className="flex items-center justify-between">
                          <p className="text-sm sm:leading-6 leading-7 text-body">www.redq.io</p>
                          <a
                            href="https://www.redq.io"
                            target="_blank"
                            className="flex-shrink-0 text-sm font-semibold transition-all text-heading hover:opacity-80"
                          >
                            Visit This Site
                          </a>
                        </div>
                      </div> */}
                      <div className="block">
                        <h4 className="text-heading font-semibold text-sm mb-1.5">Mô tả:</h4>
                        <p className="text-sm sm:leading-6 leading-7 text-body">
                          {storeInfo?.description}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 flex gap-x-2.5 py-7">
                      <button
                        onClick={() => navigate('/customer')}
                        data-variant="smoke"
                        className="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  h-11 md:h-12 px-5 bg-gray-200 text-heading py-2 transform-none normal-case hover:bg-gray-300 w-full false"
                      >
                         Về trang chủ
                      </button>
                      <button
                        onClick={() => { setIsOpen(false) }}
                        data-variant="smoke"
                        className="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  h-11 md:h-12 px-5 bg-gray-200 text-heading py-2 transform-none normal-case hover:bg-gray-300 w-full"
                      >
                        {/* Share{" "}
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 24 24"
                          className="ltr:ml-1 rtl:mr-1"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M10 3v2H5v14h14v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6zm7.586 2H13V3h8v8h-2V6.414l-7 7L10.586 12l7-7z" />
                          </g>
                        </svg> */}
                        Đóng
                      </button>
                    </div>
                  </div>


                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
export default ShowMoreModal;