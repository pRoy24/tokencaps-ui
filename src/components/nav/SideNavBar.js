import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import './NavBar.css';
import {isNonEmptyObject} from '../../utils/ObjectUtils';
import UserResourceView from '../nav/UserResourceView';
import tpLogo from '../nav/images/TP.png';
import {isNonEmptyArray} from '../../utils/ObjectUtils';

export default class SideNavBar extends Component {
  componentWillMount() {
    const {user: {currentUser}} = this.props;


    if (!isNonEmptyObject(this.props.user.currentUser)) {
      this.props.getCustomerData();
    } else {
      if (isNonEmptyArray(currentUser.coins)) {
        this.props.submitAddCoin(currentUser.coins);
      } else {
        this.props.submitAddCoin(["BTC", "ETH", "XRP"]);
      }
    }

  }

  componentWillReceiveProps(nextProps) {
    const {user: {currentUser}} = nextProps;
    const self = this;
    if (isNonEmptyObject(currentUser) && !isNonEmptyObject(this.props.user.currentUser)) {
      if (isNonEmptyArray(currentUser.coins)) {
        this.props.submitAddCoin(currentUser.coins);
      } else {
        this.props.submitAddCoin(["BTC", "ETH", "XRP"]);
      }
    }
  }
  render() {
    const {user: {currentUser}} = this.props;
    let userTopNavBar = <span/>;
    if (isNonEmptyObject(currentUser)) {
     userTopNavBar =
       <div>
         <UserResourceView user={this.props.user} resetUser={this.props.resetUser}/>
       </div>
    } else {
      userTopNavBar =
        <div>
          <Col lg={10}>
            <Col xsHidden mdHidden smHidden lg={5}></Col>
           <Col lg={4} sm={6} md={6} xs={6}>
             <h2 className="header-text">
               <Link to="/">
               <img src={tpLogo} className="app-logo-index"/>
               </Link>
               <div className="app-logo-title">TokenPlex</div>
               <div className="site-label-2">The state of the merkel</div>
             </h2>
           </Col>
         </Col>
          <Col lg={2} sm={6} xs={6} md={6}>
           <div className="user-home-login-container">
             <span className="user-login" onClick={this.props.openLogin}>Login</span>
             <span className="user-signup" onClick={this.props.openRegister}>Signup</span>
           </div>
         </Col>
        </div>
    }
    return (
      <div className="app-component">
        <div id="header-component">
          <div className="application-description">
            {userTopNavBar}
          </div>
        </div>
        <div className="sidebar hidden-md hidden-xs hidden-sm">
          <ul className="nav">
            <li>
              <Link className="nav-link-container" to="/">
              <i className="fa fa-home menu-icon"/>
                <div className="side-menu-label">Home</div>
              </Link>
            </li>
            <li>
              <Link className="nav-link-container" to="/user">
                <i className="fa fa-user menu-icon"/>
                <div className="side-menu-label">User</div>
              </Link>
            </li>
            <li>
              <Link className="nav-link-container" to="/mission">
                <i className="fa fa-sticky-note menu-icon"/>
                <div className="side-menu-label">Mission</div>
              </Link>
            </li>
            <li>
              <Link className="nav-link-container" to="/donate">
                <i className="fa fa-btc menu-icon"/>
                <div className="side-menu-label"> Donate</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}