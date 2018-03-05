// to do: create a react component to display tickets from store

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export class AllTickets extends Component {

  render() {

    const { tickets } = this.props;
    return (
      <div>
        <h1>All Tickets</h1>
        <div className="allTicketsList">
          {
            tickets.map(ticket => {
              return (
                <allTicketsList
                  key={ticket.id}
                  ticket={ticket}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({cart}) => {
  const tickets = cart.tickets
  return {tickets}
}

export default connect(mapState)(AllTickets)
