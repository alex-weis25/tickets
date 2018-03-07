import React from 'react'
import { Link } from 'react-router-dom'


/**
 * COMPONENT
 */

export default function EventListingItem(props) {
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

  // ----I can refactor this function to show up to date ticket quanity-----
  // filterTickets(sessionTix, orderTix){
  //   let tickets = sessionTix.filter(orderTicket => {
  //     let sessionTickets = orderTix
  //     sessionTickets = sessionTickets.filter(sessionTicket => {
  //       return orderTicket.id === sessionTicket.id
  //     })
  //     return sessionTickets.length === 0;
  //   })
  //   return tickets
  // }
  
}

