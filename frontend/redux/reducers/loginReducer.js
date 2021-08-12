import { LOGIN, LOGOUT, REGISTER, RETRIEVE_TOKEN } from "../action/actionType";

const loginReducer = (login, action) => {
    try {
        switch (action.type) {
            case RETRIEVE_TOKEN:
                return {
                    ...login,
                    userToken: action.token,
                    isLoading: false,
                }
            case LOGIN:
                return {
                    ...login,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                }
            case LOGOUT:
                return {
                    ...login,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                }
            case REGISTER:
                return {
                    ...login,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                }

            default:
                return login
        }
    } catch (error) {

    }
}

export default loginReducer