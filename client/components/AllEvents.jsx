import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const AllEvents = (props) => {
  const {events} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
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
