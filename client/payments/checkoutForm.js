import React, { Component } from 'react';
//var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;
import Script from 'react-load-script'
import {CardElement} from 'react-stripe-elements';
const ReactDOMServer = require('react-dom/server');
//import StripeCardElement from './StripeCardElement'
//import stripe from 'stripe'
//const Stripe = stripe('sk_test_wesoYcb7FfZgFpBAklvkn7pm')
const HtmlToReact = require('html-to-react');
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();
//const reactElement = htmlToReactParser.parse(htmlInput);


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
    console.log('Stripe in on submit', Stripe)
    console.log('Stripe dot card', Stripe.card)
    console.log('Stripe dot card dot createtoken', Stripe.card, Stripe.card.createToken)
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
      }
     }
    );
  }
  onScriptLoaded() {
    if (!this.state.token) {
      // Put your publishable key here
      //this.stripe = Stripe('pk_test_hIw9csAxy5dtOikdK1WQUVXp');
      this.stripe = Stripe.setPublishableKey('pk_test_hIw9csAxy5dtOikdK1WQUVXp');
      //this.elements = this.stripe.elements();
      //Stripe.setPublishableKey('pk_test_hIw9csAxy5dtOikdK1WQUVXp');
      console.log('STRIPE: ', Stripe);
      this.setState({ stripeLoading: false, stripeLoadingError: false });
      // let card = this.elements.create('card');
      // let reactElement = htmlToReactParser.parse(card)
      // this.CardElement = ReactDOMServer.renderToStaticMarkup(reactElement);
      // console.log('Card Element', this.CardElement);
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
            {/* {this.CardElement} */}
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
