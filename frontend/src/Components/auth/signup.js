/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './signIn.scss';
import { Link } from 'react-router-dom';
import { signUp } from '../../Store/actions/authAction';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address1: '',
      address2: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      errors: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
    
  };

  validatePassword() {
    const { password, confirmPassword } = this.state
    if (password !== confirmPassword) {
      return this.setState({ errors: 'Password do not match' });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.validatePassword()
    this.props.signUp(this.state);
  };


  render() {
    const { auth, authError } = this.props;
    const { errors } = this.state
    // console.log(auth);

    return (
      <div className="signin">

        <h1 className="welcome">WELCOME to Nomeax</h1>
        <hr className="line" />

        <div className="form-div">
          {/* Default form register */}
          <form className="text-center border border-light p-5 rounded bg-light" onSubmit={this.handleSubmit}>

            <h3 className="p-3">Create User Account</h3>

            <div className="form-row mb-4">
              <div className="col">
                {/* First name */}
                <label htmlFor="firstName">First Name: </label>
                <input type="text" id="firstName" name="firstName" className="form-control" placeholder="First name" required pattern=".{3,}" title="First name should have at least 3 characters" onChange={this.handleChange} />
              </div>
              <div className="col">
                {/* Last name */}
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" id="lastName" name="lastName" className="form-control" placeholder="Last name" required pattern=".{3,}" title="Last name should have at least 3 characters" onChange={this.handleChange} />
              </div>
            </div>

            {/* E-mail */}
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" className="form-control mb-4" placeholder="E-mail" required onChange={this.handleChange} />


            <div className="form-row mb-4">
              <div className="col">
                {/* First name */}
                <label htmlFor="address1"> Address Line 1:  </label>
                <input type="text" id="address1" className="form-control" name="address1" placeholder="Address 1" required pattern=".{10,}" title="Address should have at least 10 characters" onChange={this.handleChange} />
              </div>
              <div className="col">
                {/* Last name */}
                <label htmlFor="address2">Address Line 2: </label>
                <input type="text" id="address2" className="form-control" name="address2" placeholder="Address 2" pattern=".{3,}" title="Address 2 should have at least 3 characters" onChange={this.handleChange} />
              </div>
            </div>

            <div className="form-row mb-4">
              <div className="col">
                {/* First name */}
                <label htmlFor="state">State: </label>
                <input type="text" id="state" className="form-control" name="state" placeholder="State" required pattern=".{5,}" title="State should have at least 5 characters" onChange={this.handleChange} />
              </div>
              <div className="col">
                {/* Last name */}
                <label htmlFor="phoneNumber">Contact Number: </label>
                <input type="tel" id="phoneNumber" className="form-control" name="phoneNumber" placeholder="Phone" required pattern=".{11,11}" title="Phone Number should have just 11 Digits" onChange={this.handleChange} />
              </div>
            </div>

            {/* Phone number */}


            {/* Password */}
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" className="form-control" placeholder="Password" required
              pattern=".{8,}" aria-describedby="defaultRegisterFormPasswordHelpBlock" onChange={this.handleChange} />
            <small id="defaultRegisterFormPasswordHelpBlock" className="form-text text-muted mb-4">
              At least 8 characters
            </small>

            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password" required
              pattern=".{8,}" aria-describedby="defaultRegisterFormPasswordHelpBlock" onChange={this.handleChange} />
            <br />

            <label htmlFor="errror" className="text-danger">
              { errors ? errors : '' }
            </label>


            {/* Sign up button */}
            <button className="btn btn-success my-4 btn-lg btn-block" type="submit">Sign Up</button>

            {/* Sign In */}
            <p>Already have an account?
                <Link to="/signin">Sign In</Link>
            </p>
          </form>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state,
    authError: state.authReducer.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (cred) => dispatch(signUp(cred))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
