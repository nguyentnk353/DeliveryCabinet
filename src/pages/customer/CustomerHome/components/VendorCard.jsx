import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import { BsFileEarmark } from 'react-icons/bs'

const VendorCard = ({variant}) => {
    return (
        <Link
            to={`shops/1`}
            className={cn(
                "flex items-center px-5 lg:px-6 rounded-md shadow-lg cursor-pointer relative bg-white transition-all hover:shadow-md",
                {
                    "pt-10 lg:pt-12 pb-9 lg:pb-11 flex-col text-center":
                        variant === "grid",
                    "py-7 lg:py-8": variant === "list",
                }
            )}
        >
            {true && (
                <span className="text-[10px] xl:text-xs font-semibold text-white uppercase px-2 py-1 xl:py-[5px] rounded bg-[#2B78C6] absolute top-2 end-2">
                    New
                </span>
            )}

            <div
                className={cn(
                    "border border-gray-100 relative flex flex-shrink-0 items-center justify-center bg-gray-300 rounded-full overflow-hidden",
                    {
                        "w-24 h-24 lg:w-28 lg:h-28": variant === "grid",
                        "w-16 h-16": variant === "list",
                    }
                )}
            >
                <img
                    alt={""}
                    src={"https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png"}
                    layout="fill"
                    objectFit="cover"
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
                        "text-heading font-semibold text-sm leading-5 sm:leading-6 lg:leading-7 md:text-base xl:text-lg",
                        {
                            "2xl:text-xl mb-1.5": variant === "grid",
                            "mb-1 md:mb-0.5": variant === "list",
                        }
                    )}
                >
                    Chuoi...
                </h4>
                <p
                    className={cn("text-[13px] leading-5 flex items-start", {
                        "text-sm": variant === "grid",
                    })}
                >
                    <span className="inline-block me-1 text-[#6B7280] relative top-1">
                        <BsFileEarmark />
                    </span>
                    Dia chi....
                </p>
            </div>
        </Link>
    )
}

export default VendorCard