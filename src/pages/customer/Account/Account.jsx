import React from 'react'
import AccountPanel from './components/AccountPanel'

const Account = () => {
  return (
    <div className="flex overflow-hidden bg-[#f1f5f9] md:px-[10%] md:py-[3%]">

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Page header */}
            <div className="mb-8">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Thiết lập tài khoản ✨</h1>
            </div>

            {/* Content */}
            <div className="bg-white shadow-lg rounded-sm mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px">
                <AccountPanel />
              </div>
            </div>

          </div>
        </main>

      </div>

    </div>
  )
}

export default Account