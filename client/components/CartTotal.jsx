import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

export class CartTotal extends Component {

  render() {
    const { total, numTix } = this.props
    return (
      <ul className="cartTotal">
        <h3>ORDER TOTAL</h3>
        <h4>{numTix} {numTix!==1 ? 'Tickets' : 'Ticket'}</h4>
        <h1>${total}</h1>
      </ul>
    );
  }
}

const MapState = ({cart}) => {
    const numTix = cart.tickets.length;
    return { numTix }
}

const MapDispatch = null

export default withRouter(connect(MapState, MapDispatch)(CartTotal));