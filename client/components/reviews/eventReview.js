import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

export const EventReview = props => {
  const reviews = props.props.reviews;
  console.log("props on ER:", props.props.reviews);
  return (
    <div>
      <h1> Reviews </h1>
      {reviews &&
        reviews.map(review => {
          return (
            <div key={review.id}>
              <h3>User: {review.userId}</h3>
              <h3> Rating: {review.rating}</h3>
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
