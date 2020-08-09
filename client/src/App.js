import React from 'react';
// import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';
import Login from './components/user/Login'
import Register from './components/user/Register'

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
