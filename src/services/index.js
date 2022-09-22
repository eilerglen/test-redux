import { combineReducers } from "redux";
import { todoReducer, visibleReducer } from "../services/reducers";
import { customersReducer } from "./customersReducer";
import countReducer from "./countReducer";
import userReducer from "./userReducer";
import createSagaMiddleware from "@redux-saga/core";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { addTodo, fetchCustomers } from "../services/actions";
import { countWatcher } from "../saga/countSaga";
import { rootWatcher } from "../saga";

  //Инициируем saga
  const sagaMiddleware = createSagaMiddleware();

  export const rootReducer = combineReducers({
    todoReducer,
    visibleReducer,
    customersReducer,
    countReducer,
    userReducer,
  });

  export let store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

  sagaMiddleware.run(rootWatcher)

  store.dispatch(fetchCustomers());

  function logger(store) {
    let next = store.dispatch;
    // ранее было так:
    // store.dispatch = function dispatchAndLog(action) { }
    return function dispatchAndLog(action) {
      console.log("dispatching", action);
      let result = next(action);
      console.log("next state", store.getState());
      return result;
    };
  }

  //Перепишем на такую логику передачи оригинальной диспатч в параметре
  function carryLogger(store) {
    return function wrapDispatch(next) {
      return function dispatchAndLog(action) {
        console.log("dispatching", action);
        let result = next(action);
        console.log("next state", store.getState());
        return result;
      };
    };
  }

  const arrowCarryLogger = (store) => (next) => (action) => {
    console.log("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    return result;
  };

  const arrowCrahsReporter = (store) => (next) => (action) => {
    try {
      console.log("i m in second middleware!");
      return next(action);
    } catch (err) {
      console.error("Caught an exception!", err);
      throw err;
    }
  };

  const customApplyMiddleware = (store, middlewares) => {
    //Формируем массив усилителей
    let arrMiddlewares = middlewares.slice();
    arrMiddlewares.reverse();
    //Записываваем в переменную dispatch метод стора dispatch
    let dispatch = store.dispatch;
    // Для каждого мидлвара мы вызываем функцию - усилитель хранилища дважды доходя до диспатч
    middlewares.forEach((middleware) => {
      dispatch = middleware(store)(dispatch);
      // console.log(middleware)
      // console.log(dispatch)
    });
    return Object.assign({}, store, { dispatch });
  };

  const whatIs = customApplyMiddleware(store, [
    arrowCarryLogger,
    arrowCrahsReporter,
  ]);
  whatIs.dispatch(addTodo("Yohyy"));
// console.log(whatIs.getState())

// function applyMiddlewareByMonkeyPatching(store, middlewares) {
//   middlewares = middlewares.slice()
//   middlewares.reverse()

//   middlewares.forEach(middleware => {
//     store.dispatch = middleware(store)
//   });
// }

// applyMiddlewareByMonkeyPatching(store, [logger])
// console.log(applyMiddlewareByMonkeyPatching)



// function todoApp (state = {}, action) {
//     return {
//       visibleReducer: visibleReducer (state.visibleStatus, action),
//       todoReducer: todoReducer(state.todos, action)
//     }
// }
