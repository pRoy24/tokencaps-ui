import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import AppTextField from '../fields/AppTextField';
import './UserAuth.css';

class UserLoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.switchModal = this.switchModal.bind(this);
  }

  switchModal() {
    this.props.switchModal("register");
  }

  handleFormSubmit(vals) {
    this.props.submitLogin(vals);
    this.props.hideModal();
  }

  render() {
    console.log("RERE");
    const {handleSubmit} = this.props;
    return (
      <form name="LoginForm" onSubmit={handleSubmit(this.handleFormSubmit)} className="auth-form">
        <Field component={AppTextField} name="username" type="text" label="Username"/>
        <Field component={AppTextField} name="password" type="password" label="Password"/>
        <button type="submit" className="btn btn-default user-auth-btn">
          Submit
        </button>
        <span className="auth-label-2">
          New user? <span className="auth-label-3" onClick={this.switchModal}>Register Here</span>
        </span>
      </form>
    )
  }
}

export default reduxForm({
  form: 'LoginForm'
})(UserLoginForm)

