import { combineReducers } from "redux";
import {todoReducer, visibleReducer} from '../services/reducers'
import { customersReducer } from "./customersReducer";

export const todoApp = combineReducers({
  todoReducer,
  visibleReducer,
  customersReducer,
})

export default todoApp