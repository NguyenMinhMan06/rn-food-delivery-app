import { GET_USER_FAIL, GET_USER_SUCCESS,  } from "../action/actionType";

const initialState = {
}

const userReducer = (state = initialState, action) => {
    try {
        const response = action.response
        switch (action.type) {
            case GET_USER_SUCCESS:
                return {...state, response}
            case GET_USER_FAIL:
                const error = action.error
                return {...state, error}
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

export default userReducer