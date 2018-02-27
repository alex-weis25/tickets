import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import EventListingItem from './EventListingItem'

/**
 * COMPONENT
 */
export const AllEvents = (props) => {
  const {events} = props

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


