import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Link } from "react-router-dom";
import {removeTicketFromOrder} from '../store'

//import thunk to be mapped

//import component
import CartTotal from "./CartTotal.jsx"
import Checkout from '../payments/checkoutForm.js'
import TicketListingItem from './TicketListingItem.1.jsx'
import ProvideEmail from '../payments/ProvideEmail.js'



export class Cart extends Component {

  render() {
    const {user, orderId, cartTotal, cart} = this.props
    return (
      <div className='cartPage'>
        <div className='Review-Buy'>
          <h1 className='cartBanner'>REVIEW AND BUY</h1>
        </div>
        <div className='cartView'>
          <div className='cartItems'>
            <TicketListingItem/>
          </div>
          <div className='payment'>
            {cart.tickets.length>0 ? user.email ? <Checkout user={user} cartTotal={cartTotal} orderId={orderId}/> :
            <div><ul><li><big><Link to="/login">Login here</Link></big></li>
            <li><small>or provide Email to checkout</small></li></ul><ProvideEmail/></div> 
            : <ul><big>Add tickets to</big><br/><big>your cart :)</big></ul>}
            <hr className='cartDivider'/>
            <CartTotal total={cartTotal}/>
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
  return { user, orderId, cartTotal, cart }
}
const MapDispatch = dispatch => ({
  removeTickets: (tickets) => dispatch(removeTicketFromOrder(tickets))
});

export default withRouter(connect(MapState, MapDispatch)(Cart));
