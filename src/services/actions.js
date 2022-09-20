import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  ADD_CUSTOMER,
  ADD_CUSTOMERS,
  REMOVE_CUSTOMERS,
} from "./actionTypes";

export function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}

export function removeTodo() {
  return {
    type: REMOVE_TODO,
  };
}

export function toggleTodo(index) {
  return {
    type: TOGGLE_TODO,
    index,
  };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

export const addCustomerAction  = (payload) => {
  return {
    type: ADD_CUSTOMER, payload
  }
}

export const addManyCustomersAction  = (payload) => {
  return {
    type:  ADD_CUSTOMERS, payload
  }
}

export const removeCustomersAction  = (payload) => {
  return {
    type: REMOVE_CUSTOMERS, payload
  }
}


export const fetchCustomers = () => {
  return function (dispatch) {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => dispatch(addManyCustomersAction(json)));
  };
};
 