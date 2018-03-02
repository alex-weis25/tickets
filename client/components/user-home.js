import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import { authPassword } from "../store";

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email, name, hasPassword, handleSubmit } = props;
  console.log('password', email, name);
  return (
    <div>
      <h3>Welcome, {name}!</h3>
      {!hasPassword ? (
        <form onSubmit={(evt) => handleSubmit(email, evt)} name={name}>
          <div>
            <label htmlFor="password">
              <small>Password </small>
            </label>
            <input name="password" type="text" />
          </div>
          <div>
            <button type="submit">Submit password</button>
          </div>
          <p>Please submit a password to complete registration.</p>
        </form>
      ) : (
        <div>
          <div>
            <Link to="update cart link">View cart </Link>
          </div>
          <div>
            <Link to="/">View all events </Link>
          </div>
          <div>
            <Link to="update venue link">View all venues </Link>
          </div>
          <div>
            <Link to="update events link">View events by date </Link>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.firstName,
    hasPassword: state.user.hasPassword
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(email, evt) {
      evt.preventDefault();
      console.log('map dispatch email', email);
      const userInfo = {
        email: email,
        password: evt.target.password.value
      }
      dispatch(authPassword(userInfo, 'signup'))
    }
  }
}


export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
