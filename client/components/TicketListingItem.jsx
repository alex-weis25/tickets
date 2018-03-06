import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";


/**
 * COMPONENT
 */

export class TicketListingItem extends Component{


  render(){

    const { cartTickets, orderId, allEvents } = this.props
    const eventList = this.returnSortedEvents(cartTickets)
    // add message to client: no tickets in cart
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
                <div className='seats'><h3>SEATS</h3></div>
                <div className='seatInfo'> <ul>
                  <li>{tickets.length>1 ? <h4>{tickets.length} Tickets</h4> : <h4>1 Ticket</h4>}</li>
                  <li><h4>Seats : {seats}</h4></li>
                </ul></div>
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

const MapState = ({ cart, events }) => {
  const cartTickets = cart.tickets;
  const orderId = cart.orderId
  const allEvents = events.events
  return { cartTickets, orderId, allEvents }
};

const MapDispatch = null

export default withRouter(connect(MapState, MapDispatch)(TicketListingItem));
