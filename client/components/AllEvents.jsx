import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import EventListingItem from './EventListingItem.jsx'

/**
 * COMPONENT
 */
function AllEvents(props){
  //const {events} = props
  console.log('in all events');
  const events = props.events;

  return (
    <div>
      <h1>All Events</h1>
      <div>
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
