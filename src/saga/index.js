  import {all} from 'redux-saga/effects'
  import { countWatcher } from './countSaga'
  import { userWatcher } from './userSaga'

  // Эфффект all 

  export function* rootWatcher() {
    yield all([countWatcher(), userWatcher()])
  }