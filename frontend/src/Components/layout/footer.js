import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons"
import './footer.scss'

export default class Footer extends Component {
  render() {
    return (
      <div className="footer-page">
        {/* <!-- Footer --> */}
        <footer className="page-footer font-small cyan darken-3 ">

          {/* <!-- Footer Elements --> */}
          <div className="container">

            {/* <!-- Grid row--> */}
            <div className="row">

              {/* <!-- Grid column --> */}
              <div className="col-md-12 py-5 text-center">
                <div className="mb-5 flex-center">

                  {/* <!-- Facebook --> */}
                  <Link to="/">
                    <FontAwesomeIcon icon={faFacebookF} className="white-text mr-md-5 mr-3 fa-2x" color="white" size="lg" />
                  </Link>
                  {/* <!-- Twitter --> */}
                  <Link to="/">
                    <FontAwesomeIcon icon={faTwitter} className="white-text mr-md-5 mr-3 fa-2x" color="white" size="lg" />
                  </Link>

                  {/* <!--Linkedin --> */}
                  <Link to="/">
                    <FontAwesomeIcon icon={faLinkedin} className="white-text mr-md-5 mr-3 fa-2x" color="white" />
                  </Link>
                  {/* <!--Instagram--> */}
                  <Link to="/">
                    <FontAwesomeIcon icon={faInstagram} className="white-text mr-md-5 mr-3 fa-2x" color="white" />
                  </Link>

                </div>
              </div>
              {/* <!-- Grid column --> */}

            </div>
            {/* <!-- Grid row--> */}

          </div>
          {/* <!-- Footer Elements --> */}

          {/* <!-- Copyright --> */}
          <div className="footer-copyright text-center py-3">© 2020 NOMAEX
{/* <a href="https://mdbootstrap.com/"> MDBootstrap.com</a> */}
          </div>
          {/* <!-- Copyright --> */}

        </footer>
        {/* <!-- Footer --> */}
      </div>
    )
  }
}
