import React, { Component } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone, faHome } from "@fortawesome/free-solid-svg-icons"

export default class Contact extends Component {
  render() {
    return (
      <div>
        <section className="resume-section p-4 p-lg-5 text-center" id="contact">
          <div className="my-auto">
            <h2 className="mb-4"> Contact US</h2>

            <ul className="fa-ul mb-4 ml-0">
              <li id="mail-address">
                {/* <!--               Replace with your email address --> */}
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 contact-icons" />support@nomeax.com
              </li>
              <li>
              <FontAwesomeIcon icon={faPhone} className="mr-2 contact-icons" />+48 XXXXX
            </li>
              <li>
              <FontAwesomeIcon icon={faHome} className="mr-2 contact-icons" />Lagos, Nigeria
            </li>
            </ul>

            <p>
              Use provided contact information or leave your message below and we will be back to you as soon as
              possible.
          </p>

            <form
              className="contact-form d-flex flex-column align-items-center"
              action="https://formspree.io/youremail@mail.com"
              method="POST"
            >
              <div className="form-group w-75">
                <input
                  type="name"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  required
                />
              </div>
              <div className="form-group w-75">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="name"
                  required
                />
              </div>

              <div className="form-group w-75">
                <textarea
                  className="form-control"
                  type="text"
                  placeholder="Message"
                  rows="7"
                  name="name"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-submit btn-info w-75">Submit</button>
            </form>
          </div>
        </section>
      </div>
    )
  }
}
