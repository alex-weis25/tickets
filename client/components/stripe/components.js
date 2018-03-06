import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Elements,
  injectStripe,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  PaymentRequestButtonElement
} from "react-stripe-elements";

export class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: []
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("event item", event);
  }


  render() {
    console.log(CardElement);
    return (
      <Elements>
        <div>
          <h3> Testing elements! </h3>
          <form onSubmit={this.handleSubmit}>

            <CardElement />
            </form>
        </div>
      </Elements>
    );
  }
}

// <PaymentRequestButtonElement />
// <CardNumberElement />
// <CardExpiryElement />
// <CardCVCElement />
// <PostalCodeElement />

const mapState = null;
const mapDispatch = null;

export default injectStripe(Payments);
