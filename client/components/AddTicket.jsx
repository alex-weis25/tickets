import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkAddTickets } from '../store';
import AddTicketForm from './AddTicketForm.jsx';


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
    this.props.thunkAddTickets(createBody);
    this.props.toggle();
  }

  // utility function
  nullIfBlank(formItem){
    if (formItem === '') return null;
    return formItem;
  }


  render(){
    return (
      <div>
        <AddTicketForm
          formType="Add Ticket"
          onSubmit={this.onSubmit}
          error={this.props.error}
        />
      </div>
    )
  }
}

const mapState = ({ events }) => {
  const event = events.selectedEvent;
  const error = events.errorMessages;
  return { event, error }
};
const mapDispatch = { thunkAddTickets }

export default connect(mapState, mapDispatch)(AddTicket);

