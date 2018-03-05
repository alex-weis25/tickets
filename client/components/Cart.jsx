import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

//import thunk to be mapped

//import component
import CartTotal from "./CartTotal.jsx"


export class Cart extends Component {

  render() {
    return (
      <div className='cartView'>
        <div className='cartItems'>
          {/* <TicketListingItem/> */}
        </div>
        <div className='payment'>
          {/* <Checkout/> */}
          <CartTotal/>
        </div>
      </div>
    );
  }
}

const MapState = null
const MapDispatch = null

export default withRouter(connect(MapState, MapDispatch)(Cart));