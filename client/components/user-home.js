import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authPassword } from "../store";
import axios from "axios";
import UserReview from './reviews/userReview'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderLines: []
    };
  }

  componentDidMount() {
    this.fetchOrderLines();
  }

  fetchOrderLines = () => {
    const userId = this.props.userId;
    axios
      .get(`/api/tickets/${userId}`)
      .then(res => {
        console.log("order$#@", res.data);
        return res.data;
      })
      .then(orderLines => {
        this.setState({ orderLines });
      });
  };

  render() {
    const { email, name, hasPassword, handleSubmit, events } = this.props;
    const ticketIds = this.state.orderLines.map(orderline => {
      return orderline.ticketId;
    });
    const myEvents = events
      .map(event => {
        let bool = event.tickets.map(ticket => {
          if (ticketIds.indexOf(ticket.id) > -1) {
            return true;
          }
        });
        if (bool.indexOf(true) > -1) {
          return event.id;
        }
      })
      .filter(val => {
        if (val !== undefined) {
          return val;
        }
      });
      // const today = new Date();


    return (
      <div>
        <h2>Welcome, {name}!</h2>
        {!hasPassword ? (
          <form onSubmit={evt => handleSubmit(email, evt)} name={name}>
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
          <UserReview myEvents={myEvents} myTickets={ticketIds} />
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.firstName,
    hasPassword: state.user.hasPassword,
    userId: state.user.id,
    events: state.events.events
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(email, evt) {
      evt.preventDefault();
      const userInfo = {
        email: email,
        password: evt.target.password.value
      };
      dispatch(authPassword(userInfo, "signup"));
    },
    getOrderLines: userId => {
      axios.put("/api/tickets", userId).then(orderLines => {
        console.log("data is goood:", orderLines.data);
        return orderLines.data;
      });
    }
  };
};

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};


// Old JSX
// <div>
// <div>
//   <h3> Upcoming events:</h3>
//   {
//     myEvents && myEvents.map(event => {
//       if(today > )
//     })
//   }
// </div>
// <div id="add-review">
//   <h3> Order history: </h3>
// </div>
// <div>
//   <Link to="update cart link">View cart </Link>
// </div>
// <div>
//   <Link to="/">View all events </Link>
// </div>
// <div>
//   <Link to="update venue link">View all venues </Link>
// </div>
// <div>
//   <Link to="update events link">View events by date </Link>
// </div>
// </div>
