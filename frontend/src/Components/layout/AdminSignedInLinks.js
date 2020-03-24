import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default class AdminSignedInLinks extends Component {
  render() {
    return (
      <div>
          <div className="nav-mobile"><Link to=""id="nav-toggle" ><span></span></Link></div>
        <ul className="nav-list">
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/upload">Upload</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          </ul>
      </div>
    )
  }
}
