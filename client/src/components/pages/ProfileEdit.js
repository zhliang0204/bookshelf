
import React, { Component } from 'react'
import api from '../../api'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // user: null,
      username: null,
      currentPassword: null,
      newPassword: null,
      
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    let body = {
      username: this.state.username,
      pictureUrl: this.state.pictureUrl,
    }
    if (this.state.newPassword && this.state.newPassword.length > 0) {
      body.currentPassword = this.state.currentPassword
      body.newPassword = this.state.newPassword
    }
    api.editProfile(body)
      .then(data => {
        // Add a message for 3 seconds
        this.setState({
          message: "Your profile was updated"
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 3000)
      })
  }
  handleFileChange = e => {
    this.setState({
      pictureUrl: null
    })
    let file = e.target.files[0]
    api.addPicture(file)
    .then(data => {
      this.setState({
        pictureUrl: data.pictureUrl
      })
    })
  }
  render() {            
    return (
      <div className="Profile">
        <h2>Profile</h2>


        <form onSubmit={(e) => this.handleSubmit(e)}>
          Username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          <br />

          Current Password:
          <input type="password" name="currentPassword" value={this.state.currentPassword} onChange={this.handleChange} />
          <br />

          New Password:
          <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChange} />
          <br />

         

          <button type="submit">Save profile</button>
        </form>

        {/* If we have this.state.message, display the message  */}
        {this.state.message && <div className="info">
          {this.state.message}
        </div>}
      </div>
    );
  }
  componentDidMount() {
    api.getProfile()
      .then(user => {
        this.setState({
          username: user.username,
          
        })
      })
  }
}
