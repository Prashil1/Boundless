import React, { Component } from 'react'

export default class login extends Component {
  

  render() {

    return (
      <div className="container center">
        
        <form className="white ">
          <h5 className="grey-text text-darken-3">SignIn</h5>
    
          <div className="input-field">
              <label htmlFor="userName" >Username</label>
              <input type='text' id='userName' />
          </div>

          <div className="input-field">
              <label htmlFor="password" >Password</label>
              <input type='password' id='password' />
          </div>
          
          <div className="row center">
            <div className="input-field col">
                <button className='btn blue lighten-1 z-depth-0'>Login</button>
            </div>
            
            <div className="input-field col">
                <button className='btn blue lighten-1 z-depth-0'>Register</button>
            </div>
          </div>

        </form>

      </div>
    )
  }
}