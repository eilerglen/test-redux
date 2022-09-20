import {
  ADD_CUSTOMER,
  ADD_CUSTOMERS,
  REMOVE_CUSTOMERS
} from '../services/actionTypes'


const initialState = {
  customers: [],
};

export function customersReducer (state=initialState, action) {
  switch (action.type) {
    case ADD_CUSTOMERS: 
      return {
        ...state,
        customers: [...state.customers, ...action.payload]
      }
    case ADD_CUSTOMER: 
      return {
        ...state,
        customers: [...state.customers, action.payload]
      }
    case REMOVE_CUSTOMERS:
      return {
        ...state,
        customers: state.customers.filter(customer => 
          customer.id !== action.payload
        )
      }  
    default:
      return state
  }
}

