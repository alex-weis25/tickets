import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import EventListingItem from './EventListingItem.jsx'

/**
 * COMPONENT
 */
function AllEvents(props){
  const events = props.events;

  return (
    <div>
      <h1>All Events</h1>
      <div className="allEventsList">
        {
          events.map(event => {
            return (
              <EventListingItem
                key={event.id}
                event={event}
              />
            )
          })
        }

      </div>
    </div>

  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    events: state.events.events
  }
}

export default connect(mapState)(AllEvents)
