import { ADD_ITEM, ADD_ITEM_FAVORITE, ADD_LOCATION, ADD_TO_CART, ADD_USERPHONE, GET_CART, GET_ITEM, GET_ITEM_CART, GET_ITEM_CAT, GET_ITEM_FAVORITE, GET_LOCATION_LIST, GET_USER, LOGIN, LOGOUT, REGISTER, REMOVE_FROM_CART, REMOVE_ITEM_FAVORITE } from "./actionType"


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

export const getItemCartAction = (item) => {
    return {
        type: GET_ITEM_CART,
        data: item
    }
}

export const getItemAction = () => {
    return {
        type: GET_ITEM,
    }
}

export const addItemAction = (item) => {
    return {
        type: ADD_ITEM,
        data: item
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

export const addLocationUserAction = (item) => {
    return {
        type: ADD_LOCATION,
        data: item
    }
}

export const addUserPhoneAction = (item) => {
    return {
        type: ADD_USERPHONE,
        data: item
    }
}

export const getLocationListAction = () => {
    return {
        type: GET_LOCATION_LIST,
    }
}

export const addOrderAction = (item) => {
    return {
        type: GET_LOCATION_LIST,
        data: item
    }
}