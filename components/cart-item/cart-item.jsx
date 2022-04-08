import { connect } from "react-redux";
import Link from "@components/link";
import { addToCart, removeFromCart } from "../../redux/cart/cart-actions";
import { QuantityID } from "../inputs";
import Rating from "@components/rating-stars/rating";

const CartItem = ({ addToCart, removeFromCart, data }) => {
  console.log(data)
    return (
        <div className="w-100 block ">
            <div className="grid grid-cols-12 gap-4 ">
                <div className="lg:col-span-2  flex sm:space-x-4">
                    <Link href={`/product/${data.item_id}`}>
                        <a className=" hidden sm:block">
                            <div className=" flex w-max">
       <img  className=" w-4 h-4" src="/img/square.png"/>

                            <img className="w-20 h-20 mx-4 object-cover rounded-md" src={data.primary_img || '/img/default.png'} alt="product" />
                            </div>

                        </a>
                    </Link>

                </div>
                <div className="lg:col-span-1 md:col-span-2 ">

                </div>
                <div className="lg:col-span-9 md:col-span-9 sm:col-span-9">
                <Link href={`/product/${data.item_id}`}>
                            <a className="block">
                                <h3 className=" lg:text-base sm:text-xl capitalize cart-item-title">{data.item_name.toLowerCase()}</h3>
                            </a>
                        </Link>
                 <div >
                 <Rating value={4.5} count={5.0} />
                 </div>
                 <div className="flex justify-between items-center ">
                   <div className="lg:col-span-5">
                   <div className="flex flex-col justify-between">



                        <div>
                            <span className="font-medium black-color-75  text-base sm:text-xl inline-block sm:mr-2">₹{data.sale_price}</span>
                            {
                                data.sale_price != data.price &&
                                <span className=" text-base sm:text-base black-color-50 line-through ml-4 lg:ml-0 xl:ml-4 inline-block">₹{data.price}</span>
                            }
                            {

                            }
                        </div>
                    </div>

                   </div>
                   <div className="lg:col-span-7">
                    <div className="flex flex-col sm:flex-row justify-between w-full h-full items-end sm:items-center ">
                        <div>
                            <QuantityID value={data.quantity} disabledPlush={(() => {
                                if (data.inventoryDetails) {
                                    return data.inventoryDetails.max_order_quantity == data.quantity && data.inventoryDetails.max_order_quantity > 0 || data.inventoryDetails.inventory_quantity <= data.quantity
                                }
                                return false
                            })()}
                                onPlush={() => addToCart(data)} onMinus={() => removeFromCart(data)} />
                        </div>

                    </div>
                    </div>
                 </div>
                </div>


            </div>
            {
                !!data.inventoryDetails && <>
                    {
                        data.inventoryDetails.min_order_quantity > 1 &&
                        <div className="">
                            <span className="text-sm red-color">*Minimum order quantity is {data.inventoryDetails.min_order_quantity}.</span>
                        </div>
                    } {
                        data.inventoryDetails.max_order_quantity == data.quantity && data.inventoryDetails.max_order_quantity > 0 || data.inventoryDetails.inventory_quantity <= data.quantity &&
                        <div className="">
                            <span className="text-sm success-color">*You reached to maximum order quantity.</span>
                        </div>
                    }
                </>
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item))
})

export default connect(null, mapDispatchToProps)(CartItem);
