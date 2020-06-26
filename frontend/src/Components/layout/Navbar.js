import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav } from "react-bootstrap";
import './navbar.scss'
// import $ from 'jquery';
// import nomeaxLogo from '../../images/nomeaxlogo.jpg';
import SignedInLinks from './SignedInLinks';
import SignedOutLink from './SignedOutLink';
// import AdminSignedInLinks from './AdminSignedInLinks'




class NavBar extends Component {
  // componentDidMount() {
  //   $('nav ul li a:not(:only-child)').click(function(e) {
  //     $(this).siblings('.nav-dropdown').toggle();
  //     // Close one dropdown when selecting another
  //     $('.nav-dropdown').not($(this).siblings()).hide();
  //     e.stopPropagation();
  //   });
  //   // Clicking away from dropdown will remove the dropdown class
  //   $('html').click(function() {
  //     $('.nav-dropdown').hide();
  //   });
  //   // Toggle open and close nav styles on click
  //   $('#nav-toggle').click(function() {
  //     $('nav ul').slideToggle();
  //   });
  //   // Hamburger to X toggle
  //   $('#nav-toggle').on('click', function() {
  //     this.classList.toggle('active');
  //   });
  // }
  render() {
    return (
      <Navbar
        bg=""
        className="navbar shadow-sm p-3 mb-5 rounded"
        expand
      >
        <Button variant="outline-success" onClick={this.props.toggle}>
          <FontAwesomeIcon icon={faAlignLeft} color="black" />
        </Button>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <SignedInLinks /> */}
          <SignedOutLink />
        </Navbar.Collapse>
      </Navbar>
    );
    // return (
    //   <div>
    //     <header className="navigation">
    //       <div className="nav-container">
    //         <div className="brand">
    //           <Link to="/" ><img className="brand-logo" src={nomeaxLogo} /></Link>
    //         </div>
    //         <nav>
    //             <SignedInLinks />
    //             {/* <SignedOutLink /> */}
    //             {/* <AdminSignedInLinks /> */}
    //         </nav>
    //       </div>
    //     </header>
    //   </div>
    // )
  }
}

export default NavBar