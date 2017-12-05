// pRoy24 TokenPlex
import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import tokenplex from './images/TP.png';
import ethlogo from './images/logo_eth.png';
import { Link } from 'react-router-dom';

import {isNonEmptyObject} from '../../utils/ObjectUtils';

export default class UserResourceView extends Component {
  constructor(props) {
    super(props);
    this.userLogout = this.userLogout.bind(this);
  }
  userLogout() {
    localStorage.clear();
    this.props.resetUser();
  }
  render() {
    const {user: {currentUser, userCoinList}} = this.props;

    let purchaseValueETH = 0;
    let purchaseValueUSD = 0;
    let purchaseValueBTC = 0;
    let currentValueETH = 0;
    let currentValueUSD = 0;
    let currentValueBTC = 0;


    if (currentUser.transactions) {
      currentUser.transactions.forEach(function(transaction, idx){
        let coinDetail = userCoinList.find((userCoin) => (userCoin.symbol === transaction.transactionCoin));
        if (transaction.transactionType === "sell") {
          purchaseValueETH -= transaction.transactionPriceETH * transaction.transactionQuantity;
          purchaseValueUSD -= transaction.transactionPriceUSD * transaction.transactionQuantity;
          purchaseValueBTC -= transaction.transactionPriceBTC * transaction.transactionQuantity;
        if (isNonEmptyObject(coinDetail)) {
          currentValueBTC -= coinDetail.price_btc * transaction.transactionQuantity;
          currentValueUSD -= coinDetail.price_usd * transaction.transactionQuantity;
        }
        } else {
          purchaseValueETH += transaction.transactionPriceETH * transaction.transactionQuantity;
          purchaseValueUSD += transaction.transactionPriceUSD * transaction.transactionQuantity;
          purchaseValueBTC += transaction.transactionPriceBTC * transaction.transactionQuantity;
          if (isNonEmptyObject(coinDetail)) {
            currentValueBTC += coinDetail.price_btc * transaction.transactionQuantity;
            currentValueUSD += coinDetail.price_usd * transaction.transactionQuantity;
          }
        }
      });
    }
    purchaseValueETH = purchaseValueETH.toFixed(2);
    purchaseValueUSD = purchaseValueUSD.toFixed(2);
    purchaseValueBTC = purchaseValueBTC.toFixed(2);
    currentValueUSD = currentValueUSD.toFixed(2);
    currentValueBTC = currentValueBTC.toFixed(2);
    return (
      <div>
      <Row>
        <Col lg={1} md={2} xs={2} sm={2}>
          <Link  to="/">
            <img src={tokenplex} className="token-image-logo"/>
          </Link>
        </Col>

        <Col lg={2} xsHidden smHidden></Col>
        <Col lg={3} md={5} xs={5} sm={5} className="coin-portfolio-section section-purchase">
          <div>
            <div className="value-header-container">
              {purchaseValueUSD} <i className="fa fa-usd currency-fa"/>
            </div>
            <div className="value-header-container">
              {purchaseValueBTC} <i className="fa fa-btc currency-fa"/>
            </div>
          </div>
          <div className="coin-portfolio-label purchase-label">
            Purchase Value
          </div>
        </Col>
        <Col lg={3} md={5} xs={5} sm={5} className="coin-portfolio-section section-current">
          <div>
            <div className="value-header-container">
              {currentValueUSD} <i className="fa fa-usd currency-fa"/>
            </div>
            <div className="value-header-container">
              {currentValueBTC} <i className="fa fa-btc currency-fa"/>
            </div>
          </div>
          <div className="coin-portfolio-label current-label">Current Value</div>
        </Col>
        <Col lg={1} xsHidden smHidden></Col>
        <Col lg={2} md={1} xsHidden smHidden>
          <div className="user-account-detail-container">
            <div>Hello {currentUser.username}</div>
            <div>
              <span>Account</span><span className="logout-btn" onClick={this.userLogout}>Logout</span>
            </div>
          </div>
        </Col>
      </Row>
        <Row>
          <Col xs={12} sm={12} lgHidden>
            <Link to={"/user"}>
              <div className="btn btn-default mobile-menu-btn raised">User</div>
            </Link>
            <Link to={"/donate"}>
              <div className="btn btn-default mobile-menu-btn raised">Donate</div></Link>
            <Link to={"/"}>
              <div className="btn btn-default mobile-menu-btn raised" >Logout</div></Link>
          </Col>
        </Row>
      </div>
    )
  }
}