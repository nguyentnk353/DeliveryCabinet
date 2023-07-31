import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { BsFileEarmark } from 'react-icons/bs'
import PlaceIcon from '@mui/icons-material/Place';
import RoomIcon from '@mui/icons-material/Room';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import { Box, Paper } from '@mui/material';

const VendorCard03 = ({ store, variant }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [imgSrc, setImgSrc] = useState(`${store.imgUrl}`);
    return (
        <Box
            onClick={() => navigate('/customer/store-information', {
                state: {
                    storeInfo: store,
                },
            })}
            className={cn(
                "flex items-center px-5 lg:px-6 rounded-md shadow-lg cursor-pointer relative bg-white transition-all hover:shadow-md",
                {
                    "pt-10 lg:pt-12 pb-9 lg:pb-11 flex-col text-center":
                        variant === "grid",
                    "py-7 lg:py-8": variant === "list",
                }
            )}
        >
            {/* {true && (
                <span className="text-[10px] xl:text-xs font-semibold text-white uppercase px-2 py-1 xl:py-[5px] rounded bg-[#2B78C6] absolute top-2 end-2">
                    New
                </span>
            )} */}

            <div
                className={cn(
                    "border border-gray-100 relative flex flex-shrink-0 items-center justify-center bg-gray-300 rounded-full overflow-hidden",
                    {
                        "w-28 h-28 lg:w-36 lg:h-36": variant === "grid",
                        "w-20 h-20": variant === "list",
                    }
                )}
            >
                <img
                    alt={""}
                    src={imgSrc} onError = {() => setImgSrc("https://static.vecteezy.com/system/resources/previews/006/398/494/non_2x/illustration-of-store-or-market-flat-design-vector.jpg")}
                    layout="fill"
                    objectfit="cover"
                />
            </div>

            <div
                className={cn("flex flex-col", {
                    "mb-1 pt-4 md:pt-5 lg:pt-6": variant === "grid",
                    "ms-4": variant === "list",
                })}
            >
                <h4
                    className={cn(
                        "text-heading font-semibold text-sm leading-5 sm:leading-6 lg:leading-7 md:text-base xl:text-lg break-all text-blue-500	",
                        {
                            "2xl:text-xl mb-1.5": variant === "grid",
                            "mb-1 md:mb-0.5": variant === "list",
                        }
                    )}
                >
                    {store?.name}
                </h4>
                <p
                    className={cn("text-[13px] leading-5 flex items-start break-all", {
                        "text-sm": variant === "grid",
                    })}
                >
                    <span className="inline-block me-1 text-[#6B7280] relative top-0">
                        <PlaceIcon />
                    </span>
                    {store?.address}
                </p>
            </div>
        </Box>
    )
}

export default VendorCard03