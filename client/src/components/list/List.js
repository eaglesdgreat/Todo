import React, { Component } from 'react'

import { getlist } from './api.lists'
import { isAuthenticate } from './../auth/auth.helper'
import image from './../../static/sponge.jpg'
import './list.css'
import './lists.css'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: '',
      error: '',
    }
    this.init = this.init.bind(this)
  }

  componentDidMount() {
    const { listId } = this.props.match.params
    this.init(listId)
  }

  componentDidUpdate(prevProps) {
    const { listId } = this.props.match.params
    if (prevProps.match.params.listId !== listId) {
      this.init(listId)
    }
  }

  componentWillUnmount() {
    this._currentId = null
  }

  init(listId) {
    this._currentId = listId
    getlist({ listId }).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ list: data })
      }
    })
  }

  render() {
    const { list, error } = this.state
    return (
      <div>
        <div>
          <ul className="product-list-vertical">
            <li>
              <img src={image} height="160" alt="image" />

              <div class="product-details">
                <a href="#" class="product-compare">compare</a>

                <h2>{list.name}</h2>

                <div class="product-rating">
                    <div>
                        <span class="product-stars" style="width: 60px" >
                            Created by {list.createdBy.name}
                        </span>
                    </div>
                </div>

                <p class="product-description">{list.description}</p>

                <p class="product-price">Created On {list.created} | Updated on {list.updated}</p>
              </div>
            </li>
          </ul>
        </div>
        <hr />

        <div>
        <ul className="product-list-small">
            {list.tasks.map((task) => {
              return(
                  <li key={task._id}>
                    <img src={image} height="105" className="product-photo" alt="image" />

                    <a href="#" class="product-compare">compare</a>

                    <h2>{task.name}</h2>

                    <div className="product-rating" style="width:63px">
                      Created By {task.createdBy.name}
                    </div>

                    <p className="product-description">{task.description}</p>

                    <p className="product-price">Created on {task.created} | Updated on {task.updated}</p>
                  </li>
              )
            })}
          </ul>
        </div>
        {error && (
          <p style={{ color: 'red' }}>
            {error}
          </p>
        )}
      </div>
    )
  }
}

export default List
