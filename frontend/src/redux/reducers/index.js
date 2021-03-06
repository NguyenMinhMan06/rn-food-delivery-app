import { combineReducers } from "redux";
import cartItemsReducer from "./cartItemsReducer";
import itemReducer from "./itemReducer";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import userReducer from "./userReducer";
import itemCatReducer from "./itemCatReducer";
import itemFavReducer from "./itemFavReducer";
import locationReducer from "./locationReducer";


const rootReducers = combineReducers({
    login: loginReducer,
    register: registerReducer,
    user: userReducer,
    cartItem: cartItemsReducer,
    item: itemReducer,
    itemCat: itemCatReducer,
    itemFav: itemFavReducer,
    locList:locationReducer
})

export default rootReducers
