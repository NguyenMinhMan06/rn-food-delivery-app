import { LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "../action/actionType";

const initialState = {
}

const registerReducer = (state = initialState, action) => {
    try {
        const response = action.response
        switch (action.type) {
            case REGISTER_SUCCESS:
                return {...state, response}
            case REGISTER_FAIL:
                const error = action.error
                return {...state, error}
            default:
                return state
        }
    } catch (error) {
        console.log('register reducer error', error)
    }
}

export default registerReducer