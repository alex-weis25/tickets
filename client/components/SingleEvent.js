import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import EventReviews from './reviews/eventReview';

//import thunk to be mapped
import { fetchEvent } from "../store/events.js";

//import component
import EventTickets from './EventTickets.jsx'

export class SingleEvent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatchEvent();
  }

  render() {
    const { selectedEvent } = this.props
    const venue = selectedEvent.venue;
    const event = selectedEvent;
    const today = new Date();
    const eventDate = new Date(selectedEvent.date);
    // console.log("today: ", today, "eventDate: ", eventDate, "greater than: ", today < eventDate)
    console.log('props: ', this.props);
    return (
      <div>
        <div className="single-title">
          <h1>{event.name}</h1>
          <img src={event.imgUrl} />
          <h3>{event.date}</h3>
          {venue && <h3>{venue.name}</h3>}
          <p>{event.description}</p>
        </div>
          {
           eventDate < today ?
            (<div><EventTickets /></div>) :
          (<EventReviews props={selectedEvent} />)
          }
      </div>
    );
  }
}

const MapState = ({ events }) => {
  const selectedEvent = events.selectedEvent;
  return { selectedEvent }
};
const MapDispatch = (dispatch, ownProps) => ({
  dispatchEvent: () => dispatch(fetchEvent(+ownProps.match.params.id)),
})

export default withRouter(connect(MapState, MapDispatch)(SingleEvent));
