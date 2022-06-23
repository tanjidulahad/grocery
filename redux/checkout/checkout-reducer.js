import checkoutActionType from "./checkout-action-type";

const INITIAL_STATE = {

    purchase: null,
    purchaseDetails: null, //{},
    isDetailsLoading: false,
    cartError: null,// {}
    couponInfo: null,
    invalidCouponExist:null
}


const checkoutReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {

        case checkoutActionType.GET_PURCHASE_START:
            return {
                ...state,
                isDetailsLoading: true
            }
        case checkoutActionType.GET_PURCHASE_SUCCESS:
            return {
                ...state,
                isDetailsLoading: false,
                purchaseDetails: payload,
            }
        case checkoutActionType.GET_PURCHASE_FAILURE:
            return {
                ...state,
                isDetailsLoading: false
            }
        case checkoutActionType.SET_BACKEND_CART_SUCCESS:
            return {
                ...state,
                purchase: payload
            }
        case checkoutActionType.SET_CART_ERROR:
            return {
                ...state,
                cartError: payload
            }
        case checkoutActionType.CLEARE_CART_ERROR:
            return {
                ...state,
                cartError: null
            }
        case checkoutActionType.APPLY_COUPON_CODE_SUCCESS:
            return {
                ...state,
                couponInfo: payload
            }
        case checkoutActionType.INVALID_COUPON_APPLIED:
            return {
                ...state,
                invalidCouponExist: payload
            }
        case checkoutActionType.CLEARE_CHECKOUT:
            return INITIAL_STATE

        default:
            return state;
    }
}

export default checkoutReducer;
