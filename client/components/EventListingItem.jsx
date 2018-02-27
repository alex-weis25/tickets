import React from 'react'
import { Link } from 'react-router-dom'


/**
 * COMPONENT
 */

export default function EventListingItem(props) {
  const {event} = props

  return (
    <div>
      <Link to={`event/${event.id}`}>

        <h2>
          {event.name}
        </h2>
        <h2>
          {event.venue.name}
        </h2>
        {
          event.ticket.length ?

          (<h2>
            {event.ticket.length} Tickets Remaining
          </h2>) :
          ( <h2> SOLD OUT! </h2>)
        }
      </Link>
    </div>

  )
}
