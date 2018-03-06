import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

export const UserReview = props => {
  const allEvents = props.events.events;
  const myEventIds = props.myEvents;
  const myEvents = allEvents.filter(event => {
    if (myEventIds.indexOf(event.id) > -1) {
      return event;
    }
  });
  const today = new Date();
  return (
    <div>
      <h2> Upcoming Events </h2>
      {myEvents &&
        myEvents.map(event => {
          let eventDate = new Date(event.date);
          if (eventDate > today) {
            return (
              <div key={event.id}>
                <Link to={`/event/${event.id}`}>{event.name}</Link>
                <h4>{event.date}</h4>
                <h4>{event.venue.name}</h4>
              </div>
            );
          }
        })}
      <h2> Past Events </h2>
      {myEvents &&
        myEvents.map(event => {
          let eventDate = new Date(event.date);
          if (eventDate < today) {
            return (
              <div key={event.id}>
                <Link to={`/event/${event.id}`}>{event.name}</Link>
                <h4>{event.date}</h4>
                <h4>{event.venue.name}</h4>
              </div>
            );
          }
        })}
    </div>
  );
};

const MapState = ({ events }) => ({ events });

const MapDispatch = null;

export default withRouter(connect(MapState, MapDispatch)(UserReview));
