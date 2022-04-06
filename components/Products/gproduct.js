import React from 'react'
import Gnavbar from '@components/navbar/gnavbar'
// import RecommendedCard from '@components/Cards/Home/RecommendedCard'
import {BsFilterLeft} from 'react-icons/bs'
import ProductItem from '@components/product-item/product-item'
function products({products,status}) {
  return (
    <div>

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
        <div className="  grid  grid-cols-1 lg:grid-cols-5 md:grid-cols-2 gap-4">

  {
          status == 'success'
            ?
            products.length
              ?
              products.map((item, i) => (
                 <div>
                <ProductItem key={i} data={item} />
                </div>
              ))
              :
              <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                <h6>
                  <span className="">No items found{' '}
                    <Link href={`/`}>
                      <a className="red-color p-2 " style={{ cursor: 'pointer' }}>{' '}
                        Show All Products.
                      </a>
                    </Link>
                  </span>
                </h6>
              </div>
            : status == 'loading' ?
              <>
                <ProductItem />
                <ProductItem />
                <ProductItem />
              </>
              :
              <div className="flex justify-center items-center" style={{ height: "30vh" }}>
                <h6>
                  <span className="">Unexpected error occurred{' '}
                    <span className="red-color" onClick={Router.reload} style={{ cursor: 'pointer' }}>{' '}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                      </svg> Please Reload
                    </span>
                  </span>
                </h6>
              </div>
        }

  </div>




        </div>
        <div className="basis-1/12 "></div>
      </div>

    </div>
  )
}

export default products
