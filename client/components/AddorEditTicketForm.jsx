import React, { Component } from 'react';
import VenueDropDown from './VenueDropDown.jsx';
import Validate, {ValidationItems, ValidationButton} from 'react-real-time-form-validation';
const formValidation = new Validate();


export default class AddOrEditEventForm extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
  }

  onChange(event){
    formValidation.onChangeStatus(event.target.name, event.target.value);
  }

  componentDidMount(){
    formValidation.createValidation('name', 'notBlank', 'Name cannot be blank');
    formValidation.createValidation('date', 'notBlank', 'Must select a date');
    formValidation.createValidation('time', 'notBlank', 'Must select a time');
    formValidation.createValidation('duration', (duration) => duration > 0, 'Duration must be more than zero');
    formValidation.createValidation('description', 'notBlank', 'Must add a description');
  }

  componentWillUnmount(){
    formValidation.clearStatus();
  }

  render(){
    return (
      <form onSubmit={this.props.onSubmit} id={this.props.formType}>
        <div className="formItem">
          <legend>Name:</legend>
          <input
            name="name"
            type="text"
            className="form-like large-font"
            placeholder="eg: Awesome Concert"
            defaultValue={this.props.name}
            onChange={this.onChange}
          />
          <ValidationItems name="name" />
        </div>
        <div className="formItem">
          <legend>Date:</legend>
          <input
            name="date"
            type="date"
            className="form-like large-font"
            placeholder="12/31/2019"
            defaultValue={this.props.date}
            onBlur={this.onChange}
          />
          <ValidationItems name="date"/>
        </div>
        <div className="formItem">
          <legend>Start Time:</legend>
          <input
            name="time"
            type="time"
            className="form-like large-font"
            placeholder="9:30 PM"
            defaultValue={this.props.startTime}
            onChange={this.onChange}
          />
          <ValidationItems name="time"/>
        </div>
        <div className="formItem">
          <legend>Duration (Hours):</legend>
          <input
            name="duration"
            type="number"
            className="form-like large-font"
            placeholder="3"
            defaultValue={this.props.duration}
            onChange={this.onChange}
          />
          <ValidationItems name="duration" />
        </div>
        <div className="formItem">
          <legend>Description:</legend>
          <textarea
            name="description"
            form={this.props.formType}
            className="form-like large-font"
            placeholder="http://www.interesting.com"
            defaultValue={this.props.description}
            onBlur={this.onChange}
          />
          <ValidationItems name="description" />
        </div>
        <div className="formItem">
          <legend>Event Image:</legend>
          <input
            name="imgUrl"
            type="text"
            className="form-like large-font"
            placeholder="http://www.interesting.com"
            defaultValue={this.props.imgUrl}
            onBlur={this.onChange}
          />
          <ValidationItems name="imgUrl" />
        </div>
        <div className="formItem">
          <legend>Venue</legend>
          <VenueDropDown />
        </div>
        <ValidationButton name={this.props.formType} />
        {this.props.error.map((message, idx) => <div key={idx} >{message}</div>)}
      </form>
    )
  }
}
