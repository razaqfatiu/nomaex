import React, { Component } from 'react'
import { resetPassword } from '../../Store/actions/authAction';
import { connect } from 'react-redux';

class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newPassword: '',
      verifyPassword: '',
      error: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newPassword !== this.state.verifyPassword) {
      console.log(this.state)
      return this.setState({ error: 'password do not match' })
    }
    else {
      return this.props.resetPassword(this.state)
    }
  };

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
                  <form action="" className="justify-content-center" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label className="sr-only">New Password</label>
                      <input type="password" id="newPassword" onChange={this.handleChange} className="form-control" placeholder="New Password" />
                    </div>
                    <div className="form-group">
                      <label className="sr-only">Verify Password</label>
                      <input type="password" id="verifyPassword" onChange={this.handleChange} className="form-control" placeholder="Verify Password" />
                    </div>
                    <p className="text-danger"> {(this.state.error) ? this.state.error : ''}</p>
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


const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    authError: state.auth.authError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (cred) => dispatch(resetPassword(cred))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
