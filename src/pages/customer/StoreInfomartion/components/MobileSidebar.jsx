import { useMount } from 'ahooks';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import getStoreById from '../../../../services/Customer/getStoreById';
import storeDefault from '../../../../assets/images/storeDefault.jpg'
const MobileSidebar = ({ isOpen, setIsOpen, storeId }) => {
    const location = useLocation();
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
        <>
            <div className="flex lg:hidden items-center px-4 py-4 border-b border-gray-300 mb-4">
                <div className="flex flex-shrink-0">
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
                                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2762%27%20height=%2762%27/%3e"
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
                            // src="/_next/image?url=%2Fassets%2Fimages%2Fshop%2Fshop-logo-1.jpg&w=128&q=75"
                            src={imgSrc} onError={() => setImgSrc(storeDefault)}
                            layout="fill"
                            objectfit="cover"
                            decoding="async"
                            data-nimg="intrinsic"
                            className="rounded-md"
                            // srcSet="/_next/image?url=%2Fassets%2Fimages%2Fshop%2Fshop-logo-1.jpg&w=64&q=75 1x, /_next/image?url=%2Fassets%2Fimages%2Fshop%2Fshop-logo-1.jpg&w=128&q=75 2x"
                            srcSet={imgSrc}
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
                <div className="ltr:pl-4 rtl:pr-4 ml-4">
                    <h4 className="text-heading text-sm md:text-base xl:text-lg font-semibold">
                        {location.state.storeInfo.name}
                    </h4>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="font-semibold text-sm text-heading transition-all opacity-80 hover:opacity-100">
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </>
    )
}

export default MobileSidebar