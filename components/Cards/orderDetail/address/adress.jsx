import React from 'react'
import { FiHome } from 'react-icons/fi'

function adress({ address, place, orderDetails }) {

  return (
    <div className="w-full  border-2 rounded-lg  bg-white">
      <div className="my-4 mb-2  w-full flex justify-between">

        {
          place='order'?<>
 <div className="px-4   w-full flex ">
             <div className="  w-full  m-4 mb-0  ">
               <p className="text-center font-bold text-xl  text-dark">Shipping Details and Invoice</p>
               <div className="flex mt-6">
                 {/* <FiHome className='text-red-500' size={20} /> */}
                 <div>
                   <p className="text-left mx-4 font-bold text-base  text-dark">Address</p>
                   {
                     address &&
                     <>
                                   <p className="text-left m-4 mb-0 font-[100] text-lg  text-black"> {address?.address_line_1}, {address?.address_line_2 && ","} </p>
                                   <p className="text-left m-4 mt-0 mb-0 font-[100] text-lg  text-black"> {address?.city}, {address?.state} - {address?.zip_code}</p>
                                   <p className="text-left m-4 mt-0 font-[100] text-lg  text-black"> mob. {address?.phone}</p>


                     </>


                   }
                 </div>
               </div>
               <div className="flex mt-6">
                 {/* <FiHome className='text-red-500' size={20} /> */}
                 <div>
                   <p className="text-left m-4 font-bold text-base  text-dark ">Billing</p>
                   {
                     address &&
                     <>            <div className="flex justify-between mx-4">
                              <p className="text-left mr-4 mb-0 font-[100] text-lg  text-gray-600"> Item total: </p>
                                   <p className="text-center ml-8 mt-0 mb-0 font-[100] text-lg  text-black"> ₹ {orderDetails.orderAmount} </p>
                     </div>

                     <div className="flex justify-between mx-4 my-2">
                              <p className="text-left mr-4 mb-0 font-[100] text-lg  text-gray-600"> Delivery: </p>
                                   <p className="text-center ml-8 mt-0 mb-0 font-[100] text-lg  text-black"> ₹ {orderDetails?.deliveryCharge ===null?"0":orderDetails?.deliveryCharge}</p>
                     </div>
                     <div className="flex justify-between mx-4 border-b-2 border-gray">
                              <p className="text-left mr-4 mb-0 font-[100] text-lg  text-gray-600"> Promotion Applied: </p>
                                   <p className="text-center ml-8 mt-0 mb-0 font-[100] text-lg  text-black"> ₹ {orderDetails.couponApplied.length===0?"0":orderDetails?.couponApplied[0]}</p>
                     </div>

                     <div className="flex justify-between mx-4 ">
                              <p className="text-left mr-4 mb-0 font-[600] text-lg  text-black"> Order Total: </p>
                                   <p className="text-center ml-8 mt-0 mb-0 font-[600] text-lg  text-black"> ₹ {orderDetails.couponApplied.length===0?"0":orderDetails?.couponApplied[0]+orderDetails.couponApplied.length===0?"0":orderDetails?.couponApplied[0]+orderDetails.orderAmount}</p>
                     </div>



                     </>


                   }
                 </div>
               </div>
      
             </div>
           </div>
          </>:
             <div className="px-4  w-full flex ">
             <div className="  w-full  m-4  ">
               <p className="text-left font-bold text-xl  text-dark">Delivery Address</p>
               <div className="flex mt-6">
                 <FiHome className='text-red-500' size={20} />
                 <div>
                   <p className="text-left mx-4 font-bold text-base  text-dark">Home</p>
                   {
                     address &&
                   <p className="text-left m-4 font-medium text-base  text-gray-500">{address?.full_name}, {address?.address_line_1}, {address?.address_line_2 && ","} {address?.city}, {address?.state}, {address?.zip_code}</p>

                   }
                 </div>
               </div>
             </div>
           </div>
        }

      </div>
    </div>
  )
}

export default adress
