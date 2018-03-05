import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

export class CartTotal extends Component {

  render() {
    const { total } = this.props
    return (
      <div className="cartTotal">
        <h3>ORDER TOTAL</h3>
        <h1>${total}</h1>
      </div>
    );
  }
}

const MapState = ({cart}) => {
    let total = 0
    cart.tickets.forEach(ticket => total+= +ticket.price)
    return { total }
}

const MapDispatch = null

export default withRouter(connect(MapState, MapDispatch)(CartTotal));