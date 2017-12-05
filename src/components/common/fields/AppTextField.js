// pRoy24 TokenPlex
import React, {Component} from 'react';
import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';

export default class AppTextField extends Component {
  render() {
    return (
      <FormGroup
        controlId="formBasicText">
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl {...this.props.input} type={this.props.type}/>
        {this.props.controlFeedback}
      </FormGroup>
    )
  }
}