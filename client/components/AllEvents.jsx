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
      <form action="your-server-side-code" method="POST">
      <script
        src="https://checkout.stripe.com/checkout.js" className="stripe-button"
        data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
        data-amount="999"
        data-name="Stripe.com"
        data-description="Example charge"
        data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
        data-locale="auto"
        data-zip-code="true">
      </script>
    </form>
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
