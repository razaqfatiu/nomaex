import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class SignedOutLink extends Component {
  render() {
    return (
      <div>
        <div className="nav-mobile"><Link id="nav-toggle" to="/"><span></span></Link></div>
        <ul className="nav-list">
          <li>
            <Link to="/signin">SignIn</Link>
          </li>
          <li>
            <Link to="/signup">Create an Account</Link>
          </li>
        </ul>
      </div>
    )
  }
}
