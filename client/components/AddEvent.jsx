import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { thunkAddEvent } from '../store/events.js';
import AddOrEditEventForm from './AddOrEditEventForm.jsx';


class AddEvent extends Component{
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.nullIfBlank = this.nullIfBlank.bind(this);
  }

  onSubmit(event){
    event.preventDefault();
    const date = event.target.date.value.split('-');
    const time = event.target.time.value;
    const createBody = {
      action: 'addEvent',
      data: {
        name: this.nullIfBlank(event.target.name.value),
        date: new Date(date.join(' ') + ' ' + time),
        duration: event.target.duration.value,
        description: this.nullIfBlank(event.target.description.value),
        imgUrl: this.nullIfBlank(event.target.imgUrl.value),
        venueId: 1
      }
    }
    this.props.thunkAddEvent(createBody);
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
            <Redirect to={`/event/${this.props.event.id}`} />
          ) : (
            <AddOrEditEventForm
              formType="Add Event"
              onSubmit={this.onSubmit}
              error={this.props.error}
            />
          )}
      </div>


    )
  }
}

const mapState = ({ events }) => {
  const event = events.selectedEvent;
  const error = events.errorMessages;
  const shouldRedirect = events.redirectOnSubmitComplete;
  return { event, error, shouldRedirect }
};
const mapDispatch = { thunkAddEvent }

export default connect(mapState, mapDispatch)(AddEvent);
