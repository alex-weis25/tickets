import React, { Component } from 'react';
import Script from 'react-load-script'
import '../../secrets';
import { Link } from 'react-router-dom'
import axios from 'axios';


export default class CheckoutForm extends Component{
  constructor(props) {
    super(props)
    this.state = {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentSubmitted: false,
      paymentComplete: false,
      token: null,
      charge: null
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onScriptLoaded = this.onScriptLoaded.bind(this);
    this.onScriptError = this.onScriptError.bind(this);
  }

  onSubmit(event) {
    let self = this;
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentSubmitted: true, paymentError: null });
    // here is where we tokenize the credit card
    Stripe.card.createToken(event.target,
    function(status, response){
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false });
      }
      else {
        self.setState({ submitDisabled: false, token: response.id });
        // If it was suscessful, we are submitting the tokenzed card and order data to our API here
        axios.post('/api/creditAuth', response)
        .then(response => {
          self.setState({paymentComplete: true, charge: response.data})
        });
      }
     }
    );
  }
  onScriptLoaded() {
    if (!this.state.token) {
      Stripe.setPublishableKey(process.env.STRIPE_CLIENT_ID);
      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  }

  onScriptError() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  }


  render() {
      return (
      <div>
        <Script
        url="https://js.stripe.com/v2/"
        onCreate={this.handleScriptCreate}
        onError={this.onScriptError}
        onLoad={this.onScriptLoaded}
        />
        {this.state.stripeLoading ?
        (<h3>Loading...</h3>) :
        (<div>
          {!this.state.paymentComplete ?
          (<form onSubmit={this.onSubmit} >
            <span>{ this.state.paymentError }</span><br />
            <input name='cardNumber' type='text' data-stripe='number' placeholder='credit card number' /><br />
            <input name='cardExpMonth' type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
            <input name='cardExpYear' type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
            <input name='cardCVC' type='text' data-stripe='cvc' placeholder='cvc' /><br />
            <button
              disabled={this.state.submitDisabled}
              type='submit'
            >{this.state.paymentSubmitted ? 'Submitting Payment' : 'Purchase'}</button>
          </form>) :
          (<div>
            <h3>Purchase Complete</h3>
            <h3>Summary: </h3>
            <h4>${this.state.charge.amount/100} with {this.state.charge.source.brand} ending with {this.state.charge.source.last4}</h4>
            <Link to={`/`}>
              <h4>Go Home</h4>
            </Link>
          </div>)

          }
        </div>)
        }
      </div>
    );
  }
}
