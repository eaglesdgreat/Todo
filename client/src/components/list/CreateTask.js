import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import './lists.css'
import { createTask } from './api.lists'
import { isAuthenticate } from './../auth/auth.helper'

class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      error: '',
      description: '',
      redirectTo: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({ name: '', description: '' })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  clickSubmit(e) {
    e.preventDefault()
    const jwt = isAuthenticate()
    const { listId } = this.props.match.params
    const { name, description } = this.state
    const task = { name, description }
    createTask({ listId }, { t: jwt.token }, jwt.user._id, task).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ error: '', redirectTo: true })
      }
    })
  }

  render() {
    const { name, description, error, redirectTo } = this.state
    if (redirectTo) {
      return(<Redirect to="/list" />)
    }
    return (
      <div>
        <h3 className="list-title">Create your task</h3>
        <div>
          <form encType="multipart/form-data">
            <input
              name="name"
              className="list-input"
              placeholder="Enter Name"
              required
              autoFocus
              fullWidth
              value={name}
              onChange={this.handleChange}
            />
            <br />
            <input
              name="description"
              className="list-input"
              placeholder="Enter Name"
              required
              fullWidth
              value={description}
              onChange={this.handleChange}
            />
          </form>
          <br />
          {error && (
            <p style={{ color: 'red' }}>
              {error}
            </p>
          )}
          <button className="list-button" type="submit" onClick={this.clickSubmit}>
            create task
          </button>
        </div>
      </div>
    )
  }
}

export default CreateTask
