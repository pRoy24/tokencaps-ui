// pRoy24 TokenPlex
import React, { Component } from 'react';
import LineGraphComponent from "../graphs/LineGraphComponent";
import {Row, Col, FormControl, DropdownButton, MenuItem} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/datepicker.css';
import {isNonEmptyArray} from '../../utils/ObjectUtils';
const baseURI = "https://www.cryptocompare.com";
let moment = require('moment');

export default class AppUserCoinCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      addBuyActive: false,
      addSellActive: false,
      sellDate: moment(),
      buyDate: moment(),
      sellQuantity: 0,
      buyQuantity: 0,
      sellPrice: 0,
      buyPrice: 0,
      sellCurrency: "USD",
      buyCurrency: "USD",
      coinGraph: <span/>
    }
    this.handleSellDateChange = this.handleSellDateChange.bind(this);

    this.showAddSellTrade = this.showAddSellTrade.bind(this);
    this.changeSellQuantity = this.changeSellQuantity.bind(this);
    this.changeSellPrice = this.changeSellPrice.bind(this);
    this.submitAddSell = this.submitAddSell.bind(this);

    // Buy Actions

    this.showAddBuyTrade = this.showAddBuyTrade.bind(this);
    this.submitAddBuy = this.submitAddBuy.bind(this);
    this.changeBuyPrice = this.changeBuyPrice.bind(this);
    this.handleBuyDateChange = this.handleBuyDateChange.bind(this);
    this.changeBuyQuantity = this.changeBuyQuantity.bind(this);
  }

  removeCoinFromProfile(coin) {
    const {user: {currentUser}} = this.props;
    this.props.removeCoin(coin.symbol, currentUser._id);
  }
  showAddBuyTrade() {
    this.setState({addBuyActive: true});
  }

  showAddSellTrade() {
    this.setState({addSellActive: true});
  }

  handleSellDateChange(date) {
    this.setState({
      sellDate: date
    });
  }

  handleBuyDateChange(date) {
    this.setState({
      buyDate: date
    });
  }

  submitAddSell() {
    const {coin} = this.props;
    let sellPayload = {
      "transactionCoin": coin.symbol,
      "transactionCurrency": this.state.sellCurrency,
      "transactionDate": this.state.sellDate.format('X'),
      "transactionQuantity": this.state.sellQuantity,
      "transactionType": "sell"
    }
    this.props.submitAddTransaction(sellPayload);
  }

  submitAddBuy() {
    const {coin} = this.props;
    let buyPayload = {
      "transactionCoin": coin.symbol,
      "transactionCurrency": this.state.buyCurrency,
      "transactionDate": this.state.buyDate.format('X'),
      "transactionQuantity": this.state.buyQuantity,
      "transactionType": "buy"
    }
    this.props.submitAddTransaction(buyPayload);
  }

  changeSellQuantity(event) {
    this.setState({sellQuantity: event.target.value});
  }

  changeBuyQuantity(event) {
    this.setState({buyQuantity: event.target.value});
  }

  changeSellPrice(event) {
    this.setState({sellPrice: event.target.value})
  }

  changeBuyPrice(event) {
    this.setState({buyPrice: event.target.value});
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const {coin, user, user: {currentUser}} = this.props;
    let lineGraph = <span/>;
    const self = this;

    if (coin.weekly_data && coin.weekly_data.length > 0) {
      lineGraph =
        <div className="coin-user-data-graph">
          <LineGraphComponent data={coin.weekly_data} />
        </div>;
    }
    let totalQty = 0;
    let avgPurchasePrice = 0;
    let avgSellPrice = 0;
    let totalBuyAmount = 0;
    let totalSellQuantity  = 0;
    let totalBuyQuantity = 0;
    let totalSellAmount = 0;

    let currentPortfolioTotal = 0;

    if (isNonEmptyArray(currentUser.transactions)) {
      currentUser.transactions.forEach(function (tItem, tIdx) {
        if (tItem.transactionCoin === coin.symbol) {
          if (tItem.transactionType === "sell") {
            totalQty -= Number(tItem.transactionQuantity);

            totalSellQuantity += Number(tItem.transactionQuantity);

            totalSellAmount += (Number(tItem.transactionPriceUSD) * Number(tItem.transactionQuantity));


          } else {
            totalQty += Number(tItem.transactionQuantity);

            totalBuyQuantity += Number(tItem.transactionQuantity);

            totalBuyAmount += (Number(tItem.transactionPriceUSD) * Number(tItem.transactionQuantity));
          }
        }
      });


      avgPurchasePrice = !isNaN(totalBuyAmount / totalBuyQuantity) ? (totalBuyAmount / totalBuyQuantity).toFixed(2) : "0.00";
      avgSellPrice = !isNaN(totalSellAmount / totalSellQuantity) ? (totalSellAmount / totalSellQuantity).toFixed(2) : "0.00";
      currentPortfolioTotal = (totalQty * coin.price_usd).toFixed(2);
    }
    let currentPortfolioAmount = "0.00";
    let currentPortfolioValue = "0.00";
    let portfolioPurchaseValue = "0.00";
    let currentTokenPrice = coin.price_usd;

    let userBuyRows = <span/>;
    let userSellRows = <span/>;
    let addBuyRow = <span/>;
    let addSellRow = <span/>;

    if (isNonEmptyArray(currentUser.transactions)) {
      let userSellItemList = currentUser.transactions.filter(function (transaction) {
        return transaction.transactionType === "sell" && transaction.transactionCoin === coin.symbol;
      });

      let userBuyItemList = currentUser.transactions.filter(function (transaction) {
        return transaction.transactionType === "buy" && transaction.transactionCoin === coin.symbol;
      });
      if (isNonEmptyArray(userSellItemList)) {
        userSellRows = userSellItemList.map(function(sellItem, idx){
          let totalSellAmount = Number(sellItem.transactionQuantity) * Number(sellItem.transactionPriceUSD);
          if (totalSellAmount !== "NaN") {
            totalSellAmount = totalSellAmount.toFixed(2)
          } else {
            totalSellAmount = "-"
          }
          return (
            <Row key={sellItem.transactionDate+idx} className="transaction-record-row">
              <Col lg={2} xs={2} md={2} sm={2}>
                <div className="transaction-date-day">
                  {moment(Number(sellItem.transactionDate)).format('MM/DD/YY')}
                </div>
              </Col>
              <Col lg={1} xs={1} md={1} sm={1}>
                <div className="transaction-date-time">
                  {moment(Number(sellItem.transactionDate)).format('hh:mm a')}
                </div>
              </Col>
              <Col lg={2} xs={2} md={2} sm={2}>{sellItem.transactionPriceUSD}</Col>
              <Col lg={2} xs={2} md={2} sm={2}>{sellItem.transactionQuantity}</Col>
              <Col lg={2} xs={2} md={2} sm={2}>{totalSellAmount}</Col>
              <Col lg={1} xs={1} md={1} sm={1}>{sellItem.transactionCurrency}</Col>
            </Row>
          )
        })
      }
      if (isNonEmptyArray(userBuyItemList)) {
        userBuyRows = userBuyItemList.map(function(buyItem, idx){
          let totalBuyAmount = Number(buyItem.transactionQuantity) * Number(buyItem.transactionPriceUSD)
          if (totalBuyAmount !== "NaN") {
            totalBuyAmount = totalBuyAmount.toFixed(2)
          } else {
            totalBuyAmount = "-"
          }

          return (
            <Row key={buyItem.transactionDate+idx} className="transaction-record-row">
              <Col lg={2} xs={2} md={2} sm={2}>
                <div className="transaction-date-day">
                  {moment(Number(buyItem.transactionDate)).format('MM/DD/YY')}
                </div>
              </Col>
              <Col lg={1} xs={1} md={1} sm={1}>
                <div className="transaction-date-time">
                  {moment(Number(buyItem.transactionDate)).format('hh:mm a')}
                </div>
              </Col>
              <Col lg={2} xs={2} md={2} sm={2}>{buyItem.transactionPriceUSD}</Col>
              <Col lg={2} xs={2} md={2} sm={2}>{buyItem.transactionQuantity}</Col>
              <Col lg={2} xs={2} md={2} sm={2}>{totalBuyAmount}</Col>
              <Col lg={1} xs={1} md={1} sm={1}>{buyItem.transactionCurrency}</Col>
            </Row>
          )
        })
      }
    }
    if (this.state.addBuyActive) {
      addBuyRow =
        <Row className="date-picker-container">
          <div className="date-picker-tab">
            <DatePicker
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MM/DD/YY HH:mm"
              timeIntervals={1}
              selected={this.state.buyDate}
              onChange={this.handleBuyDateChange}/>
            <div className="amount-class">
              <DropdownButton title={"Aggregate"}  id={"usd-aggregate"} className="add-trade-currency-btn">
                <MenuItem eventKey="1" className="add-currency-option">Aggregate</MenuItem>
              </DropdownButton>
              <FormControl type="text" className="price-class" name="buy-quantity" placeholder="quantity" onChange={this.changeBuyQuantity}/>
              <div className="btn btn-xs add-trade-btn" onClick={this.submitAddBuy}>
                <i className="fa fa-check add-trade-check"/>
              </div>
            </div>
          </div>
        </Row>
    }

    if (this.state.addSellActive) {
      addSellRow =
        <Row className="date-picker-container">
          <div className="date-picker-tab">
            <DatePicker
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MM/DD/YY HH:mm"
              timeIntervals={1}
              selected={this.state.sellDate}
              onChange={this.handleSellDateChange}/>
            <div className="amount-class">
              <DropdownButton title={"Aggregate"}  id={"usd-aggregate"} className="add-trade-currency-btn">
                <MenuItem eventKey="1" className="add-currency-option">Aggregate</MenuItem>
              </DropdownButton>
              <FormControl type="text" className="price-class" name="sell-quantity" placeholder="quantity" onChange={this.changeSellQuantity}/>
              <div className="btn btn-xs add-trade-btn" onClick={this.submitAddSell}>
                <i className="fa fa-check add-trade-check"/>
              </div>
            </div>
          </div>
        </Row>
    }

    return (
      <div className="coin-display-card">
        <div className="coin-display-heading-row">
          <img src={`${baseURI}/${coin.imageurl}`} className="coin-logo-extra-small"/>
          <div className="coin-display-fullname">{coin.fullname}</div>
          <i className="fa fa-times remove-coin" onClick={self.removeCoinFromProfile.bind(self, coin)}/>
        </div>
        <div className="coin-display-container">
          <Row className="coin-display-row">
            <Col lg={4} xs={4} md={4} sm={4}>
            <div className="detail-row-value">
            {totalQty}
            </div>
            <div className="detail-row-label">
             Tokens
            </div>
          </Col>
            <Col lg={4} xs={4} md={4} sm={4}>
            <div className="detail-row-value">
            {avgPurchasePrice}
            </div>
            <div className="detail-row-label">
            Avg. buy at
            </div>
          </Col>
            <Col lg={4} xs={4} md={4} sm={4}>
            <div className="detail-row-value">
            {avgSellPrice}
            </div>
            <div className="detail-row-label">
            Avg. sell at
            </div>
          </Col>
          </Row>
          <Row className="coin-display-row">
            <Col lg={4} xs={4} md={4} sm={4}>
            <div className="detail-row-value">
              {currentTokenPrice}
            </div>
            <div className="detail-row-label">
              Trading at.
            </div>
          </Col>
            <Col lg={4} xs={4} md={4} sm={4}>
            <div className="detail-row-value">
              {currentPortfolioTotal}
            </div>
            <div className="detail-row-label">
              Worth
            </div>
          </Col>
            <Col lg={4} xs={4} md={4} sm={4}>
            </Col>
        </Row>
          <div>
            <div>
              <span>
                Buys
              </span>
              <span className="detail-row-label transaction-button">
                <div className="add-button-link" onClick={this.showAddBuyTrade}>
                  <i className="fa fa-plus-circle"/>Add Buy
                </div>
              </span>
            </div>
            <div className="empty-template">
              {userBuyRows}
            </div>
            {addBuyRow}
          </div>
          <div>
            <div>
            Sells
            <span className="detail-row-label transaction-button">
              <div className="add-button-link" onClick={this.showAddSellTrade}>
                <i className="fa fa-minus-circle"/>Add Sell
              </div>
            </span>
            </div>
            <div className="empty-template">
              {userSellRows}
            </div>
            {addSellRow}
          </div>
          {lineGraph}
        </div>
      </div>
    )
  }
}
