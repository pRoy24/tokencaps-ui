
import {Modal, Button, FormControl, FormGroup,ControlLabel, HelpBlock} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import React, {Component} from 'react';
import AppTextField from '../fields/AppTextField';
import {isNonEmptyString} from '../../../utils/ObjectUtils';
import {Link} from 'react-router-dom';

class UserRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.validateUserName = this.validateUserName.bind(this);
    this.switchModal = this.switchModal.bind(this);
    this.state = {
      userNameValidState: "empty"
    }
  }
  handleFormSubmit(vals) {
    this.props.hideModal();
    this.props.submitRegister(vals);
  }
  switchModal() {
    this.props.switchModal("login");
  }

  validateUserName(event) {
    const userName = event.target.value;
    if (isNonEmptyString(userName)) {
      this.props.validateUserName(userName);
    }
  }
  render() {
    const {handleSubmit} = this.props;
    let userNameValidation = <span/>;
    if (this.state.userNameValidState === "success") {

    } else if (this.state.userNameValidState === "failure"){

    }
    return (
      <form name="RegisterForm" onSubmit={handleSubmit(this.handleFormSubmit)} className="auth-form">
        <Field component={AppTextField} name="username"
               type="text" label="Username" className="app-text-field" onChange={this.validateUserName}
               controlFeedback={userNameValidation}/>

        <Field component={AppTextField} name="email" type="text" label="Email"/>
        <Field component={AppTextField} name="password" type="password" label="Password"/>
        <button type="submit">
          Submit
        </button>
        <span className="auth-label-2">
          Already a user? <span className="auth-label-3" onClick={this.switchModal}> Login Now</span>
        </span>
        <div className="eula-license">
          TokenPlex Software is Licensed under the <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GPLv3 Public License</a>.
          <div>
            By Singing up, You agree to <Link to="/license">accept the License terms</Link>.
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'RegisterForm'
})(UserRegisterForm)