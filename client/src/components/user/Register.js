import React, { Component } from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from 'mdbreact'

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
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form>
              <p className="h5 text-center mb-4">Sign up</p>
              <div className="grey-text">
                <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                  success="right" />
                <MDBInput
                  label="Your email"
                  name="name"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right" />
                <MDBInput label="Confirm your email" icon="exclamation-triangle" group type="text" validate
                  error="wrong" success="right" />
                <MDBInput label="Your password" icon="lock" group type="password" validate />
              </div>
              <div className="text-center">
                <MDBBtn color="primary">Register</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}