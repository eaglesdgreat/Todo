import React from 'react';
// import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';
import Login from './components/user/Login'

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
