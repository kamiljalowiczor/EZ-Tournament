import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './views/Home.jsx'
import Layout from './views/Layout.jsx'
import './i18n'
import NewTournament from './views/NewTournament.jsx'
import Tournament from './views/Tournament.jsx'

const App = (props) => (
  <Layout>
    <Switch>
      <Route path='/t' component={Tournament} />
      <Route path='/new' exact component={NewTournament} />
      <Route path='/' exact component={Home} />
      <Redirect to='/' />
    </Switch>
  </Layout>
)

export default App
