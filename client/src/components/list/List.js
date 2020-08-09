import React, { Component } from 'react'

import { getList } from './api.lists'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: '',
      error: '',
    }
  }

  componentDidMount() {
    const { listId } = this.props.match.params
    getList({ listId }).then((data) => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ list: data })
      }
    })
  }
}