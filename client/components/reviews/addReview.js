import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';

export class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      content: '',
      eventId: '',
      userId: this.props.user.id
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const eventToSubmit = {
      rating: this.state.rating,
      content: this.state.content,
      eventId: this.state.eventId,
      userId: this.state.userId
    }
    axios.post('/api/reviews', eventToSubmit)
    .then(results => {
    })
  };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const myEvents = this.props.myEvents;
    const allEvents = this.props.events.events;
    return (
      <div>
        <h2> Add review </h2>
        <form className="submit-review-form" onSubmit={this.onSubmit}>
        <select value={this.state.eventId}  onChange={this.handleChange} name="eventId">
        { myEvents.map(event => {
          return (
            <option key={event} value={event}>{allEvents[event].name}</option>
          )
        })}
        </select>
        <select value={this.state.rating}  onChange={this.handleChange} name="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input
            name="content"
            className="form-control"
            value={this.state.content}
            onChange={this.handleChange}
            placeholder="add content"
          />
          <button type="submit" value="submit">Submit review</button>
        </form>
      </div>
    );
  }
}

const MapState = ({ events, user }) => ({ events, user });

const MapDispatch = null;

export default withRouter(connect(MapState, MapDispatch)(AddReview));
