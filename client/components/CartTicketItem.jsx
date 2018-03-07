import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//import action creator for selectedTickets
import { addSelectedTickets, clearSelectedTickets, removeSelectedTickets } from '../store/selectedTickets.js';

//import thunk to be mapped
import { addTicketsToOrder, createCart } from '../store/cart.js';

export class CartTicketItem extends Component {
  constructor(props) {
    super(props)
    this.isChecked = this.isChecked.bind(this);
  }


  componentWillUnmount(){
    this.props.unmountClear()
  }

  isChecked(event){
    const parentDiv = event.target.parentNode.parentNode;
    const classes = [...parentDiv.classList]
    if(classes.find(htmlClass => htmlClass === 'selected')){
      parentDiv.classList.remove("selected")
    } else {
      parentDiv.classList.add("selected")
    }
  }

  render() {
    const { checkCart, orderId, selectedTickets, cartTickets, eventTickets, user } = this.props
    if(!eventTickets || ! cartTickets) return <div/>;
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
          <form onSubmit={(event) => checkCart(user, orderId, event, selectedTickets, cartTickets)} className="tickets-display">
            <div className="ticket-items">
              {tickets &&
                tickets.map(ticket => {
                  return (
                    <div key={ticket.id} className="individual-ticket">
                      <li>
                        <h4>SEAT: {ticket.seat}   PRICE: ${ticket.price}</h4>
                        <input className="cartCheckbox" value={ticket.id} onClick={this.isChecked} onChange={(event) => this.props.handleChange(event, tickets)} type="checkbox" name="ticket" />
                      </li>
                    </div>
                  );
                })}
            </div>
            <button type="submit">Add to cart</button>
          </form>
        : <big>No tickets are available</big>}
      </div>
    );
  }
}

const MapState = ({ events, user, cart, selectedTickets }) => {
  const cartTickets = cart.tickets
  const eventTickets = events.selectedEvent.tickets;
  const orderId = cart.orderId;
  return { eventTickets, orderId, selectedTickets, cartTickets, user }
};
const MapDispatch = (dispatch, ownProps) => ({
  handleChange(event, eventTickets){
    const ticketId = +event.target.value;
    const ticket = eventTickets.filter(ticket => ticket.id === ticketId)
    event.target.checked ? dispatch(addSelectedTickets(ticket)) : dispatch(removeSelectedTickets(ticketId))
  },

  checkCart(user, orderId, event, selectedTickets, cartTickets){
    event.preventDefault();
    cartTickets.length ? dispatch(addTicketsToOrder(orderId, selectedTickets)) : dispatch(createCart(user, selectedTickets))
  },

  unmountClear(){
    dispatch(clearSelectedTickets())
  }
})

export default withRouter(connect(MapState, MapDispatch)(CartTicketItem));
