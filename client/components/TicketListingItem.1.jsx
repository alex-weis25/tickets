import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

//import action creator for selectedTickets
import { addSelectedTickets, clearSelectedTickets, removeSelectedTickets } from '../store/selectedTickets.js';

//import thunk to be mapped
import { removeTicketFromOrder } from '../store/cart.js';

/**
 * COMPONENT
 */

export class TicketListingItem extends Component{

  componentWillUnmount(){
    this.props.unmountClear()
  }

  render(){
    const { cartTickets, orderId, allEvents, checkCart, user, selectedTickets } = this.props
    const eventList = this.returnSortedEvents(cartTickets)
  
    if (!eventList.length || !allEvents.length) return <h1>No Tickets in the cart</h1>
    return (
      <div className="cartEventListing">
        {eventList.map((eventId, index) => {
          let ticketEvent = allEvents.find(event => event.id === eventId)
          let tickets = cartTickets.filter(ticket => ticket.eventId === eventId)
          let seats = tickets.map(ticket => ticket.seat).join(', ')
          return (
            <div className={"singleEventListing" + index%2} key={eventId}>
              <div className="eventDetails">
                <div className="eventDate">
                    <h3>Event Date</h3>
                </div>
                <div className="eventInformation2">
                  <h2>{ticketEvent.name}</h2>
                  <h4>{ticketEvent.venue.name} - {ticketEvent.venue.city}, {ticketEvent.venue.state}</h4>
                </div>
              </div>
              <hr className='cartDivider'/>
              <div className='seatDetails'>
                <div className='seats'><h3>SEATS</h3> <button className='Email-btn' type="submit" form={eventId}>Remove from cart</button></div>
                <div className='seatInfo'> 
                  {tickets.length>1 ? <h4>{tickets.length} Tickets</h4> :<h4> 1 Ticket</h4>}
                  <form onSubmit={(event) => checkCart(user, orderId, event, selectedTickets, cartTickets)} className="tickets-display" id={eventId}>
                    {tickets.map(ticket=>
                      <h4 key={ticket.id} className="individual-ticket">SEAT: {ticket.seat   }      PRICE: ${ticket.price}
                      <input value={ticket.id} onClick={this.isChecked} onChange={(event) => this.props.handleChange(event, tickets)} type="checkbox" name="ticket" /><br/></h4>
                    )}
                 </form>
                </div>
                <div className='ticketImg'><img className='smallPic' src={ticketEvent.imgUrl} /></div>
              </div>
          </div>)
        })}
      </div>
    )
  }

  returnSortedEvents = allTickets => {
    let eventArr = []
    let uniqueArr = []
    allTickets.forEach(ticket => eventArr.push(ticket.eventId))
    eventArr = eventArr.sort((a, b) => a - b)
    for (let i = 0; i < eventArr.length; i++) {
      let event = eventArr[i]
      if (event !== event[i + 1] && !uniqueArr.includes(event)) {
        uniqueArr.push(event)
      }
    }
    return uniqueArr;
  }
}

const MapState = ({ cart, events, user, selectedTickets }) => {
  const cartTickets = cart.tickets;
  const orderId = cart.orderId
  const allEvents = events.events
  return { cartTickets, orderId, allEvents, selectedTickets, user }
};

const MapDispatch = (dispatch, ownProps) => ({
  handleChange(event, eventTickets){
    const ticketId = +event.target.value;
    const ticket = eventTickets.filter(ticket => ticket.id === ticketId)
    event.target.checked ? dispatch(addSelectedTickets(ticket)) 
    : dispatch(removeSelectedTickets(ticketId))
  },

  checkCart(user, orderId, event, selectedTickets, cartTickets){
    event.preventDefault();
    dispatch(removeTicketFromOrder(orderId, selectedTickets)) 
  },

  unmountClear(){
    dispatch(clearSelectedTickets())
  }
})

export default withRouter(connect(MapState, MapDispatch)(TicketListingItem));
