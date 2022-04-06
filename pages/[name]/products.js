import React from 'react'
import Gnavbar from '@components/navbar/gnavbar'
import RecommendedCard from '@components/Cards/Home/RecommendedCard'
import {BsFilterLeft} from 'react-icons/bs'
function products() {
  return (
    <div>
      <Gnavbar/>
      <div className="flex flex-row wrapper w-full ">
        <div className="basis-1/12 "></div>
        <div className=" basis-10/12">
          <div className="flex justify-between w-full my-4">
            <p className="flex items-center font-bold">All Items</p>
            <div className="flex font-bold ">
              <div className="flex items-center">
              <BsFilterLeft size={20} className='mx-4'/>

              </div>
               <p className="flex items-center">Filter / Sort By</p>
            </div>
          </div>
        <div class="  grid  grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
  <div>
    <RecommendedCard offer={true}/>
  </div>
  <div>
    <RecommendedCard offer={false}/>
  </div>
  <div>
    <RecommendedCard offer={false}/>
  </div>
  <div>
    <RecommendedCard offer={false}/>
  </div>


</div>
        </div>
        <div className="basis-1/12 "></div>
      </div>

    </div>
  )
}

export default products
