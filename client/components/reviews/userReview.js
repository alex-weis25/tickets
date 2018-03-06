import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import AddReview from "./addReview";

export const UserReview = props => {
  console.log("props on userReview: ", props)
  const allEvents = props.events.events;
  const myEventIds = props.myEvents;
  let pastEvents = [];
  let futureEvents = [];
  const myEvents = allEvents
    .filter(event => {
      if (myEventIds.indexOf(event.id) > -1) {
        return event;
      }
    })
    .map(event => {
      let eventDate = new Date(event.date);
      const currentDate = new Date();
      if (eventDate < currentDate) {
        pastEvents.push(event);
      } else {
        futureEvents.push(event);
      }
    });
  const today = new Date();

  console.log("past and future: ", pastEvents, futureEvents);
  return (
    <div>
      <h2> Upcoming Events </h2>
      {futureEvents.length > 0 ? (
        futureEvents.map(event => {
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
        })
      ) : (
        <div>No upcoming events</div>
      )}
      <h2> Past Events </h2>
      {pastEvents.length > 0 ? (
        <div>
          {pastEvents.map(event => {
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
          <AddReview myEvents={myEventIds} allEvents={allEvents} />{" "}
        </div>
      ) : (
        <div>No past events</div>
      )}
    </div>
  );
};

const MapState = ({ events }) => ({ events });

const MapDispatch = null;

export default withRouter(connect(MapState, MapDispatch)(UserReview));
