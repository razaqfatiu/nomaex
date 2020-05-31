import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faLinkedin, faInstagram, } from "@fortawesome/free-brands-svg-icons"
import './footer.scss'
import { Navbar, Button, Nav, Container, Row, Col } from "react-bootstrap";


export default class Footer extends Component {
  render() {
    return (
      <Navbar className="footer-main-div" fixed="bottom">
        <Container fluid className="footer-div">
          {/* <Container> */}
          <Row className="Row">
            <Col className="text-left foot-left">
              <p className="footer-element">© 2020 NOMAEX</p>
            </Col>
            <Col className="text-right foot-right">
              <ul>
                <li>
                  <FontAwesomeIcon icon={faFacebookF} className="white-text mr-md-5 mr-3 footer-element" color="white" size="lg" />
                </li>
                <li>
                  <FontAwesomeIcon icon={faTwitter} className="white-text mr-md-5 mr-3 footer-element" color="white" size="lg" />
                </li>
                <li>
                  <FontAwesomeIcon icon={faInstagram} className="white-text mr-md-5 mr-3 footer-element" color="white" />
                </li>
              </ul>
            </Col>

          </Row>
          {/* </Container> */}
          {/* <div className="footer-copyright text-center py-3"></div> */}
          {/* <Link to="/">
            <FontAwesomeIcon icon={faFacebookF} className="white-text mr-md-5 mr-3 fa-2x" color="white" size="lg" />
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faTwitter} className="white-text mr-md-5 mr-3 fa-2x" color="white" size="lg" />
          </Link>

          <Link to="/">
            <FontAwesomeIcon icon={faLinkedin} className="white-text mr-md-5 mr-3 fa-2x" color="white" />
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faInstagram} className="white-text mr-md-5 mr-3 fa-2x" color="white" />
          </Link> */}





        </Container>
      </Navbar>
    )
  }
}
