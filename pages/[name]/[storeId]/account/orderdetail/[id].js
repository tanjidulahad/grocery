import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'

import Ordertracker from '@components/Cards/orderDetail/orderTracker/ordertracker.jsx'
import List from '@components/Cards/orderDetail/orderList/orderlList'
import Address from '@components/Cards/orderDetail/address/adress'
import Loader from '@components/loading/loader'
import Return from '@components/Cards/Order/Action/Return'
// Actions
import { getOrderDetailsStart } from '@redux/orders/orders-action'
import ErrorPage from '@components/error'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import accountLayout from '@components/layout/account-layout'
import Review from '@components/Cards/Review/review'


function orderDetail({ getOrderDetails }) {
  const [isReturnActive, setIsReturnActive] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null) // {}
  const [error, setError] = useState(null)
  const [address, setAddress] = useState(null) // {}
  const router = useRouter()

  useEffect(() => {
    const { id } = router.query
    if (id) {
      getOrderDetails({ orderId: id, setOrderDetails, setError })
    }
  }, [router.isReady])
  useEffect(() => {
    if (orderDetails) {
      setAddress(orderDetails.deliveryAddressDetails)
    }
  })

  return (
    <>
      <div className=' w-full flex sm:hidden justify-start items-center p-5 bg-white sticky top-0 z-10 ' style={{ boxShadow: `0px 2px 8px #0000001A` }}>
        <button className='flex items-center black-color-75 mr-4' onClick={router.back}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
          </svg>
        </button>
        <span className='text-base font-semibold'>Order Details</span>
      </div>
      <section className="bg-gray-100 w-full ">
        <div className=' mx-auto'>
          {
            !orderDetails && !error ?
              <Loader />
              : error ?
                <ErrorPage message={error.message} statusCode={error?.response?.status || error?.statusCode} />
                :
                <div className="grid grid-cols-1 lg:grid-cols-12 ">
                  <div className="lg:col-span-12   lg:mb-10 ">
                    <List orderId={orderDetails.orderId} storeName={orderDetails.storeName} createTime={orderDetails.createTime} list={Object.values(orderDetails.orderItems)} openReturn={setIsReturnActive} />
                    <Ordertracker data={{ orderId: orderDetails.orderId }} details={orderDetails} />

                    {
                      !!address &&
                      <Address address={address} type={'order'} orderDetails={orderDetails} />
                    }
                      <div className="px-4  bg-white rounded-lg w-full flex ">
             <div className="  w-full  m-2 my-4  ">

                     <div className="flex  mx-4 ">
                              <p className="text-left mr-4 mb-0 font-[600] text-lg  text-black"> Payment Method: </p>
                                   <p className="text-center  mt-0 mb-0 font-[300] text-lg  text-green-400"> Online</p>
                     </div>

                     </div>
                     </div>


                     <Review/>
                  </div>

                </div>
          }
        </div>
        {
          isReturnActive && orderDetails &&
          <Return action={'return'} items={orderDetails.orderItems} orderId={orderDetails.orderId} closeRetun={setIsReturnActive} />
        }
      </section>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  getOrderDetails: (payload) => dispatch(getOrderDetailsStart(payload))
})

export default connect(null, mapDispatchToProps)(PageWrapper(accountLayout(orderDetail)))
