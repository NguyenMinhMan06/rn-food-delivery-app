import { POST_LOGIN, RETRIEVE_TOKEN } from "./actionType"


export const loginAction = (user, password) => {
    return {
        type: POST_LOGIN,
        data: { user, password }
    }
}