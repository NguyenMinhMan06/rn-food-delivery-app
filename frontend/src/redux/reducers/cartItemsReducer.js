import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/actionType"

const cartItemsReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.data]
        case REMOVE_FROM_CART:
            return state.filter(cartItem => cartItem.id !== action.data.id)
    }

    return state
}

export default cartItemsReducer