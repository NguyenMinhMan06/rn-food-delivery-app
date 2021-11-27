import { GET_LOCATION_LIST_ERROR, GET_LOCATION_LIST_SUCCESS } from "../action/actionType"


const initialState = {
    isLoading: true
}

const locationReducer = (state = initialState, action) => {
    try {
        const response = action.response
        switch (action.type) {
            case GET_LOCATION_LIST_SUCCESS:
                return { ...state, isLoading: false, response: response }
            case GET_LOCATION_LIST_ERROR:
                const error = action.error
                return { ...state, isLoading: false, error: error }
            default:
                return state
        }
    } catch (error) {
        console.log('item reducer error', error)
    }
}

export default locationReducer