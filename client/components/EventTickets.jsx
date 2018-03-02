import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//import action creator for selectedTickets
import { addSelectedTickets, clearSelectedTickets, removeSelectedTickets } from '../store/selectedTickets.js';

//import thunk to be mapped
import { addTicketsToOrder, createCart } from '../store/cart.js';

export class EventTickets extends Component {

  render() {
    const { checkCart, orderId, userId, selectedTickets, cartTickets, eventTickets } = this.props
    if(!eventTickets) return <div/>;
    let evtTix = eventTickets
    let tickets = evtTix.filter(eventTicket => {
      let cartTix = cartTickets
      cartTix = cartTix.filter(cartTicket => {
        return cartTicket.id === eventTicket.id ? true : false;
      })
      return cartTix.length === 0;
    })
    return (
      <div>
        {tickets.length ? 
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
          <button type="submit">Add to cart</button>
        </form> 
        : <big>No tickets are available</big>} 
      </div>
    );
  }
}

const MapState = ({ events, user , cart, selectedTickets }) => {
  const cartTickets = cart.tickets
  const eventTickets = events.selectedEvent.tickets;
  const userId = user.id;
  const orderId = cart.orderId;
  return { userId, eventTickets, orderId, selectedTickets, cartTickets }
};
const MapDispatch = (dispatch, ownProps) => ({
  handleChange(event, eventTickets){
    const ticketId = +event.target.value;
    const ticket = eventTickets.filter(ticket => ticket.id === ticketId)
    event.target.checked ? dispatch(addSelectedTickets(ticket)) : dispatch(removeSelectedTickets(ticketId))
  },

  checkCart(userId, orderId, event, selectedTickets){
    event.preventDefault();
    orderId ? dispatch(addTicketsToOrder(orderId, selectedTickets)) : dispatch(createCart(userId, selectedTickets))
    dispatch(clearSelectedTickets())
  }
})

export default withRouter(connect(MapState, MapDispatch)(EventTickets));
