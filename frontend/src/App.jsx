import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './views/Home.jsx'
import Layout from './views/Layout.jsx'
import './i18n'
import NewTournament from './views/NewTournament.jsx'
import Tournament from './views/Tournament.jsx'
import { ThemeProvider } from '@material-ui/styles'
import theme from './common/constants/theme'

const App = (props) => (
  <ThemeProvider theme={theme}>
    <Layout>
      <Switch>
        <Route path='/t/:publicLink' component={Tournament} />
        <Route path='/new' exact component={NewTournament} />
        <Route path='/' exact component={Home} />
        <Redirect to='/' />
      </Switch>
    </Layout>
  </ThemeProvider>
)

export default App
