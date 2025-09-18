import { combineReducers, createStore } from "redux";
import { ApartmentReduser } from "./ApartmentReduser";
import { UserReduser } from "./UserReduser";




const CombineRedusers=combineReducers({
    Apartments:ApartmentReduser,
    User:UserReduser
})


const store=createStore(CombineRedusers)
export default store;
