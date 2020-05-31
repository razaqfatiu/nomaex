import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Navbar, Button, Nav, Form, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class SignedInLinks extends Component {
  render() {
    return (
      <Nav className="ml-auto" navbar >
        <Nav.Link className="text-white" href="/">Home</Nav.Link>
        <Nav.Link className="text-white" href="/categories/contact">Contact Us</Nav.Link>
        <Nav.Link className="text-white" href="#">About Us</Nav.Link>
        <Nav.Link className="text-white" href="#"><i className="fa fa-shopping-cart"></i> <span className="badge badge-light">0</span></Nav.Link>
        {/* <Form inline className="text-center">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Nav.Link  href="/">
            <FontAwesomeIcon className="text-white" icon={faSearch} color="black" />
          </Nav.Link>
        </Form> */}
      </Nav>
    )
  }
}
