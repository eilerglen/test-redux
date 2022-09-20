import {
  SET_VISIBILITY_FILTER,
  ADD_TODO,
  TOGGLE_TODO,
  VisibilityFilter,
  ADD_CUSTOMERS,
} from "./actionTypes";

import { combineReducers } from "redux";

const { SHOW_ALL } = VisibilityFilter;

const initialState = {
  visibleStatus: VisibilityFilter.SHOW_ALL,
  todos: [],
};

function todoReducer (state=[], action) {
  switch (action.type) {
    case ADD_TODO: 
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO: 
    return state.map((todo, index) => {
      if(index === action.index) {
        return Object.assign({}, todo, {
          completed: !todo.completed,
        })
        
      }
      return todo;
    })
    default:
      return state
  }
}

function visibleReducer (state = SHOW_ALL, action) {
  switch(action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
      default:
        return state;  
  }
}

function customersReducer (state=[], action) {
  switch (action.type) {
    case ADD_CUSTOMERS: 
      return [
        ...state,
        [...state.customers, ...state.pa]
      ]
    case TOGGLE_TODO: 
    return state.map((todo, index) => {
      if(index === action.index) {
        return Object.assign({}, todo, {
          completed: !todo.completed,
        })
        
      }
      return todo;
    })
    default:
      return state
  }
}
// function todoApp (state = {}, action) {
//     return {
//       visibleReducer: visibleReducer (state.visibleStatus, action),
//       todoReducer: todoReducer(state.todos, action)
//     }
// }

const todoApp = combineReducers({
  todoReducer,
  visibleReducer,
})

export default todoApp