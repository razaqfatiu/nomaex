import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Button, Nav } from "react-bootstrap";


export default class SignedOutLink extends Component {
  render() {
    return (

        <Nav className="ml-auto" navbar>
          <Nav.Link className="text-white" href="/signin">SignIn</Nav.Link>
          <Nav.Link className="text-white" href="/signup">Create an Account</Nav.Link>
          {/* <Nav.Link href="#">About Us</Nav.Link>
          <Nav.Link href="#"><i className="fa fa-shopping-cart"></i> <span className="badge badge-light">0</span></Nav.Link> */}
        </Nav>
        
    )
  }
}
