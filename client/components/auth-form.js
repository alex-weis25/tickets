import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { auth } from "../store";

/**
 * COMPONENT
 */
const LoginForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="loginForm">
      <form className="addEditForm" onSubmit={handleSubmit} name={name}>
        <div className="formItem">
          <label htmlFor="email">
            Email
          </label>
          <input name="email" type="text" placeholder="me@example.com"/>
        </div>
        <div className="formItem">
          <label htmlFor="password">
            Password
          </label>
          <input name="password" type="password" placeholder="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google" className="oAuth">
        <span>{displayName} with Google</span><img src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-256.png"/>
      </a>
    </div>
  );
};

const SignupForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="firstName">
            <small>First name</small>
          </label>
          <input name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">
            <small>Last name</small>
          </label>
          <input name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>

        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.user.error
  };
};

const mapDispatchForLogin = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const userInfo = {
        email: evt.target.email.value,
        password: evt.target.password.value
      }
      dispatch(auth(userInfo, formName));
    }
  };
};

const mapDispatchForSignup = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const userInfo = {
        email: evt.target.email.value,
        password: evt.target.password.value,
        firstName: evt.target.firstName.value,
        lastName: evt.target.lastName.value
      }
      dispatch(auth(userInfo, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatchForLogin)(LoginForm);
export const Signup = connect(mapSignup, mapDispatchForSignup)(SignupForm);

/**
 * PROP TYPES
 */
LoginForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};

SignupForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
