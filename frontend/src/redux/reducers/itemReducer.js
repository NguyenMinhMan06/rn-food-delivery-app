import { ADD_ITEM_SUCCESS, GET_ITEM_FAIL, GET_ITEM_SUCCESS, } from "../action/actionType";

const initialState = {
    isLoading: true
}

const itemReducer = (state = initialState, action) => {
    try {
        const response = action.response
        switch (action.type) {
            case GET_ITEM_SUCCESS:
                return { ...state, isLoading: false, response: response }
            case ADD_ITEM_SUCCESS:
                return { ...state, isLoading: false, response: [...state.response, ...response] }
            case GET_ITEM_FAIL:
                const error = action.error
                return { ...state, isLoading: false, error: error }
            default:
                return state
        }
    } catch (error) {
        console.log('item reducer error', error)
    }
}

export default itemReducer