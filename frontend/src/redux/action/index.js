import { GET_USER, LOGIN, LOGOUT, REGISTER } from "./actionType"


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