import React, { useEffect, useRef } from 'react';

import Image from '../../../../assets/images/transactions-image-04.svg';

function TransactionPanel({
  transactionPanelOpen,
  setTransactionPanelOpen
}) {
  
  const closeBtn = useRef(null);
  const panelContent = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!transactionPanelOpen || panelContent.current.contains(target) || closeBtn.current.contains(target)) return;
      setTransactionPanelOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!transactionPanelOpen || keyCode !== 27) return;
      setTransactionPanelOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div
      ref={panelContent}
      className={`absolute inset-0 sm:left-auto z-20 shadow-xl transition-transform duration-200 ease-in-out ${
        transactionPanelOpen ? 'translate-x-' : 'translate-x-full'
      }`}
    >
      <div className="sticky top-16 bg-slate-50 overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-l border-slate-200 w-full sm:w-[390px] h-[calc(100vh-64px)]">
        <button ref={closeBtn} onClick={() => setTransactionPanelOpen(false)} className="absolute top-0 right-0 mt-6 mr-6 group p-2">
          <svg
            className="w-4 h-4 fill-slate-400 group-hover:fill-slate-600 pointer-events-none"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m7.95 6.536 4.242-4.243a1 1 0 1 1 1.415 1.414L9.364 7.95l4.243 4.242a1 1 0 1 1-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 0 1-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 0 1 1.414-1.414L7.95 6.536Z" />
          </svg>
        </button>
        <div className="py-8 px-4 lg:px-8">
          <div className="max-w-sm mx-auto lg:max-w-none">
            <div className="text-slate-800 font-semibold text-center mb-1">Bank Transfer</div>
            <div className="text-sm text-center italic">22/01/2022, 8:56 PM</div>
            {/* Details */}
            <div className="drop-shadow-lg mt-12">
              {/* Top */}
              <div className="bg-white rounded-t-xl px-5 pb-2.5 text-center">
                <div className="mb-3 text-center">
                  <img className="inline-flex w-12 h-12 rounded-full -mt-6" src={Image} width="48" height="48" alt="Transaction 04" />
                </div>
                <div className="text-2xl font-semibold text-emerald-500 mb-1">+$2,179.36</div>
                <div className="text-sm font-medium text-slate-800 mb-3">Acme LTD UK</div>
                <div className="text-xs inline-flex font-medium bg-slate-100 text-slate-500 rounded-full text-center px-2.5 py-1">Pending</div>
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
                  <span className="italic">IBAN:</span>
                  <span className="font-medium text-slate-700 text-right">IT17 2207 1010 0504 0006 88</span>
                </div>
                <div className="flex justify-between space-x-1">
                  <span className="italic">BIC:</span>
                  <span className="font-medium text-slate-700 text-right">BARIT22</span>
                </div>
                <div className="flex justify-between space-x-1">
                  <span className="italic">Reference:</span>
                  <span className="font-medium text-slate-700 text-right">Freelance Work</span>
                </div>
                <div className="flex justify-between space-x-1">
                  <span className="italic">Emitter:</span>
                  <span className="font-medium text-slate-700 text-right">Acme LTD UK</span>
                </div>
              </div>
            </div>   
            {/* Notes */}
            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-800 mb-2">Notes</div>
              <form>
                <label className="sr-only" htmlFor="notes">
                  Write a note
                </label>
                <textarea id="notes" className="form-textarea w-full focus:border-slate-300" rows="4" placeholder="Write a note…" defaultValue={''} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionPanel;
