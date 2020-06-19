import React, { Component } from 'react'

export default class ResetPassword extends Component {
  render() {
    return (
      <section id="cover" className="min-vh-100">
        <div id="cover-caption">
          <div className="container">
            <div className="row text-dark">
              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                <h3 className=" py-2">Forgot your password?</h3>
                <p>Enter your email address to reset your password. You may need to check your spam folder or unblock no-reply@nomaex.com.</p>
                <div className="px-2">
                  <form action="" className="justify-content-center">
                    <div className="form-group">
                      <label className="sr-only">Name</label>
                      <input type="email" className="form-control" placeholder="user@test.com" />
                    </div>

                    <button type="submit" className="btn btn-success btn-lg">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
