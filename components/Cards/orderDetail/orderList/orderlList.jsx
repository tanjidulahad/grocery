import moment from 'moment'
import { Button } from '../../../inputs'

function orderlList({ list, storeName, orderId, createTime, openReturn }) {
  return (
    <div className="w-full    ">

      <div>
        {
          list?.map((item, i) => (
            <div key={i} className=" rounded bg-white flex justify-start space-x-4 mt-2 sm:mt-0 p-0 sm:p-4 items-center px-4 sm:px-6">
              <Button className="mt-2 rounded bg-gray-900 md:w-[131px] md:h-[131px] w-20 h-20 shrink-0 block" type='link' href={`/product/${item.orderItemId}`}>
                <img className="w-full h-full rounded object-cover opacity-80" src={item.itemImg || '/img/default.png'} />
              </Button>
              <div className="   items-center space-y-4 ">
                <Button type='link' href={`/product/${item.orderItemId}`}>
                  <p className="text-left font-semibold truncate-2 text-base text-dark mt-2 ">{item.itemName}</p>
                </Button>
                <p className="text-left text-lg lg:text-2xl font-bold text-gray-900  ">₹ {item.discountedOrderItemAmount}</p>
              </div>
            </div>
          ))
        }
      </div>
      <div>
      </div>
    </div>
  )
}

export default orderlList
