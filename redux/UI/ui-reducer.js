import checkoutActionType from "@redux/checkout/checkout-action-type";
import cartActionType from "@redux/cart/cart-action-type";
import userActionType from '@redux/user/user-action-type'
import uiActionType from "@redux/UI/ui-action-type";

const INITIAL_STATE = {
    isDetailsLoading: false,
    logout: false,
    isMobCatOpen: false
}

const uiReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case checkoutActionType.GET_PURCHASE_START:
        case checkoutActionType.SET_BACKEND_CART_START:
        case checkoutActionType.SET_BACKEND_CART_STORE_START:
        case checkoutActionType.SET_SHIPMENT_METHOD:
        case checkoutActionType.SET_PAYMENT_METHOD:
            return {
                ...state,
                isDetailsLoading: true,
            }
        case checkoutActionType.SET_SHIPMENT_METHOD_SUCCESS:
        case checkoutActionType.GET_PURCHASE_SUCCESS:
        case cartActionType.UPDATE_CART_SUCCESS:
        case checkoutActionType.GET_PURCHASE_FAILURE:
        case checkoutActionType.SET_PAYMENT_METHOD_SUCCESS:
        case checkoutActionType.SET_PAYMENT_METHOD_FAILURE:
            return {
                ...state,
                isDetailsLoading: false,
            }
        case uiActionType.LOG_OUT:
            return {
                ...state,
                logout: true,
            }
        case userActionType.LOG_OUT_START:
        case uiActionType.LOG_OUT_CANCEL:
            return {
                ...state,
                logout: false,
            }

        default:
            return state;
    }
}

export default uiReducer;