import { ADD_TO_CART, GET_USER, LOGIN, LOGOUT, REGISTER, REMOVE_FROM_CART } from "./actionType"


export const loginAction = (email, password) => {
    return {
        type: LOGIN,
        data: { email, password }
    }
}

export const registerAction = (email, password, name) => {
    return {
        type: REGISTER,
        data: { email, password, name }
    }
}

export const logOutAction = () => {
    return {
        type: LOGOUT,
    }
}

export const getUserAction = (uid) => {
    return {
        type: GET_USER,
        data: uid
    }
}

export const addToCartAction = (product) => {
    return {
        type: ADD_TO_CART,
        data: product
    }
}

export const removeFromCart = (product) => {
    return {
        type: REMOVE_FROM_CART,
        data: product
    }
}