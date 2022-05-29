import uiActionType from '@redux/UI/ui-action-type'

export const logOut = () => ({
    type: uiActionType.LOG_OUT
})
export const logOutCancel = () => ({
    type: uiActionType.LOG_OUT_CANCEL
})
