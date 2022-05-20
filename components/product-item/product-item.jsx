import { connect } from "react-redux";
import { QuantityID, Button } from "../inputs";
// import Rating from '../rating-stars/rating'

import { addToCart, removeFromCart } from "../../redux/cart/cart-actions";
import { AiOutlineHeart, AiFillStar } from 'react-icons/ai'
import { addWishlistStart } from "@redux/wishlist/wishlist-action";



const ProductItem = ({ store, data, user, addToCart, removeFromCart, cart, offer, addItemToWishlist }) => {
    console.log("storedetails", user)

    const truncate = (str, no_words) => {
        return str.split(" ").splice(0, no_words).join(" ");
    }

    const wishlist = () => {
        if (user.currentUser === null) {
            alert('Please Login First');
        }
        else {
            const payload = {
                id: Number(data.item_id),
                storeId: store.store_id,
                userId: user.currentUser.customer_id
            }
            addItemToWishlist(payload)
        }
    }

    if (!data) {
        return (
            <div className="h-full   border-gray-200 rounded-lg overflow-hidden">

                <div className=" w-32 h-32 sm:w-40 sm:h-40 animate-pulse bg-gray-400 shrink-0 object-cover object-center"></div>
                <div className="pl-0 px-6 pt-6">
                    <h1 className="w-1/2 mb-3 sm:mb-4 h-4 sm:h-6 animate-pulse bg-gray-500"></h1>
                    <h2 className="bg-gray-400 animate-pulse h-3 sm:h-4 w-1/4 mb-2"></h2>
                    <p className="leading-relaxed mb-3 w-full h-2 sm:h-3 animate-pulse bg-gray-400"></p>
                    <div className="block items-center flex-wrap ">
                        <a className="bg-indigo-300 h-4 py-6 animate-pulse mt-2 w-full inline-flex items-center md:mb-2 lg:mb-0">

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
                    <Button className={`btn-color w-full  btn-bg max-h-min text-base font-medium rounded py-3  ${className}`} onClick={() => addToCart(productDataForCart)} >ADD TO CART</Button>
            }
        </>
    )
    return (
        <>
            <div className=" flex flex-col  items-stretch justify-between border-[#B6B6B6] h-full w-[180px] md:w-[221.85px] product-item w-max ">
                <Button className="block " type="link" href={`/product/${data.item_id}`} style={{ height: '-webkit-fill-available' }}>
                    <a className="tooltip block relative bg-white border rounded-sm h-[220px] md:h-[264.49px]">
                        <div className="flex absolute justify-between w-full">
                            <img className="m-2" src="/img/square.png" />
                            <AiOutlineHeart className="m-2" size={18} onClick={wishlist} />
                        </div>
                        {/* <div className="w-8/12 mx-8 md:mx-10  md:mt-6 cursor-pointer " style={{ height: '160px' }}> */}
                        <img className="w-full h-full object-cover" src={`${data.primary_img || '/img/default.png'}`} alt={`${data.item_name}`} />
                        {/* </div> */}
                        {
                            data.item_name.length > 40 &&
                            <span className="tooltiptext">{data.item_name}</span>
                        }
                    </a>
                </Button>
                <div className="flex flex-col justify-between items-start">
                    <div className="flex justify-start items-baseline h-full my-2  w-full ">
                        <div className="flex">
                            <p className="font-bold text-sm md:text-lg">₹ {data.sale_price}</p>
                            <span className="text-gray-400 font-thinner text-xs ml-2 flex items-center line-through"> (MPR.{data.price})</span>
                        </div>
                        {/* <div className=" hidden md:flex">
                            <p className=" text-sm flex items-center">4.5</p>
                            <div className="flex items-center">
                                <AiFillStar color="orange" />
                            </div>
                        </div> */}
                    </div>
                    <div className="h-10 ">
                        <p className="text-sm font-semibold line-truncate-2">
                            {data.item_name}
                        </p>
                    </div>
                </div>
                <div className="my-2 w-full ">
                    <LocalQuantityID />
                </div>
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
    cart: state.cart,
    user: state.user,
    store: state.store.info,

})
const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(addToCart(item)),
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    addItemToWishlist: (item) => dispatch(addWishlistStart(item)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
