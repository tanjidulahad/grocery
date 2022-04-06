import { connect } from "react-redux";
import { QuantityID, Button } from "../inputs";
// import Rating from '../rating-stars/rating'

import { addToCart, removeFromCart } from "../../redux/cart/cart-actions";
import {AiOutlineHeart,AiFillStar} from 'react-icons/ai'

const ProductItem = ({ data, addToCart, removeFromCart, cart,offer }) => {

    const  truncate=(str, no_words)=> {
      return str.split(" ").splice(0,no_words).join(" ");
  }
    if (!data) {
        return (
            <div className="h-full  flex border-gray-200 rounded-lg overflow-hidden">
                <div className=" w-32 h-32 sm:w-40 sm:h-40 animate-pulse bg-gray-400 shrink-0 object-cover object-center"></div>
                <div className="px-6 pt-6">
                    <h1 className="w-1/2 mb-3 sm:mb-4 h-4 sm:h-6 animate-pulse bg-gray-500"></h1>
                    <h2 className="bg-gray-400 animate-pulse h-3 sm:h-4 w-1/4 mb-2"></h2>
                    <p className="leading-relaxed mb-3 w-full h-2 sm:h-3 animate-pulse bg-gray-400"></p>
                    <div className="block items-center flex-wrap ">
                        <a className="bg-indigo-300 h-4 animate-pulse mt-2 w-52 inline-flex items-center md:mb-2 lg:mb-0">

                        </a>

                    </div>
                </div>
            </div>
        )
    }
    const itemInCart = cart.find((item) => (item.item_id == data.item_id)) || {}
    const productDataForCart = {
        item_id: Number(data.item_id),
        store_id: data.store_id,
        category_id: data.category_id,
        item_name: data.item_name,
        sale_price: data.sale_price,
        price: data.price,
        sub_category_id: data.sub_category_id,
        primary_img: data.primary_img,
        is_veg: data.is_veg,
        inventoryDetails: data.inventoryDetails,
    }
    const LocalQuantityID = ({ className }) => (
        // This component used two times
        <>
            {
                itemInCart?.quantity ?
                    <QuantityID value={itemInCart.quantity} disabledPlush={(() => {
                        if (itemInCart.inventoryDetails) {
                            return itemInCart.inventoryDetails.max_order_quantity == itemInCart.quantity && itemInCart.inventoryDetails.max_order_quantity > 0 || itemInCart.inventoryDetails.inventory_quantity <= itemInCart.quantity
                        }
                        return false
                    })()}
                        onPlush={() => addToCart(productDataForCart)} onMinus={() => removeFromCart(productDataForCart)} />
                    :
                    <Button className={`btn-color btn-bg max-h-min text-base font-medium rounded py-2.5 px-9 sm:py-3 sm:px-12 ${className}`} onClick={() => addToCart(productDataForCart)} >Add</Button>
            }
        </>
    )
    return (
        <>
            <div className="w-100 block product-item">


                <>
    <div className="border-2 border-green-900 ">
     <div className="flex justify-between w-full">
       <img  className="m-2" src="/img/square.png"/>
       <AiOutlineHeart className="m-2" size={18} />
     </div>
     <div className="w-10/12  mx-6 " style={{height:'200px'}}>
     <img className="w-full h-full " src={`${data.primary_img || '/img/default.png'}`} alt={`${data.item_name}`}/>

     </div>
     {
  offer?
 <div className="w-8/12 rounded-r-full h-8  relative -top-2  white-color flex items-center justify-center" style={{backgroundColor:"#44ADF4"}}>
  <p className="md:text-sm lg:text-base">Flat Rs. 200 OFF</p>
  </div>
  :
  <div className="lg:w-8/12 w-full rounded-r-full h-8 bg-white  relative -top-2  white-color flex items-center justify-center" >
  <p>Flat Rs. 200 OFF</p>
  </div>

}

    </div>
    <div className="flex justify-between my-2 mx-1">
    <div className="flex">
      <p className="font-bold text-lg">₹ {data.sale_price}</p>
      <p className="text-gray-400 font-thinner text-sm mx-4 flex items-center"> (MPR.{data.price})</p>

    </div>
    <div className="flex">
    <p className=" text-sm flex items-center">4.5</p>
    <div className="flex items-center">
    <AiFillStar color="orange" />

    </div>
    </div>

    </div>
    <div className="w-11/12 mx-1">
    <p className="text-sm">
      {
        truncate('Maggie combo of 4 | 52g each I Aproduct from Nestle in india ',20)
      }...
</p>
     </div>
    <div className="my-2 white-color">
    <Button  className="w-full py-2 rounded" style={{backgroundColor:"#F58634"}} type="button" href="/" title="ADD TO CART"/>

    </div>
    </>
                {
                    !!itemInCart.inventoryDetails && <>
                        {
                            itemInCart.inventoryDetails.min_order_quantity > 1 &&
                            <div className="">
                                <span className="text-sm red-color">*Minimum order quantity is {itemInCart.inventoryDetails.min_order_quantity}.</span>
                            </div>
                        } {
                            itemInCart.inventoryDetails.max_order_quantity == itemInCart.quantity && itemInCart.inventoryDetails.max_order_quantity > 0 || itemInCart.inventoryDetails.inventory_quantity <= itemInCart.quantity &&
                            <div className="">
                                <span className="text-sm success-color">*You reached to maximum order quantity.</span>
                            </div>
                        }
                    </>
                }
            </div>

        </>
    )
}
const mapStateToProps = state => ({
    cart: state.cart
})
const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
