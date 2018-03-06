import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearCart} from '../store'
import Ticket from 'react-icons/lib/fa/ticket'
import Tint from 'react-icons/lib/fa/tint'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="nav-group">
    <Link to="/">
      <h1>ra<Tint />nCheck</h1>
    </Link>
    <hr />
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
            </a>
            <Link to="/cart"><Ticket /> My Tickets </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}

          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart"><Ticket /> My Tickets </Link>

        </div>
      )}
    </nav>

  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
