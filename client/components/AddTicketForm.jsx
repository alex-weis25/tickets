import React, { Component } from 'react';
import Validate, {ValidationItems, ValidationButton} from 'react-real-time-form-validation';
const formValidation = new Validate();


export default class AddTicketForm extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    formValidation.onChangeStatus(event.target.name, event.target.value);
  }

  componentDidMount(){
    formValidation.createValidation('quantity', 'notBlank', 'Quantity cannot be blank');
    formValidation.createValidation('quantity', (quant) => quant > 0, 'Quantity must be more than zero');
    formValidation.createValidation('price', 'notBlank', 'Price cannot be blank');
    formValidation.createValidation('price', (price) => price > 0, 'Price must be more than zero');
  }

  componentWillUnmount(){
    formValidation.clearStatus();
  }

  render(){
    return (
      <form onSubmit={this.props.onSubmit} id={this.props.formType} className="addEditForm">
        <div className="formItem">
          <legend>Quantity:</legend>
          <input
            name="quantity"
            type="number"
            className="form-like large-font"
            placeholder=""
            onChange={this.onChange}
          />
          <ValidationItems name="quantity" />
        </div>
        <div className="formItem">
          <legend>Price (In Dollars)</legend>
          <input
            name="price"
            type="number"
            className="form-like large-font"
            onChange={this.onChange}
          />
          <ValidationItems name="price"/>
        </div>
        <ValidationButton name={this.props.formType} />
        {this.props.error.map((message, idx) => <div key={idx} >{message}</div>)}
      </form>
    )
  }
}
