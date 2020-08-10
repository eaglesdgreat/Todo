import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { updateList, getlist } from './api.lists'
import { isAuthenticate } from './../auth/auth.helper'
import './lists.css'

class EditList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      owner: '',
      error: '',
      redirectTo: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
  }

  componentDidMount() {
    const { listId } = this.props.match.params
    getlist({ listId }).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({
          name: data.name,
          description: data.description,
          owner: data.createdBy,
        })
      }
    })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  clickSubmit(e) {
    e.preventDefault()
    const { listId } = this.props.match.params
    const jwt = isAuthenticate()
    const { name, description } = this.state
    const list = { name, description }
    updateList({ listId }, { t: jwt.token }, list).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ redirectTo: true })
      }
    })
  }

  render() {
    const {
      name,
      description,
      error,
      redirectTo,
      owner,
    } = this.state
    if (redirectTo) {
      return (<Redirect to="/list" />)
    }

    return (
      <div>
        <h2 className="list-title">{owner.name} Update your list</h2>
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
            update
          </button>
        </div>
      </div>
    )
  }
}

export default EditList
