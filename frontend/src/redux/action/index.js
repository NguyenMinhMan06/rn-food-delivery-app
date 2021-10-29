import { ADD_ITEM_FAVORITE, ADD_TO_CART, GET_CART, GET_ITEM, GET_ITEM_CAT, GET_ITEM_FAVORITE, GET_USER, LOGIN, LOGOUT, REGISTER, REMOVE_FROM_CART, REMOVE_ITEM_FAVORITE } from "./actionType"


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

export const getItemAction = () => {
    return {
        type: GET_ITEM,
    }
}

export const getItemCatAction = () => {
    return {
        type: GET_ITEM_CAT,
    }
}

export const getItemFavAction = (userId) => {
    return {
        type: GET_ITEM_FAVORITE,
        data: userId
    }
}


export const addItemFavAction = (item) => {
    return {
        type: ADD_ITEM_FAVORITE,
        data: item
    }
}

export const removeItemFavAction = (item) => {
    return {
        type: REMOVE_ITEM_FAVORITE,
        data: item
    }
}

export const getCartItemAction = () => {
    return {
        type: GET_CART,
    }
}