import 'regenerator-runtime/runtime'
import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './redux/reducer/index'
import rootSaga from './redux/saga/index'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    : applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store
