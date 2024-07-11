import { combineReducers } from "redux"; 
import { ModalReducer } from "./modal";
import { authReducer } from "./AuthReducer/authreducer";

export const reducer = combineReducers({
    modal: ModalReducer,
    auth: authReducer
})