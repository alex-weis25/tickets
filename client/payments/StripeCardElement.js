import React, { Component } from 'react';
const HtmlToReact = require('html-to-react');
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();


export default class StripeCardElement extends Component{
  constructor(props) {
    super(props)
  }


  componentWillReceiveProps(){
    if(this.props.stripe){
      let elements = this.props.stripe.elements();
      let card = elements.create('card');
      this.CardElement = htmlToReactParser.parse(card)
    }
  }


  render() {
      return (
        <div>
          {this.props.ready ? this.StripeCardElement : null}
        </div>
      );
  }
}
