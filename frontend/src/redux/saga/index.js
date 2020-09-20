import { all } from 'redux-saga/effects'
import { watchHome } from '../../data/sagas/homeSaga'

// Here should be added future sagas watchers
export default function * rootSaga () {
  yield all([
    watchHome()
  ])
}
