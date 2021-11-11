import { ADD_ITEM_FAVORITE, ADD_ITEM_FAVORITE_SUCCESS, GET_ITEM_FAIL, GET_ITEM_FAVORITE_FAIL, GET_ITEM_FAVORITE_SUCCESS, GET_ITEM_SUCCESS, REMOVE_ITEM_FAVORITE, REMOVE_ITEM_FAVORITE_SUCCESS, } from "../action/actionType";

const initialState = {
    isLoading: true
}

const itemReducer = (state = initialState, action) => {
    try {
        const response = action.response
        switch (action.type) {
            case GET_ITEM_FAVORITE_SUCCESS:
                return { ...state, isLoading: false, response: response }
            case GET_ITEM_FAVORITE_FAIL:
                const error = action.error
                return { ...state, isLoading: false, error: error }
            case ADD_ITEM_FAVORITE_SUCCESS:
                return { ...state, response: state.response.concat(response) }
            case REMOVE_ITEM_FAVORITE_SUCCESS:
                return {...state, response: state.response.filter(e => e.id !== response)}
            default:
                return state
        }
    } catch (error) {
        console.log('fav reducer error', error)
    }
}

export default itemReducer