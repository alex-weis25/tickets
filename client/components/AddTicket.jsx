import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { thunkAddTicket } from '../store/tickets.js';
import AddOrEditTicketForm from './AddOrEditTicketForm.jsx';


class AddTicket extends Component{
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.nullIfBlank = this.nullIfBlank.bind(this);
  }

  onSubmit(ticket){
    ticket.preventDefault();
    const quantity = +ticket.target.quantity.value
    const price = +ticket.target.price.value
    const seat = 'GA'
    const eventId = this.props.eventId
    const createBody = {
      quantity: this.nullIfBlank(quantity),
      price: this.nullIfBlank(price),
      seat: this.nullIfBlank(seat),
      eventId: this.nullIfBlank(eventId)
    }
    this.props.thunkAddTicket(createBody);
  }

  // utility function
  nullIfBlank(formItem){
    if (formItem === '') return null;
    return formItem;
  }


  render(){
    return (
      <div>
         { this.props.shouldRedirect ?
          (
            <Redirect to={`/ticket/${this.props.ticket.id}`} />
          ) : (
            <AddOrEditTicketForm
              formType="Add Ticket"
              onSubmit={this.onSubmit}
              error={this.props.error}
            />
          )}
      </div>
    )
  }
}

const mapState = ({ tickets }) => {
  const ticket = tickets.selectedEvent;
  const error = tickets.errorMessages;
  const shouldRedirect = tickets.redirectOnSubmitComplete;
  return { ticket, error, shouldRedirect }
};
const mapDispatch = { thunkAddTicket }

export default connect(mapState, mapDispatch)(AddTicket);

