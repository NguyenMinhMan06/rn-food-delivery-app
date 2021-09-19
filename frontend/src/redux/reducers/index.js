import { combineReducers } from "redux";
import cartItemsReducer from "./cartItemsReducer";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import userReducer from "./userReducer";


const rootReducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    user: userReducer,
    cartItem: cartItemsReducer
})

export default rootReducers
