import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import Link, { redirect } from '@components/link'
import { Button } from '@components/inputs'
import { Input } from '@components/inputs'

// Components
import CartItem from '@components/cart-item/cart-item'
import { Radio } from '@components/inputs'
import OnlienPayment from '@components/online-payment/online-payment'
import Loader from '@components/loading/loader'

// Actions
import { clearCart, deleteItemFromCart } from '@redux/cart/cart-actions'
import { getAddressStart, addAddressStart, updateAddressStart, authShowToggle, } from '@redux/user/user-action'
import {
    setBackendCartStart, getPurchageStart, setDeliveryAddressToPurchase, setPaymentMethod, setShipmentMethod,
    initiateOrderPymentStart, clearCheckout, createNewRzpOrderStart, applyCouponCodeStart,
} from '@redux/checkout/checkout-action'


const CartList = ({ user, userAddress, storeSettings, cart, info, checkout, setBackendCart, getPurchage, getAddress, setDeliveryAddressToPurchase, setPaymentMethod, setShipmentMethod, authToggle, initiateOrder, clearCheckout, createNewRzpOrder, clearCart, deleteItemFromCart, applyCouponCode }) => {
    const purchaseDetails = checkout.purchaseDetails
    const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0)
    const [mobNavHeight, setMobNavHeight] = useState(0)
    const [initiateData, setInitiateData] = useState(null) // For cod
    const [confirmPayment, setConfirmPayment] = useState(null) // For online
    const [initiateStatus, setInitiateStatus] = useState('pending') // pending, loading, failure
    const [error, setError] = useState(null)
    const [cpError, setCpError] = useState(null)
    const [couponCode, setCouponCode] = useState("")
    const [success, setOnSuccess] = useState(null)
    const [rzpOrder, setRzpOrder] = useState(null)
    const [enablePayment, setEnablePayment] = useState(false)
    const [coupon, setcoupon] = useState('')
    const [payment, setpayment] = useState(false)
    const [active2, setactive2] = useState(false)
    const [confirmOrder, setConfirmOrder] = useState(false)
    const [navbarHeight, setNavbarHeight] = useState(166)

    const onCouponAppyHandler = () => {
        if (couponCode.length < 3) return;
        const order = Object.values(checkout.purchaseDetails.orders).find(item => item.storeId == info.store_id);
        const orderId = order?.orderId
        applyCouponCode({ purchaseId: checkout.purchase?.purchase_id, storeId: info.store_id, couponCode, orderId, userId: user.customer_id, onSuccess: setOnSuccess, onError: setCpError })
        setCouponCode("")
    }
    useEffect(() => {
        // Do nothing if don't have storeId, user and cart length is zero
        if (!info || !user || !cart.length) return
        const data = {
            [info.store_id]: [
                ...cart.map((item) => ({
                    item_id: item.item_id,
                    barcode_id: null,
                    quantity: item.quantity,
                    variant_item_id: item.defaultVariantItem?.variant_item_id | null,
                })),
            ],
        }
        console.log('Cartipdate');
        //  Creating browsercart
        setBackendCart({ userId: user.customer_id, groupId: info.group_id, purchaseId: checkout?.purchase?.purchase_id, data })
        // if (!checkout.purchase) {
        //   setBackendCart({ userId: user.customer_id, groupId: info.group_id, data })
        // }

        // Setting default details
        // if (checkout.purchase) {
        //   setPaymentMethod({
        //     purchaseId: checkout.purchase?.purchase_id,
        //     flag: checkoutDetails.paymentMethod,
        //   })
        // }
        // if (checkout.purchase) {
        //   setShipmentMethod({
        //     purchaseId: checkout.purchase?.purchase_id,
        //     flag: checkoutDetails.deliveryMethod,
        //   })
        // }
    }, [user, totalItems, info])


    return (
        <div className='w-full sm:space-y-5'>
            {cart.map((item, i) => (
                <div key={i}>
                    <div className=" w-full bg-white rounded border-b-[1px] border-[#E7E7E7] md:border-[0px]">
                        {/* cart Item list */}
                        <div className="px-3 py-3 lg:py-4 lg:p-6  flex flex-col  divide-y sm:divide-y-0">
                            <CartItem data={item} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    info: state.store.info,
    storeSettings: state.store.settings,
    user: state.user.currentUser,
    userAddress: state.user.address,
    checkout: state.checkout,
})
const mapDispatchToProps = (dispatch) => ({
    setBackendCart: (data) => dispatch(setBackendCartStart(data)),
    getPurchage: (id) => dispatch(getPurchageStart(id)),
    getAddress: (id) => dispatch(getAddressStart(id)),
    updateAddress: (data) => dispatch(updateAddressStart(data)),
    addAddressStart: (data) => dispatch(addAddressStart(data)),

    setDeliveryAddressToPurchase: (id) =>
        dispatch(setDeliveryAddressToPurchase(id)),
    setPaymentMethod: (data) => dispatch(setPaymentMethod(data)),
    setShipmentMethod: (data) => dispatch(setShipmentMethod(data)),

    initiateOrder: (data) => dispatch(initiateOrderPymentStart(data)),
    clearCheckout: () => dispatch(clearCheckout()),
    createNewRzpOrder: (data) => dispatch(createNewRzpOrderStart(data)),
    clearCart: () => dispatch(clearCart()),
    deleteItemFromCart: (item) => dispatch(deleteItemFromCart(item)),
    applyCouponCode: (payload) => dispatch(applyCouponCodeStart(payload)),
    authToggle: () => dispatch(authShowToggle()),
})
export default connect(mapStateToProps, mapDispatchToProps)(CartList)