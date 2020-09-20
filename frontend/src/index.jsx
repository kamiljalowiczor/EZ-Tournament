import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { StoreContext } from 'redux-react-hook'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import App from './app'

ReactDOM.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
