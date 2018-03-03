import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export function PaymentForm(props) {
  const { handleSubmit } = props

  return (
    <div>
      <div id="sq-ccbox">
        <form
          id="nonce-form"
          noValidate
          action="path/to/payment/processing/page"
          method="post"
        >
          Pay with a Credit Card
          <table>
            <tbody>
              <tr>
                <td>Card Number:</td>
                <td>
                  <div id="sq-card-number" />
                </td>
              </tr>
              <tr>
                <td>CVV:</td>
                <td>
                  <div id="sq-cvv" />
                </td>
              </tr>
              <tr>
                <td>Expiration Date: </td>
                <td>
                  <div id="sq-expiration-date" />
                </td>
              </tr>
              <tr>
                <td>Postal Code:</td>
                <td>
                  <div id="sq-postal-code" />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button
                    id="sq-creditcard"
                    className="button-credit-card"
                    onClick={handleSubmit} //"requestCardNonce(event)"
                  >
                    Pay with card
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="hidden" id="card-nonce" name="nonce" />
        </form>
      </div>

      <div id="sq-walletbox">
        Pay with a Digital Wallet
        <div id="sq-apple-pay-label" className="wallet-not-enabled">
          Apple Pay for Web not enabled
        </div>
        <button id="sq-apple-pay" className="button-apple-pay" />
        <div id="sq-masterpass-label" className="wallet-not-enabled">
          Masterpass not enabled
        </div>
        <button id="sq-masterpass" className="button-masterpass" />
      </div>
    </div>
  );
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(PaymentForm);
