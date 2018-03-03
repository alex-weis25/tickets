mport React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

/**
 * COMPONENT
 */

export class TicketListingItem extends Components{
  render(){

    const {event} = props
    const venueName = event.venue ? event.venue.name : '';
    const tickets = event.tickets ? event.tickets : [];
    return (
      <div className="eventListing">
        <Link to={`event/${event.id}`}>
          <img src={event.imgUrl} />
          <div className="eventInfo">
            <div className="eventNameVenue">
              <h2>{event.name}</h2>
              <h4> at the </h4>
              <h2>{venueName}</h2>
            </div>

            {
              tickets.length ?

              (<div className="eventTickets">
                {event.tickets.length} Tickets Remaining
              </div>) :
              ( <div className="SoldOut"> SOLD OUT! </div>)
            }
          </div>
        </Link>
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

const MapState = ({ events }) => {
  const selectedEvent = events.selectedEvent;
  return { selectedEvent }
};
const MapDispatch = (dispatch, ownProps) => ({
  dispatchEvent: () => dispatch(fetchEvent(+ownProps.match.params.id)),
})

export default withRouter(connect(MapState, MapDispatch)(SingleEvent));
