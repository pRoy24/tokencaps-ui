import React, { Component } from 'react';
import ListCoinActionsBoard from "./ListCoinActionsBoard";
import ListCoinsContainer from './ListCoinsContainer';
import NavBarContainer from '../nav/NavBarContainer';
import Footer from '../footer/Footer';
import {Modal, Button, FormControl, Row, Col} from 'react-bootstrap';
import UserLoginContainer from '../common/auth/UserLoginContainer';
import UserRegisterContainer from '../common/auth/UserRegisterContainer';
import AuthenticationModal from '../common/auth/AuthenticationModal';

var Recaptcha = require('react-recaptcha');

export default class IndexView extends Component {
  constructor(props) {
    super(props);
    this.openLogin = this.openLogin.bind(this);
    this.openRegister = this.openRegister.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.switchModal = this.switchModal.bind(this);
    this.state = {modalOpen: false, authState: ""}
  }

  openLogin() {
    this.setState({modalOpen: true, authState: "login"});
  }

  openRegister() {
    this.setState({modalOpen: true, authState: "register"});
  }

  switchModal(newModal) {
    this.setState({authState: newModal});
  }
  hideModal() {
    this.setState({modalOpen: false});
  }

  render() {
    let userAuthenticationContent = <span/>;
    if (this.state.authState === "register") {
      userAuthenticationContent =
        <UserRegisterContainer hideModal={this.hideModal} switchModal={this.switchModal}/>;
    }
    if (this.state.authState === "login") {
      userAuthenticationContent =
        <UserLoginContainer hideModal={this.hideModal} switchModal={this.switchModal}/>;
    }

    return (
      <div>
        <div className="container-fluid coc-app">
          <NavBarContainer openLogin={this.openLogin} openRegister={this.openRegister}/>
          <div className="content-component">
            {this.props.children}
          </div>
          <Footer/>
        </div>
        <AuthenticationModal modalOpen={this.state.modalOpen}
                  hideModal={this.hideModal} authState={this.state.authState} >
          {userAuthenticationContent}
        </AuthenticationModal>
      </div>
    )
  }
}