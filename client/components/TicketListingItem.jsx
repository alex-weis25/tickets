import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";


/**
 * COMPONENT
 */

export class TicketListingItem extends Component{
  render(){

    const { cartTickets, orderId, theEvents } = this.props
    const eventList = this.returnSortedEvents(cartTickets)
    // add message to client: no tickets in cart
    if (!theEvents) return <div />
    return (

      <div className="cartEventListing">
        {eventList.map(eventId => {
          let ticketEvent = theEvents.find(event => event.id === eventId)
          return (
            <div className="singleEventListing" key={eventId}>
              <div className="eventDetails">
                <div className="eventDate">
                  <div className="eventInformation">
                  <h2>Event Name: {ticketEvent.name}</h2>
                    <img src={ticketEvent.imgUrl} />
                    <h3>Event Date: {ticketEvent.date}</h3>
                    <h4>Event Description: {ticketEvent.description}</h4>
                  </div>
                </div>
              </div>
          </div>)
        })}
      </div>
    )
  }

  returnSortedEvents = allTickets => {
    let eventArr = []
    let uniqueArr = []
    allTickets.map(ticket => eventArr.push(ticket.eventId))
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
  const theEvents = events.events
  return { cartTickets, orderId, theEvents }
};

const MapDispatch = null

export default withRouter(connect(MapState, MapDispatch)(TicketListingItem));
