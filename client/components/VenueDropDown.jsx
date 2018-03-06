import React, { Component } from "react";
import axios from 'axios'

export default class VenueDropDown extends Component{
  constructor(props) {
    super(props);
    this.state = {
      venues: []
    }
  }
  componentDidMount() {
    axios.get('/api/venues')
      .then(res =>
        this.setState({venues: res.data}))
      .catch(err => console.log(err))
  }

  render(){
    return (
      <select
      name="venueId"
      type="number"
      defaultValue={this.state.venues.venueId}
    >
      {this.state.venues.map(venue => {
        return <option key={venue.id} value={venue.id}>{venue.name}</option>
      })}
    </select>
    )
  }
}
