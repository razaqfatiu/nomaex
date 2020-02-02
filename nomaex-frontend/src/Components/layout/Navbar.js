import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './navbar.scss'
import $ from 'jquery';
import nomeaxLogo from './../../images/nomeaxlogo.jpg';
import SignedInLinks from './SignedInLinks';
import SignedOutLink from './SignedOutLink';




export default class Navbar extends Component {
  componentDidMount() {
    $('nav ul li a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      // Close one dropdown when selecting another
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $('html').click(function() {
      $('.nav-dropdown').hide();
    });
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });
    // Hamburger to X toggle
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
  }
  render() {
    return (
      <div>
        <header className="navigation">
          <div className="nav-container">
            <div className="brand">
              <Link to="/" ><img className="brand-logo" src={nomeaxLogo} /></Link>
            </div>
            <nav>
                <SignedInLinks />
                {/* <SignedOutLink /> */}
            </nav>
          </div>
        </header>
      </div>
    )
  }
}
