import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

//import thunk to be mapped

//import component
import CartTotal from "./CartTotal.jsx"
import Checkout from '../payments/checkoutForm.js'
import TicketListingItem from './TicketListingItem.jsx'
import ProvideEmail from '../payments/ProvideEmail.js'

export class Cart extends Component {

  render() {
    const {user, orderId, cartTotal} = this.props
    return (
      <div className='cartPage'>
        <div className='Review-Buy'>
          <h1>REVIEW AND BUY</h1>
        </div>
        <div className='cartView'>
          <div className='cartItems'>
            <TicketListingItem/>
          </div>
          <div className='payment'>
            {user.email ? <Checkout user={user} cartTotal={cartTotal} orderId={orderId}/> :
            <div><big>Login or provide Email to checkout</big><ProvideEmail/></div>}
            <CartTotal/>
          </div>
        </div>
      </div>
    );
  }
}

const MapState = ({user, cart}) => {
  const orderId = cart.orderId
  let cartTotal = 0
  cart.tickets.forEach(ticket => cartTotal+= +ticket.price)
  return { user, orderId, cartTotal }
}
const MapDispatch = null;

export default withRouter(connect(MapState, MapDispatch)(Cart));
