import { createStore } from '@reduxjs/toolkit'
import todoApp from '../services/reducers'
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
} from '../services/actions'
import {VisibilityFilter} from '../services/actionTypes'

let store = createStore(todoApp)
console.log(store)

console.log(store.getState())

const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
// Отправим несколько экшенов
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));
store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));
store.dispatch(
  setVisibilityFilter(VisibilityFilter.SHOW_COMPLETED)
);

// Прекратим слушать обновление состояния
unsubscribe();