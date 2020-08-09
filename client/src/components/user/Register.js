import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { createUser } from './api.users'
import './Login.css'
import avatar from './../../static/avatar.png'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
      },
      error: '',
      redirectTo: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
  }

  componentDidMount() {
    const { user } = this.state
    this.setState({
      ...user,
      name: '',
      email: '',
      password: '',
    })
  }

  handleChange(event) {
    const { name, value } = event.target
    const { user } = this.state
    this.setState({
      ...user,
      [name]: value,
    })
  }

  clickSubmit(e) {
    e.preventDefault()
    const { user } = this.state
    createUser(user).then((data) => {
      if(data.error) {
        this.setState({ error: data.error })
      }
      this.setState({ error: '', redirectTo: true })
    })
  }

  render() {
    const { user, error, redirectTo } = this.state
    if (redirectTo) {
      return (<Redirect to="/" />)
    }
    return (
      <section className="popup-graybox">
        <div className="ebook-popup-sec">
          <img src={avatar} alt="Avatar" />
          <h2 data-edit="text">Register to Todo</h2>
          <h3 data-edit="text">
            Welcome Register your account to access todo list.
          </h3>
          <div className="ebook-email-sec">
            <input
              type="text"
              name="name"
              className="ebookemail-input1"
              placeholder="Enter Name"
              required
              autoFocus
              value={user.name}
              onChange={this.handleChange}
            />
            <input
              name="email"
              type="email"
              className="ebookemail-input2"
              placeholder="Enter Email"
              required
              value={user.email}
              onChange={this.handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              className="ebookemail-input1"
              placeholder="Enter Password"
              required
              value={user.password}
              onChange={this.handleChange}
            />
            <button className="ebook-input-btn" type="submit" onClick={this.clickSubmit}>
              register
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
          Already have an account?
          <Link to="/">
            <span>click here</span>
          </Link>
           to Signin
          </h5>
      </section>
    )
  }
}

export default Register
