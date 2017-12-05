// pRoy24 TokenPlex
import React, { Component } from 'react';
import {Modal, Row, Col} from 'react-bootstrap';
import tp from './images/TP.png';
import _ from 'lodash';

export default class AuthenticationModal extends Component {
  render() {

    return (
    <Modal show={this.props.modalOpen}
           onHide={this.props.hideModal}>
      <Modal.Header closeButton={true}>
        <Modal.Title>{_.startCase(_.toLower(this.props.authState))} User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={8}>
            {this.props.children}
          </Col>
          <Col lg={4}>
            <div className="tp-image-frame">
            <img src={tp} className="auth-modal-logo"/>
            <div className="auth-app-label">State of the merkel</div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
    )
  }
}

