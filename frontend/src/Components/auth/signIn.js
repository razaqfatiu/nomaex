import React, { Component } from 'react';
import './signIn.scss';
import { signIn } from '../../Store/actions/authAction'
import { connect } from 'react-redux';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // errors: {}
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
    // this.handleValidation();
  };


  render() {

    const { errors } = this.state;
    const { auth, authError } = this.props
    console.log(auth)

    return (
      <div className="signin">
        <h1 className="welcome">WELCOME BACK</h1>
        <hr className="line" />
        
          <div className="form-div">
            <form className="text-center border rounded border-light p-5 bg-light" onSubmit={this.handleSubmit}>

              <h2 className="p-3">Nomeax</h2>

              {/* Email */}
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" className="form-control mb-4" placeholder="E-mail" onChange={this.handleChange} required  />

              {/* Password */}
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="form-control mb-4" placeholder="Password" onChange={this.handleChange} required />

              {/* error*/}

              <div className="d-flex justify-content-around">
                <div>
                  {/* Remember me */}
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember" />
                    <label className="custom-control-label" htmlFor="defaultLoginFormRemember">Remember me</label>
                  </div>
                </div>
                <div>
                  {/* Forgot password */}
                  <a href="">Forgot password?</a>
                </div>
              </div>

              {/* Sign in button */}
              <button className="btn btn-success btn-block my-4" type="submit" id="login">Sign in</button>
            </form>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer.payload,
    authError: state.authReducer.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred) => dispatch(signIn(cred))
  }
}



export default connect(mapStateToProps, mapDispatchToProps) (SignIn);
