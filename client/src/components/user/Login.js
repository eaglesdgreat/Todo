import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import './Login.css'
import avatar from './../../static/avatar.png'
import { signin } from './api.users'
import { authenticate } from './../auth/auth.helper'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      redirectTo: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      email: '',
      password: '',
    })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  clickSubmit(e) {
    e.preventDefault()
    const { email, password } = this.state
    const user = {
      email,
      password,
    }
    signin(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        authenticate(data, () => {
          this.setState({ redirectTo: true, error: '' })
        })
      }
    })
  }

  render() {
    const { email, password, error, redirectTo } = this.state
    if (redirectTo) {
      return (
        <Redirect to='/list' />
      )
    }
    return (
      <section className="popup-graybox">
        <div className="ebook-popup-sec">
          <img src={avatar} alt="Avatar" />
          <h2 data-edit="text">Login to Todo</h2>
          <h3 data-edit="text">
            Login to your Todo list a nd start adding your tasks for completion.
          </h3>
          <div className="ebook-email-sec">
            <input
              name="email"
              type="email"
              className="ebookemail-input1"
              placeholder="Enter User Name"
              required
              value={email}
              autoFocus
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              className="ebookemail-input2"
              placeholder="Enter Password"
              required
              value={password}
              onChange={this.handleChange}
            />
            <button className="ebook-input-btn" type="submit" onClick={this.clickSubmit}>
              login now
            </button>
            <button className="ebook-cls-btn close-btn">X</button>
          </div>
          <br />
          {error && (
            <p style={{ color: 'red' }}>
              {error}
            </p>
          )}
        </div>
        <br />
        <h5>
          Not Registered?
          <Link to="/register">
            <span>click here</span>
          </Link>
           to Register
          </h5>
      </section>
    )
  }
}

export default Login
