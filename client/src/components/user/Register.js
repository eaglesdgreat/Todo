import React, { Component } from 'react'

import './Login.css'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        name: '',
        emai: '',
        password: '',
      },
      error: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
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
  }

  render() {
    const { user, error } = this.state
    return (
      <section class="popup-graybox">
        <div class="ebook-popup-sec">
          <img src={avatar} alt="Avatar" />
          <h2 data-edit="text">Login to Todo</h2>
          <h3 data-edit="text">
            Login to your Todo list a nd start adding your tasks for completion.
          </h3>
          <div class="ebook-email-sec">
            <input
              name="email"
              type="email"
              className="ebookemail-input1"
              placeholder="Enter User Name"
              required
              value={email}
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
        </div>
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