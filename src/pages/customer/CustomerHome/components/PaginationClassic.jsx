import React from 'react';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
function PaginationClassic({currentPage, onPageChange, totalStore}) {
  const currentTotalLoaded = currentPage * 6;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            
          {currentPage != 1 ? (
              <button
                className="btn bg-white border-slate-200 text-slate-300 cursor-pointer p-2 flex items-center"             
                disabled={currentPage == 1}
                onClick={() => {
                  onPageChange(currentPage - 1)
                }}
              >
                <WestIcon fontSize='smalla' sx={{margin: '0 5px 0 0'}} /> Trở về trước
              </button>
            ) : (
              <></>
            )
          } 
          
          </li>
          {currentTotalLoaded < totalStore ? (
          <li className="ml-3 first:ml-0">
            <button
              className="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500 p-2 flex items-center"          
              onClick={() => {
                onPageChange(currentPage + 1)
              }}
            >
              Trang tiếp theo <EastIcon fontSize='smalla' sx={{margin: '0 0 0 5px'}}/>
            </button>
          </li>
          ): (<></>)}
          
        </ul>
      </nav>
      <div className="hidden text-sm text-slate-500 text-center sm:text-left">
        Showing <span className="font-medium text-slate-600">1</span> to <span className="font-medium text-slate-600">10</span> of <span className="font-medium text-slate-600">467</span> results
      </div>
    </div>
  );
}

export default PaginationClassic;
