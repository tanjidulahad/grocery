import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '@components/inputs'
import { Input } from '@components/inputs'

// Components
import CartItem from '@components/cart-item/cart-item'
import { Radio } from '@components/inputs'
import OnlienPayment from '@components/online-payment/online-payment'
import Loader from '@components/loading/loader'
import PageWrapper from '@components/page-wrapper/page-wrapper'
import AddressForm from '@components/address-form/address-form'

// Actions
import { clearCart, deleteItemFromCart } from '@redux/cart/cart-actions'
import { getAddressStart, addAddressStart, updateAddressStart, authShowToggle, } from '@redux/user/user-action'
import {
    setBackendCartStart, getPurchageStart, setDeliveryAddressToPurchase, setPaymentMethod, setShipmentMethod,
    initiateOrderPymentStart, clearCheckout, createNewRzpOrderStart, applyCouponCodeStart,
} from '@redux/checkout/checkout-action'
import OrderSummry from '@components/order-summry/order-summry'
import withAuth from '@components/auth/withAuth'
import Stepper from '@components/stepper/stepper';

const Address = ({ user, userAddress, display, isDetailsLoading, storeSettings, cart, info, checkout, setBackendCart, getPurchage, getAddress, setDeliveryAddressToPurchase, setPaymentMethod, setShipmentMethod, authToggle, initiateOrder, clearCheckout, createNewRzpOrder, clearCart, deleteItemFromCart, applyCouponCode }) => {

    const addressStructure = {
        address_fields: "",
        address_id: "",
        address_line_1: "",
        address_line_2: "",
        address_status: "",
        address_tag: "",
        city: "",
        country: "India",
        country_code: "",
        create_date: "",
        customer_id: "",
        delivery_schema_id: "",
        full_name: "",
        is_default: "",
        last_modified_date: "",
        latitude: "",
        longitude: "",
        phone: "",
        state: "",
        state_code: "",
        zip_code: "",
    };
    const purchaseDetails = checkout.purchaseDetails
    const totalItems = cart.reduce((prev, item) => prev + item?.quantity, 0);
    const router = useRouter();
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
    const [checkoutDetails, setcheckoutDetails] = useState({
        deliveryAddress: "",
    })
    const [navbarHeight, setNavbarHeight] = useState(166)

    const [newAddress, setNewAddress] = useState(addressStructure)
    const [isAddressActive, setIsAddressActive] = useState(false);

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setcheckoutDetails({
            ...checkoutDetails,
            [name]: value,
        })
        if (checkout.purchase) {
            setDeliveryAddressToPurchase({
                purchaseId: checkout.purchase?.purchase_id,
                addressId: value,
            })
        }
    }
    // Componentdidmount effects
    useEffect(() => {
        if (user) {
            getAddress({ userId: user.customer_id })
        }
        if (checkout.purchase) {
            setShipmentMethod({ purchaseId: checkout.purchase?.purchase_id, flag: 'Y' });
        }
    }, [])

    const steps = [{ lable: 'Delivery Address' },
    { lable: 'Add payment method' },
    { lable: 'Order placed' }
    ];
    const style = display ? {
        labelClass: 'text-xs font-normal text-white',
        compoleted: { color: display.secondary_color || '#F58634' },
        active: { color: '#E83B3B' },
        pending: { color: '#c5c5c5' },
        check: { color: '#fff' },
    } : {}
    return (
        <div className="wrapper bg-[#f2f2f2] w-full ">
            <ToastContainer />
            {/* Stepper Header */}
            <div className='h-[166px] flex justify-center items-center nav-bg w-full sm:hidden fixed sm:static inset-x-0 px-4 py-4  top-[0] z-[1001] bg-white sm:bg-transparent'>
                <Stepper steps={steps} activeStep={checkoutDetails.deliveryAddress ? 1 : 0} sx={style} />
            </div>
            <div className="w-full p-0 sm:py-10 space-y-5 pb-[80px] sm:pb-10">
                <h3 className='text-2xl hidden sm:block font-semibold'>Select a delivery address</h3>
                <div className='flex flex-col md:flex-row justify-between md:space-x-6'>
                    <div className=' space-y-5'>
                        <div className='flex-1 bg-white'>
                            <div className="grid px-2 grid-cols-1 xl:grid-cols-2 gap-y-4 ">
                                {userAddress.map((item, i) => (
                                    <div className="address border sm:border-0 rounded-md flex h-full" key={i + i}>
                                        <div className="p-6 sm:p-8 flex delivery-inputs spance-x-2 w-full">
                                            <Radio
                                                className='mt-1'
                                                id={`address${i}`}
                                                name="deliveryAddress"
                                                checked={
                                                    checkoutDetails.deliveryAddress ==
                                                    item.address_id
                                                }
                                                value={item.address_id}
                                                onChange={onChangeHandler}
                                            />
                                            <div className="flex">
                                                <div className="ml-2 w-full">
                                                    <label htmlFor={`address${i}`}>
                                                        <h3 className="text-base font-semibold">
                                                            {item.full_name}<span className=' font-normal'>{' '}({item.address_tag})</span>

                                                        </h3>
                                                        <div className="my-3 block">
                                                            <span className="home">
                                                                {item?.address_line_1},{' '}
                                                                {item?.address_line_2}
                                                            </span>
                                                            <span className="state-pin">
                                                                {item?.city}, {item?.state}{' '}
                                                                {item?.zip_code},{' '}
                                                            </span>
                                                            <span className="country">
                                                                {item?.country},{' '}
                                                            </span>
                                                            <span className="country font-w-bold">
                                                                +91 {item?.phone}
                                                            </span>
                                                        </div>

                                                    </label>
                                                    <button className="btn-color-revers my-2" onClick={() => { setNewAddress(item); setIsAddressActive(true) }}>
                                                        Edit
                                                    </button>
                                                    {checkoutDetails.deliveryAddress !=
                                                        item.address_id && (
                                                            <label
                                                                className=" hidden sm:block my-2 btn-bg btn-color py-3.5  px-8 rounded max-w-fit"
                                                                htmlFor={`address${i}`}
                                                            >
                                                                Deliver Here
                                                            </label>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex-1 p-6 sm:p-8 bg-white'>
                            <AddressForm edit={newAddress} />
                        </div>
                    </div>
                    {/* Billing Details >> */}
                    <div className=' shrink-0 w-full md:w-5/12 xl:w-4/12'>
                        <div className=' bg-white hidden sm:block p-4 sm:p-10'>
                            <OrderSummry />
                        </div>
                        <div className='w-full flex fixed sm:static inset-x-0 justify-between items-center px-4 py-4  bottom-[0] z-[1001] bg-white sm:bg-transparent'>
                            <div className=' space-y-1 block sm:hidden'>
                                <span className='block'>{totalItems} Items in cart</span>
                                <span className=' text-base block font-semibold'>
                                    ₹{' '}
                                    {Number(
                                        purchaseDetails?.calculatedPurchaseTotal
                                    ).toFixed(2)}
                                </span>
                            </div>
                            <Button type='link' disabled={isDetailsLoading || !checkoutDetails.deliveryAddress} href='/cart/payment' className="w-fit sm:w-3/4 sm:mt-10 sm:mx-auto px-14 sm:px-0 py-3  block  sm:py-4 white-color rounded btn-bg text-center">Proceed </Button>
                        </div>
                    </div>
                    {/* << Billing details */}
                </div>
                <Button type='link' href='/cart' className="block w-fit btn-color-revers text-lg py-1 px-6 border mt-4 btn-border">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                    </svg>Back</Button>
            </div>
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
    display: state.store.displaySettings
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
export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(withAuth(Address)))