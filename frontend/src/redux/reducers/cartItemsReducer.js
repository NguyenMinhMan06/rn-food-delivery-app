import { ADD_TO_CART, ADD_TO_CART_SUCCESS, GET_ITEM_CART, GET_ITEM_CART_FAIL, GET_ITEM_CART_SUCCESS, LOGOUT_SUCCESS, REMOVE_FROM_CART, REMOVE_FROM_CART_SUCCESS } from "../action/actionType"

const initialState = {
    isLoading: true,
}

const cartItemsReducer = (state = initialState, action) => {
    try {
        const response = action.response
        switch (action.type) {
            case GET_ITEM_CART_SUCCESS:
                return { ...state, isLoading: false, response, }
            case ADD_TO_CART_SUCCESS:
                if (state.response.some(item => item.id === response.id)) {
                    const newList = state.response.map(item => (item.id === response.id ? { ...item, quantity: item.quantity + 1 } : item))
                    return { ...state, isLoading: false, response: newList }
                }
                return { ...state, isLoading: false, response: [...state.response, { ...response, quantity: 1 }] }
            case REMOVE_FROM_CART_SUCCESS:
                const newList = state.response
                    .map(item => (item.id === response.id ? { ...item, quantity: item.quantity - 1 } : item))
                    .filter(item => item.quantity > 0);
                return { ...state, response: newList }
            case GET_ITEM_CART_FAIL:
                const error = action.error
                return { ...state, isLoading: false, error: error }
            case LOGOUT_SUCCESS:
                return state = initialState
            default:
                return state
        }
    } catch (error) {
        console.log('cart reducer error', error)
    }
}

export default cartItemsReducer