import React from 'react'
import Tracker from './tracker';

function Ordertracker({ data,details }) {
  return (
    <div className="w-full  border-2 rounded-lg  bg-white">

      <div className="  border-gray-200  w-full flex justify-between">
        <div className='flex w-full my-6'>
          <div className="px-4  w-full flex ">
            <div className="  w-full    ">
              <Tracker details={details} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ordertracker
