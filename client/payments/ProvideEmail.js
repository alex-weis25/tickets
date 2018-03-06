import React, { Component } from 'react';
import Script from 'react-load-script'
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';
import { addEmail, createCart } from '../store'


class ProvideEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstEmail: '',
      secondEmail: ''
    }
  }

  render() {
      const { onSubmit } = this.props
      let emailWarning = this.validateEmail(this.state.firstEmail) ? '' : "Email must be valid"
      let confirmWarning = this.state.firstEmail === this.state.secondEmail ? '' : "Emails must match"
      return (
        <form onSubmit={onSubmit}>
        <div>
          <ul> 
            <li><small>Email: {emailWarning ? <small style={{color:"red"}}>{emailWarning}</small> : <div/>}</small></li>
            <li><input name="firstEmail" 
            className="form-control"
            value={this.state.firstEmail}
            onChange={this.handleChange}
            placeholder='Provide Email'
            /></li>
            <li><input name="secondEmail" 
            className="form-control"
            value={this.state.secondEmail}
            onChange={this.handleChange}
            placeholder='Confirm Email'
            /></li>
          </ul>
        </div>
        <button type="submit" className="btn btn-block btn-primary"
        disabled={emailWarning || confirmWarning}>Submit Email</button>
        </form>       
    );
  }

  handleChange = evt => {
    let obj = {}
    let key = evt.target.name
    let email = evt.target.value
    obj[key] = email
    console.log(key,"...key")
    console.log(email,"...email")
    this.setState(obj);
    console.log(this.state,"..state")
  }

  validateEmail = email => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
}

const mapState = null;

const mapDispatch = (dispatch, ownProps) => ({
  onSubmit: (event, tickets) => {
    event.preventDefault();
    const email = event.target.secondEmail.value;
    dispatch(addEmail(email));
    dispatch(createCart({email}));
  }
});

export default withRouter(connect(mapState, mapDispatch)(ProvideEmail));