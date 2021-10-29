import { GET_ITEM_CAT_FAIL, GET_ITEM_CAT_SUCCESS, GET_ITEM_FAIL, GET_ITEM_SUCCESS, } from "../action/actionType";

const initialState = {
    isLoading: true,
    idFirstCat: null
}

const itemCatReducer = (state = initialState, action) => {
    try {
        const response = action.response
        switch (action.type) {
            case GET_ITEM_CAT_SUCCESS:
                return { ...state, isLoading: false, response, }
            case GET_ITEM_CAT_FAIL:
                const error = action.error
                return { ...state, isLoading: false, error: error }
            default:
                return state
        }
    } catch (error) {
        console.log('login reducer error', error)
    }
}

export default itemCatReducer