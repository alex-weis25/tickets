import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

//import action creator for selectedTickets
import { addTickets, clearCart, removeTickets } from '../store/selectedTickets.js';

//import thunk to be mapped
import { fetchEvent } from "../store/events.js";
import { addTicketsToOrder, createCart } from '../store/cart.js';

export class SingleEvent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatchEvent();
  }

  render() {
    const { checkCart, selectedEvent, orderId, userId, selectedTickets } = this.props
    const venue = selectedEvent.venue;
    const tickets = selectedEvent.tickets;
    const event = selectedEvent;
    return (
      <div>
        <div className="single-title">
          <h1>{event.name}</h1>
          <img src={event.imgUrl} />
          <h3>{event.date}</h3>
          {venue && <h3>{venue.name}</h3>}
          <p>{event.description}</p>
        </div>
        <form onSubmit={(event) => checkCart(userId, orderId, event, selectedTickets)} className="tickets-display">
          <label>Available tickets:</label>
          {tickets &&
            tickets.map(ticket => {
              return (
                <div key={ticket.id} className="individual-ticket">
                  <li>
                    {ticket.seat} ${ticket.price} 
                    <input value={ticket.id}  onChange={(event) => this.props.handleChange(event, tickets)} type="checkbox" name="ticket" />
                  </li>
                </div>
              );
            })}
          <button disabled={selectedTickets.length < 1 ? "disabled" : "enabled"} type="submit">Add to cart</button>
        </form>
      </div>
    );
  }
}

const MapState = ({ events, user , cart, selectedTicketsStore }) => {
  const selectedEvent = events.selectedEvent;
  const selectedTickets = selectedTicketsStore.tickets;
  const userId = user.id;
  const orderId = cart.orderId;
  return { userId, selectedEvent, orderId, selectedTickets } 
};
const MapDispatch = (dispatch, ownProps) => ({
  dispatchEvent: () => dispatch(fetchEvent(+ownProps.match.params.id)),

  handleChange(event, eventTickets){
    const ticketId = +event.target.value;
    const ticket = eventTickets.filter(ticket => ticket.id === ticketId)
    event.target.checked ? dispatch(addTickets(ticket)) : dispatch(removeTickets(ticketId))
  },

  checkCart(userId, orderId, event, selectedTickets){
    event.preventDefault();
    orderId ? dispatch(addTicketsToOrder(orderId, selectedTickets)) : dispatch(createCart(userId, selectedTickets))
  }
})

export default withRouter(connect(MapState, MapDispatch)(SingleEvent));
