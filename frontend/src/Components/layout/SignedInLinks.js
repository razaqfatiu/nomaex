import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default class SignedInLinks extends Component {
  render() {
    return (
      <div>
        <div className="nav-mobile"><Link id="nav-toggle" ><span></span></Link></div>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <a href="#">Products Category</a>
            <ul className="nav-dropdown">
              <li>
                <Link to="/">Animal</Link>
              </li>
              <li>
                <Link to="/">Farm-tool </Link>
              </li>
              <li>
                <Link to="/">Fishery</Link>
              </li>
              <li>
                <Link to="/">Fruit</Link>
              </li>
              <li>
                <Link to="/">Grains</Link>
              </li>
              <li>
                <Link to="/">Other</Link>
              </li>
              <li>
                <Link to="/">Poultry</Link>
              </li>
              <li>
                <Link to="/">Tubers</Link>
              </li>
              <li>
                <Link to="/">Grains</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/">Services</Link>
          </li>
          <li>
            <Link to="/">Contact Us</Link>
          </li>
          <li>
            <Link to="/"><i className="fa fa-shopping-cart"></i> <span className="badge badge-light">2</span></Link>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </div>
    )
  }
}
