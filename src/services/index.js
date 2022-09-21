import { combineReducers } from "redux";
import {todoReducer, visibleReducer} from '../services/reducers'
import { customersReducer } from "./customersReducer";


  // function todoApp (state = {}, action) {
  //     return {
  //       visibleReducer: visibleReducer (state.visibleStatus, action),
  //       todoReducer: todoReducer(state.todos, action)
  //     }
  // }

  export const rootReducer = combineReducers({
    todoReducer,
    visibleReducer,
    customersReducer,
  })

export default rootReducer