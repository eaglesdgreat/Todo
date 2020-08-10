import React, { Component } from 'react'

import { deleteList } from './api.lists'
import { isAuthenticate } from './../auth/auth.helper'

class DeleteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.clickOpen = this.clickOpen.bind(this)
    this.removeList = this.removeList.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  clickOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  removeList() {
    const listId = this.props.list._id
    const jwt = isAuthenticate()
    deleteList({ listId }, { t: jwt,token }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({ open: false }, () => {
          this.props.onRemove(this.props.list)
        })
      }
    })
  }

  render() {
    const { open } = this.state
    return (
      <span>
        <button onClick={this.clickOpen} variant="contained">
          delete list
        </button>
        <dialog open={open} onClose={this.handleClose}>
          <h3 className="list-title">Click on the confirm button to delete list</h3>
          <button onClick={this.handleClose} varaint="contained">Cancel</button>
          <button onClick={this.removeList} varaint="contained" autoFocus>Confirm</button>
        </dialog>
      </span>
    )
  }
}

export default DeleteList
