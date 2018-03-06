import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import moment from 'moment';
import EventReviews from './reviews/eventReview';
import AddTicket from './AddTicket.jsx'

//import thunk to be mapped
import { fetchEvent } from "../store/events.js";

//import component
import EventTickets from './EventTickets.jsx'

export class SingleEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddTickets: false
    }
    this.toggleAddTicket = this.toggleAddTicket.bind(this);
  }

  componentDidMount() {
    this.props.dispatchEvent();
  }

  toggleAddTicket(){
    let status = this.state.showAddTickets;
    this.setState({showAddTickets: !status})
  }

  render() {
    const { selectedEvent, users } = this.props
    const venue = selectedEvent.venue;
    const event = selectedEvent;
    const today = new Date();
    const eventDate = new Date(selectedEvent.date);
    const admin = this.props.user.adminStatus
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
          {
           eventDate > today ?
            (<div>
              {admin && !this.state.showAddTickets && (
                <button type="button" onClick={this.toggleAddTicket}>+ Add Tickets</button>
              )}
              {this.state.showAddTickets && (
                <AddTicket eventId={+this.props.match.params.id} toggle={this.toggleAddTicket}/>
              )}
              <div className="buyTickets">
                <h4>{event.description}</h4>
                <EventTickets />
              </div>
            </div>
              ) :
          (<EventReviews props={selectedEvent} users={users} />)
          }
      </div>
    );
  }
}

const MapState = ({ events, users, user }) => {
  const selectedEvent = events.selectedEvent;
  return { selectedEvent, users, user }
};
const MapDispatch = (dispatch, ownProps) => ({
  dispatchEvent: () => dispatch(fetchEvent(+ownProps.match.params.id)),
})

export default withRouter(connect(MapState, MapDispatch)(SingleEvent));
