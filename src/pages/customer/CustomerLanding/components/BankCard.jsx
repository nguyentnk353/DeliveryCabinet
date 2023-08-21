import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import getWallet from '../../../../services/Customer/getWallet';
import { useMount } from 'ahooks';
import getLoginUser from '../../../../services/Customer/getLoginUser';
import currency from 'currency.js';

function BankCard() {
  const [wallet, setWallet] = useState({})
  const [info, setInfo] = useState({})

  useMount(() => {
    getLoginUser()
      .then((res) => {
        setInfo(res)
      })
      .catch((err) => {
        console.log(err);
      });

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

    <div className="relative aspect-[7/4] bg-gradient-to-tr from-indigo-500 to-indigo-400 p-5 rounded-xl overflow-hidden">
      {/* Gradients */}
      <div className="absolute left-0 -bottom-1/3 w-[398px] aspect-square" aria-hidden="true">
        <svg className="w-full h-full" width="398" height="392" viewBox="0 0 398 392" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter x="-88.2%" y="-88.2%" width="276.5%" height="276.5%" filterUnits="objectBoundingBox" id="glow-a">
              <feGaussianBlur stdDeviation="50" in="SourceGraphic" />
            </filter>
          </defs>
          <circle className="fill-indigo-100 opacity-60" filter="url(#glow-a)" cx="85" cy="85" r="85" transform="translate(0 216)" />
        </svg>
      </div>
      <div className="absolute right-0 -top-1/3 w-[398px] aspect-square" aria-hidden="true">
        <svg className="w-full h-full" width="398" height="392" viewBox="0 0 398 392" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter x="-88.2%" y="-88.2%" width="276.5%" height="276.5%" filterUnits="objectBoundingBox" id="glow-b">
              <feGaussianBlur stdDeviation="50" in="SourceGraphic" />
            </filter>
          </defs>
          <circle className="fill-sky-400 opacity-60" filter="url(#glow-b)" cx="85" cy="85" r="85" transform="translate(228 0)" />
        </svg>
      </div>
      <div className="relative h-full flex flex-col justify-between">
        {/* Logo on card */}
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="icon1-b">
              <stop stopColor="#A5B4FC" offset="0%" />
              <stop stopColor="#E0E7FF" offset="100%" />
            </linearGradient>
            <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="icon1-c">
              <stop stopColor="#4338CA" offset="0%" />
              <stop stopColor="#6366F1" stopOpacity="0" offset="100%" />
            </linearGradient>
            <path id="icon1-a" d="M16 0l16 32-16-5-16 5z" />
          </defs>
          <g transform="rotate(90 16 16)" fill="none" fillRule="evenodd">
            <mask id="icon1-d" fill="#fff">
              <use xlinkHref="#icon1-a" />
            </mask>
            <use fill="url(#icon1-b)" xlinkHref="#icon1-a" />
            <path fill="url(#icon1-c)" mask="url(#icon1-d)" d="M16-6h20v38H16z" />
          </g>
        </svg>
        {/* Card number */}
        <div className="flex justify-end gap-5 text-lg font-bold text-slate-200 tracking-widest drop-shadow-sm">
          {wallet?.balance ? (<span>{new Intl.NumberFormat("nb-NO").format(wallet?.balance)}</span>) : (<span>0</span>)}
         
          {/* <span>, 000</span> */}
          <span>VND</span>

        </div>
        {/* Card footer */}
        <div className="relative flex justify-between items-center z-10 mb-0.5">
          {/* Card expiration */}
          <div className="text-sm font-bold text-slate-200 tracking-widest drop-shadow-sm space-x-3">
            <span>{info?.fullName}</span>
            {/* <span>CVC ***</span> */}
          </div>
        </div>
        {/* Mastercard logo */}
        <svg className="absolute bottom-0 right-0" width="48" height="28" viewBox="0 0 48 28">
          <circle fill="#F59E0B" cx="34" cy="14" r="14" fillOpacity=".8" />
          <circle fill="#F43F5E" cx="14" cy="14" r="14" fillOpacity=".8" />
        </svg>
      </div>
    </div>

  );
}

export default BankCard;
