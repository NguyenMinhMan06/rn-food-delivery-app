import { ADD_LOCATION_SUCCESS, ADD_USERPHONE_SUCCESS, GET_USER_FAIL, GET_USER_SUCCESS, LOGOUT_SUCCESS, } from "../action/actionType";

const initialState = {
    isLoading: true
}

const userReducer = (state = initialState, action) => {
    try {
        const response = action.response
        switch (action.type) {
            case GET_USER_SUCCESS:
                return { ...state, isLoading: false, response: response }
            case GET_USER_FAIL:
                const error = action.error
                return { ...state, isLoading: false, error: error }
            case ADD_LOCATION_SUCCESS:
                return { ...state, isLoading: false, response: { ...state.response, coords: response.coords, address: response.address } }
            case ADD_USERPHONE_SUCCESS:
                return { ...state, isLoading: false, response: { ...state.response, phoneNumber: response } }
            case LOGOUT_SUCCESS:
                return state = initialState
            default:
                return state
        }
    } catch (error) {
        console.log('user reducer error', error)
    }
}

export default userReducer