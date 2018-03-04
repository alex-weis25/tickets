import React, { Component } from 'react';
import Script from 'react-load-script'
import '../../secrets';
//const ReactDOMServer = require('react-dom/server');
import axios from 'axios';


export default class CheckoutForm extends Component{
  constructor(props) {
    super(props)
    this.state = {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onScriptLoaded = this.onScriptLoaded.bind(this);
    this.onScriptError = this.onScriptError.bind(this);
  }

  onSubmit(event) {
    var self = this;
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });
    console.log('submitted form');
    // send form here
    Stripe.card.createToken(event.target,
    function(status, response){
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false });
        console.log('Error: ', response.error);
      }
      else {
        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
        // make request to your server here!
        console.log('Woohoo suscessful: ', status);
        console.log('here is the response data we have access to!', response);
        axios.post('/api/creditAuth', response)
        .then(response => console.log('response from BE: ', response));
      }
     }
    );
  }
  onScriptLoaded() {
    if (!this.state.token) {
      Stripe.setPublishableKey(process.env.STRIPE_CLIENT_ID);
      console.log('STRIPE: ', Stripe);
      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  }

  onScriptError() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  }


  render() {
      console.log('current state: ', this.state)
      return (
      <div>
        <Script
        url="https://js.stripe.com/v2/"
        onCreate={this.handleScriptCreate}
        onError={this.onScriptError}
        onLoad={this.onScriptLoaded}
        />
        <form onSubmit={this.onSubmit} >
          <span>{ this.state.paymentError }</span><br />
          <input name="cardNumber" type='text' data-stripe='number' placeholder='credit card number' /><br />
          <input name="cardExpMonth" type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
          <input name="cardExpYear" type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
          <input name="cardCVV" type='text' data-stripe='cvc' placeholder='cvc' /><br />
          <input disabled={this.state.submitDisabled} type='submit' value='Purchase' />
        </form>
      </div>

    );
  }
}
