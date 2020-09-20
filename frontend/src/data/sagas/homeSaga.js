import { takeLatest } from 'redux-saga/effects'

export function * homeLoadedSaga () {
  console.log('Home loaded!')
}

export function * watchHome () {
  yield takeLatest('HOME_LOADED_ACTION', homeLoadedSaga)
}
