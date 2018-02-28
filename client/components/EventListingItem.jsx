import React from 'react'
import { Link } from 'react-router-dom'


/**
 * COMPONENT
 */

export default function EventListingItem(props) {
  const {event} = props
  return (
    <div className="eventListing">
      <Link to={`event/${event.id}`}>
        <img src={event.imgUrl} />
        <div className="eventInfo">
          <div className="eventNameVenue">
            <h2>{event.name}</h2>
            <h4> at the </h4>
            <h2>{event.venue.name}</h2>
          </div>

          {
            event.tickets.length ?

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
