import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, LOGOUT_SUCCESS, REGISTER, REGISTER_FAIL, REGISTER_SUCCESS, RETRIEVE_TOKEN } from "../action/actionType";

const initialState = {
}

const loginReducer = (state = initialState, action) => {
    try {
        const response = action.response
        switch (action.type) {
            case LOGIN_SUCCESS:
                return {...state, response}
            case LOGIN_FAIL:
                const error = action.error
                return {...state, error}
            case LOGOUT_SUCCESS:
                return state = initialState
            // case REGISTER_SUCCESS:
            //     const newRegister = action.response
            //     return login = newRegister
            // case REGISTER_FAIL:
            //     login = initialState
            //     return {
            //         error: action.error
            //     }
            default:
                return state
        }
    } catch (error) {
        console.log('login reducer error', error)
    }
}

export default loginReducer