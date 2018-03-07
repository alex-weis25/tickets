import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

export const EventReview = props => {
  const reviews = props.props.reviews;
  const users = props.users;
  return (
    <div>
      <h1> Reviews </h1>
      {reviews &&
        reviews.map(review => {
          return (
            <div key={review.id}>
            {
                users && users.map(user => {
                  if (user.id === review.userId){
                     return (
                      <h3 key={user.id}>{user.firstName} {user.lastName}
                      </h3>
                     )
                  }
                })
              }
              <h4> Rating: {review.rating}</h4>
              <p> Review: {review.content} </p>
            </div>
          );
        })}
    </div>
  );
};

const MapState = ({ selectedEvent }) => ({ selectedEvent });

const MapDispatch = null;

export default withRouter(connect(MapState, MapDispatch)(EventReview));
