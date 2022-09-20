import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import todoApp from "../src/services/index";
import { addTodo, setVisibilityFilter, toggleTodo } from "./services/actions";
import { VisibilityFilter } from "./services/actionTypes";
import thunk from 'redux-thunk'

let store = createStore(todoApp, applyMiddleware(thunk));
console.log(store.getState())


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
