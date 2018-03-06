import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
<<<<<<< HEAD
import moment from 'moment';
=======
import EventReviews from './reviews/eventReview';
>>>>>>> master

//import thunk to be mapped
import { fetchEvent } from "../store/events.js";

//import component
import EventTickets from './EventTickets.jsx'

export class SingleEvent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatchEvent();
  }

  render() {
    const { selectedEvent, users } = this.props
    const venue = selectedEvent.venue;
    const event = selectedEvent;
    const today = new Date();
    const eventDate = new Date(selectedEvent.date);
    // console.log("today: ", today, "eventDate: ", eventDate, "greater than: ", today < eventDate)
    console.log('props: ', this.props);
    return (
      <div className="single-event">
        <img src={event.imgUrl} />
        <div className="single-title">
          <div>
            <h1>{event.name}</h1>
          </div>
          <div>
            <h3>{moment(event.date).format('MMMM Do YYYY')} at {moment(event.date).format('h:mm A')}</h3>
            {venue && <h3>{venue.name}</h3>}
          </div>
        </div>
<<<<<<< HEAD
        <div className="buyTickets">
          <h4>{event.description}</h4>
          <EventTickets />
        </div>
=======
          {
           eventDate > today ?
            (<div><EventTickets /></div>) :
          (<EventReviews props={selectedEvent} users={users} />)
          }
>>>>>>> master
      </div>
    );
  }
}

const MapState = ({ events, users }) => {
  const selectedEvent = events.selectedEvent;
  return { selectedEvent, users }
};
const MapDispatch = (dispatch, ownProps) => ({
  dispatchEvent: () => dispatch(fetchEvent(+ownProps.match.params.id)),
})

export default withRouter(connect(MapState, MapDispatch)(SingleEvent));
