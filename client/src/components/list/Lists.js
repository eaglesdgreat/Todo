import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { isAuthenticate } from './../auth/auth.helper'
import { createList, allListsByUser } from './api.lists'
import image from './../../static/sponge.jpg'
import './lists.css'

class Lists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      name: '',
      description: '',
      error: '',
      redirectTo: false,
      open: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.clickSubmit = this.clickSubmit.bind(this)
    this.clickOpen = this.clickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    const jwt = isAuthenticate()
    allListsByUser({ userId: jwt.user._id}, { t: jwt.token }).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ lists: data })
      }
    })
  }

  clickOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name] : value })
  }

  clickSubmit(e) {
    const { name, description } = this.state
    const list = { name, description}
    e.preventDefault()
    const jwt = isAuthenticate()
    createList({ userId: jwt.user._id }, { t: jwt.token }, list).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ error: '', redirectTo: true })
      }
    })
  }

  render() {
    const {
      lists,
      name,
      description,
      error,
      redirectTo,
      open
    } = this.state

    if (redirectTo) {
      return (<Redirect to="/lists" />)
    }

    return(
      <div>
        <span>
          <button onClick={this.clickOpen} variant="contained">
            + Add List
          </button>
          <dialog open={open} onClose={this.handleClose} className="dialog">
            <h3 className="list-title">Fill the form below to create a list</h3>
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
                create list
              </button>
            </div>
          </dialog>
        </span>
        
        <div>
          <ul className="product-list-small">
            {lists.map((list) => {
              return(
                <Link to="/list">
                  <li key={list._id}>
                    <img src={image} height="105" className="product-photo" alt="image" />

                    <h2>{list.name}</h2>

                    <div className="product-rating" style="width:63px">
                      Created By {list.createdBy.name}
                    </div>

                    <p className="product-description">{list.description}</p>

                    <p className="product-price">Created on {list.created}</p>
                  </li>
                </Link>
              )
            })}
          </ul>
          {error && (
            <p style={{ color: 'red' }}>
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }
}

export default Lists
