import React, { Component } from 'react';
import './signIn.scss';
import { signIn } from '../../Store/actions/authAction'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../layout/Loading';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      // errors: {}
    };
  }

  componentDidMount() {

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
    const { auth, authError, loading } = this.props
    // let auth = this.props.auth;
    // console.log(auth, loading)
    // if(loading === false) {
    //   auth = this.props.auth
    // }
    const { data } = auth.payload


    // console.log()
    // auth.map(e => console.log(e.data))
    // console.log(auth.payload.status);
    // if(auth.payload.status === 200 ) return <Redirect to="/admin" />
    return (
      <div className="signin">
        <h1 className="welcome">WELCOME BACK</h1>
        <hr className="line" />

        <div className="form-div">
          <form className="text-center border rounded border-light p-5 bg-light" onSubmit={this.handleSubmit}>

            <h2 className="p-3">Nomeax</h2>

            {/* Email */}
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" className="form-control mb-4" placeholder="E-mail" onChange={this.handleChange} required />

            {/* Password */}
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control mb-4" placeholder="Password" onChange={this.handleChange} required />

            {/* error*/}

            <div className="d-flex justify-content-around">
              <div>
                {/* Remember me */}
                {/* <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember" />
                  <label className="custom-control-label" htmlFor="defaultLoginFormRemember">Remember me</label>
                </div> */}
              </div>
              <div>
                {/* Forgot password */}
                <a href="/forgot-password">Forgot password?</a>
              </div>
            </div>

            {/* Sign in button */}
            <button className="btn btn-success btn-block my-4" type="submit" id="login">Sign in</button>
            <p>Do not have an account?
                <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    );
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
    signIn: (cred) => dispatch(signIn(cred))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
