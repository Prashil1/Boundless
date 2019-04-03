import React, { Component } from 'react'
import {connect } from 'react-redux'

class MeetingPage extends Component {

  state = {
    userEmail: '',
    time: '',
    place: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      userEmail: '',
      time: '',
      place: ''
    })
    
  }




  render() {
    console.log(this.state);
    
    return (
      <div className="container">
        <div className=" card" style={{padding: '3%'}}>
        
          <div className="card-panel">
            <h1>Meeting board</h1>
            <table>
              <thead>
                <tr>
                    <th>Meeting Requester</th>
                    <th>Time</th>
                    <th>Place</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Alvin</td>
                  <td>Eclair</td>
                  <td>$0.87</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="card-panel">
            <h2>Set Meeting</h2>
            <form>
              <input onChange={this.handleChange} type="text" id="userEmail" placeholder="Email of User" name="userEmail" />
              <input onChange={this.handleChange}  type="date" id="time" name="time" />
              <input onChange={this.handleChange}  type="text" id="place" name="place" placeholder="Meeting Place" />

              <input 
                type="submit"
                className="btn blue lighten-1 z-depth-0"
                value="Send Request"
              />
            </form>
          
          </div>
        
        </div>
      </div>
    )
  }
}

export default MeetingPage



