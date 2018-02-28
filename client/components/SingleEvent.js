import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

//import thunk to be mapped
import { fetchEvent } from "../store/events.js";

export class SingleEvent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    const dispatchEvent = this.props.fetchEvent;
    dispatchEvent(id);
  }

  onSubmit = event => {
    event.preventDefault();
    console.log("event target", event.target);
  };

  render() {
    const event = this.props.events.selectedEvent;
    const venue = event.venue;
    const tickets = event.tickets;
    return (
      <div>
        <div className="single-title">
          <h1>{event.name}</h1>
          <img src={event.imgUrl} />
          <h3>{event.date}</h3>
          {venue && <h3>{venue.name}</h3>}
          <p>{event.description}</p>
        </div>
        <form onSubmit={this.onSubmit} className="tickets-display">
          <label>Available tickets:</label>
          {tickets &&
            tickets.map(ticket => {
              return (
                <div key={ticket.id} className="individual-ticket">
                  <li>
                    {ticket.seat} ${ticket.price}
                    <input value='checked' type="checkbox" name={ticket.id} />
                  </li>
                </div>
              );
            })}
          <button type="btn-add-to-cart">Add to cart</button>
          <button type="btn-checkout">Checkout!</button>
        </form>
      </div>
    );
  }
}

const MapState = ({ events, selectedEvent }) => ({ events, selectedEvent });
const MapDispatch = { fetchEvent };

export default withRouter(connect(MapState, MapDispatch)(SingleEvent));
