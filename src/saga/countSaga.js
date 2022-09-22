  import { 
    ASYNC_INCREMENT, 
    incrementCreator, 
    decrementCreator, 
    ASYNC_DECREMENT} from '../services/countReducer'
  import {put, takeEvery} from 'redux-saga/effects'
  
  //put - диспатч, предназначенный для синхронных экшенов

  // Спец функция задержки
  const delay = (ms) => new Promise(res => setTimeout(res, ms))

  //worker
  function* incrementWorker() {
    //Перед каким то асинхронным действием пишем yeld
    yield delay(1000)
    yield put(incrementCreator())
  }

  //worker
  function* decrementWorker() {
    yield delay(1000)
    yield put(decrementCreator())
  }

  //watcher
  //Почему то здесб используется другой экшен(не понимаю)
  export function* countWatcher() {
    //первый параметр - тип экшена за которым следим
    // второй - воркер, который должен отрабатывать, 
    //когда экшн с таким типом, который был передан первым 
    //параметром будет задиспатчен
    yield takeEvery(ASYNC_INCREMENT, incrementWorker)
    yield takeEvery(ASYNC_DECREMENT, decrementWorker)

  }