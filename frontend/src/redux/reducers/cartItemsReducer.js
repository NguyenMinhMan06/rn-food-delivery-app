import { ADD_TO_CART, GET_CART, REMOVE_FROM_CART } from "../action/actionType"

const initalState = []

const cartItemsReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_CART:
            return state
        case ADD_TO_CART:
            if (state.some(item => item.id === action.data.id)) {
                return state.map(item => (item.id === action.data.id ? { ...item, quantity: item.quantity + 1 } : item))
            }
            return [...state, { ...action.data, quantity: 1 }];
        case REMOVE_FROM_CART:
            return state
                .map(item => (item.id === action.data.id ? { ...item, quantity: item.quantity - 1 } : item))
                .filter(item => item.quantity > 0);
    }
    return state
}

export default cartItemsReducer