import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

export class NavTotal extends Component {

  render() {
    const { cartTotal, numTix } = this.props
    return (
        <small className='navTotal'>{numTix} {numTix!==1 ? 'Tickets' : 'Ticket'}<br/>
        ${cartTotal}</small>
    );
  }
}

const MapState = ({cart}) => {
    const numTix = cart.tickets.length;
    let cartTotal = 0;
    cart.tickets.forEach(ticket => cartTotal+= +ticket.price)
    return { numTix, cartTotal }
}

const MapDispatch = null

export default withRouter(connect(MapState, MapDispatch)(NavTotal));