import React, { Component } from 'react';
//var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;
import Script from 'react-load-script'
//import stripe from 'stripe'
//const Stripe = stripe('sk_test_wesoYcb7FfZgFpBAklvkn7pm')


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
    // send form here
    let card = this.elements.create('card');
    console.log('card: ', card);
    console.log('event.target: ', event.target);
    this.stripe.createToken({
      number: +event.target.cardNumber.value,
      cvc: +event.target.cardCVV.value,
      exp_month: +event.target.cardExpMonth.value,
      exp_year: +event.target.cardExpYear.value
    })
     .then((status, response) => {
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false });
      }
      else {
        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
        // make request to your server here!
      }
     }
    );
  }
  onScriptLoaded() {
    if (!this.state.token) {
      // Put your publishable key here
      this.stripe = Stripe('pk_test_hIw9csAxy5dtOikdK1WQUVXp');
      this.elements = this.stripe.elements();
      //Stripe.setPublishableKey('pk_test_hIw9csAxy5dtOikdK1WQUVXp');

      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  }

  onScriptError() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  }


  render() {
    // if (this.state.stripeLoading) {
    //   return <div>Loading</div>;
    // }
    // else if (this.state.stripeLoadingError) {
    //   return <div>Error</div>;
    // }
    // else if (this.state.paymentComplete) {
    //   return <div>Payment Complete!</div>;
    // }
    // else {
      return (
      <div>
        <Script
        url="https://js.stripe.com/v3/"
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





// var PaymentForm = React.createClass({
//   mixins: [ ReactScriptLoaderMixin ],

//   getInitialState: function() {
//     return {
//       stripeLoading: true,
//       stripeLoadingError: false,
//       submitDisabled: false,
//       paymentError: null,
//       paymentComplete: false,
//       token: null
//     };
//   },

//   getScriptURL: function() {
//     return 'https://js.stripe.com/v2/';
//   },

//   onScriptLoaded: function() {
//     if (!PaymentForm.getStripeToken) {
//       // Put your publishable key here
//       Stripe.setPublishableKey('pk_test_hIw9csAxy5dtOikdK1WQUVXp');

//       this.setState({ stripeLoading: false, stripeLoadingError: false });
//     }
//   },

//   onScriptError: function() {
//     this.setState({ stripeLoading: false, stripeLoadingError: true });
//   },

//   onSubmit: function(event) {
//     var self = this;
//     event.preventDefault();
//     this.setState({ submitDisabled: true, paymentError: null });
//     // send form here
//     Stripe.createToken(event.target, function(status, response) {
//       if (response.error) {
//         self.setState({ paymentError: response.error.message, submitDisabled: false });
//       }
//       else {
//         self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
//         // make request to your server here!
//       }
//     });
//   },

//   render: function() {
//     if (this.state.stripeLoading) {
//       return <div>Loading</div>;
//     }
//     else if (this.state.stripeLoadingError) {
//       return <div>Error</div>;
//     }
//     else if (this.state.paymentComplete) {
//       return <div>Payment Complete!</div>;
//     }
//     else {
//       return (<form onSubmit={this.onSubmit} >
//         <span>{ this.state.paymentError }</span><br />
//         <input type='text' data-stripe='number' placeholder='credit card number' /><br />
//         <input type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
//         <input type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
//         <input type='text' data-stripe='cvc' placeholder='cvc' /><br />
//         <input disabled={this.state.submitDisabled} type='submit' value='Purchase' />
//       </form>);
//     }
//   }
// });

// module.exports = PaymentForm;
