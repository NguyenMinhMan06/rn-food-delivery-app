import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../action/actionType";

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
            default:
                return state
        }
    } catch (error) {
        console.log('login reducer error', error)
    }
}

export default loginReducer