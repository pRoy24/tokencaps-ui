import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Modal, Button, FormControl, Col, Row} from 'react-bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import LineGraphComponent from '../graphs/LineGraphComponent';
import history from '../../history';
import _ from 'lodash';
import ListCoinActionsBoard from "../List/ListCoinActionsBoard";
import './UserView.css';
import AppUserCoinCard from './AppUserCoinCard';

import {isNonEmptyObject, isNonEmptyArray} from '../../utils/ObjectUtils';

const percentChangeDropdownOptions = ["24h", "1h", "7d"];

export default class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinDropdownVisible: false,
      percentChangeDropdownVisible: false,
      currentPercentChangeSelection: "24h",
      modalValue: false
    };
    this.sortByName = this.sortByName.bind(this);
    this.sortByRank = this.sortByRank.bind(this);
    this.onListCoinComponentClick = this.onListCoinComponentClick.bind(this);
    this.onSearchComponentClick = this.onSearchComponentClick.bind(this);
    this.percentChangeSelection = this.percentChangeSelection.bind(this);
    this.renderCaret = this.renderCaret.bind(this);
    this.renderEmptyCaret = this.renderEmptyCaret.bind(this);
    this.onPercentChangeOptionClicked = this.onPercentChangeOptionClicked.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentWillMount() {
    const {user: {currentUser}} = this.props;
    const self = this;
    if (!isNonEmptyObject(this.props.user.currentUser)) {
      this.props.authenticateUser();
    } else {
      if (isNonEmptyArray(currentUser.coins)) {
        this.props.submitAddCoin(currentUser.coins);
      } else {
        this.props.submitAddCoin(["BTC", "ETH", "XRP"]);
      }
    }

  }
  onPercentChangeOptionClicked(currentOption) {
    this.setState({currentPercentChangeSelection: currentOption});
  }

  renderEmptyCaret = (direction, fieldName) => {
    return (<div>&nbsp;</div>)
  }

  renderCaret = (direction, fieldName) => {
    if (direction === 'asc') {
      return (
        <div>
          <span className="caret-marker gainer-marker"><i className="fa fa-caret-up"/></span>
        </div>
      );
    }
    if (direction === 'desc') {
      return (
        <div>
          <span className="caret-marker loser-marker"><i className="fa fa-caret-down"/></span>
        </div>
      );
    }
    return (
      <div>
        <span className="caret-marker gainer-marker"><i className="fa fa-caret-up"/></span>
        <span className="caret-marker loser-marker"><i className="fa fa-caret-down"/></span>
      </div>
    );
  }

  sortByName(a, b, order, c, d) {
    if (order === "desc") {
      return a.symbol.toLowerCase() - b.symbol.toLowerCase();
    } else {
      return b.symbol.toLowerCase() - a.symbol.toLowerCase();
    }
  }

  percentChangeSelection(event) {
    event.stopPropagation();
    this.setState({percentChangeDropdownVisible: true});
  }

  sortByRank(a, b, order) {
    if (a.rank && b.rank) {
      if (order === "desc") {
        return parseInt(a.rank) - parseInt(b.rank);
      } else {
        return parseInt(b.rank) - parseInt(a.rank);
      }
    }
    return -1;
  }

  onListCoinComponentClick(event) {
    if (event.target.id !== "coin-search-textbox" || event.target.id !== "coin-search-dropdown") {
      this.setState({coinDropdownVisible: false});
    }
    if (event.target.id !== "percent-change-list" || event.target.id !== "percent-change-selection-button") {
      this.setState({percentChangeDropdownVisible: false});
    }
  }

  onSearchComponentClick() {
    this.setState({coinDropdownVisible: true});
  }

  hideModal() {
    this.setState({modalValue: false});
  }

  showModal() {
    this.setState({modalValue: true});
  }

  componentWillReceiveProps(nextProps) {
    const {user: {currentUser}} = nextProps;
    const self = this;
    if (isNonEmptyObject(currentUser) && !isNonEmptyObject(this.props.user.currentUser)
      && !isNonEmptyArray(currentUser.coins)) {
      if (isNonEmptyArray(currentUser.coins)) {
        this.props.submitAddCoin(currentUser.coins);
      } else {
        this.props.submitAddCoin(["BTC", "ETH", "XRP"]);
      }
    }

  }
  render() {
    const {coins, user: {userCoinList, currentUser}} = this.props;

    const self = this;


    let userCoinListArray = Object.keys(userCoinList).map(function(key){
      return userCoinList[key];
    });

    const getCoinDetailPage = function(row) {
      history.push('/token/'+row.symbol+"/home");
    }
    let listCoins = <span/>;
    const selectRow = {
      onSelect: getCoinDetailPage,
      mode: 'radio',
      hideSelectColumn: true,
      clickToSelect: true
    }
    let percentChangeDropdown = <span/>;
    if (this.state.percentChangeDropdownVisible) {
      let currentOptions =
        percentChangeDropdownOptions.map(function(pecentChangeItem){
          if (pecentChangeItem !== self.state.currentPercentChangeSelection) {
            return pecentChangeItem;
          } else {
            return null;
          }
        }).filter(Boolean);

      percentChangeDropdown =
        <ul className="percent-change-list" id="percent-change-list">
          {currentOptions.map(function(option){
            return (
              <li onClick={() => self.onPercentChangeOptionClicked(option)}>
                {option}
              </li>
            )
          })}</ul>;

    }

    if (userCoinListArray && userCoinListArray.length > 0) {


      let cardColumnOne = [];
      let cardColumnTwo = [];
      let cardColumnThree = [];
      let cardColumnFour = [];


      userCoinListArray.forEach(function(userCoinItem, userIdx){
        if (currentUser && currentUser.transactions) {
          currentUser.transactions.forEach(function (transaction, tIdx) {
            if (transaction.transactionCoin === userCoinItem.symbol) {

            }
          });
        }

        if (userIdx % 4 === 3) {
          cardColumnFour.push(
            <AppUserCoinCard {...self.props} coin={userCoinItem}  key={userCoinItem.symbol + userIdx}/>
          )
        }
        if (userIdx % 4 === 2) {
          cardColumnThree.push(
            <AppUserCoinCard {...self.props} coin={userCoinItem}  key={userCoinItem.symbol + userIdx}/>
          )
        }
        if (userIdx %4 === 1) {
          cardColumnTwo.push(
            <AppUserCoinCard {...self.props} coin={userCoinItem}  key={userCoinItem.symbol + userIdx}/>
          )
        }
        if (userIdx % 4 === 0) {
          cardColumnOne.push(
            <AppUserCoinCard {...self.props} coin={userCoinItem}  key={userCoinItem.symbol + userIdx}/>
          )
        }
      });
      listCoins =
        <Row>
          <Col lg={3} sm={12} xs={12} md={6}>{cardColumnOne}</Col>
          <Col lg={3} sm={12} xs={12} md={6}>{cardColumnTwo}</Col>
          <Col lg={3} sm={12} xs={12} md={6}>{cardColumnThree}</Col>
          <Col lg={3} sm={12} xs={12} md={6}>{cardColumnFour}</Col>
        </Row>
    } else {
      if (isNonEmptyObject(currentUser)) {
        listCoins = <div className="empty-text-user-container">Such empty. Add a trade now.</div>
      } else {
        listCoins = <div className="empty-text-user-container">Please Login or Register to create your portfolio.</div>
      }
    }
    return (
      <div onClick={this.onListCoinComponentClick}>
        <ListCoinActionsBoard {...this.props} onSearchComponentClick={this.onSearchComponentClick}
                              dropdownVisible={this.state.coinDropdownVisible}
                              showModal={this.showModal}/>
        <div className="coin-list-container">
          {listCoins}
          <AddTransanctionModal getCoinSearchData={this.props.getCoinSearchData} coins={this.props.coins}
            modalValue={this.state.modalValue} hideModal={this.hideModal} user={this.props.user} submitAddCoin={this.props.submitAddCoin}/>
        </div>
      </div>
    )
  }
}

class AddTransanctionModal extends Component {

  constructor(props) {
    super(props);
    this.state = {show: false};
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.getCoinData = this.getCoinData.bind(this);
    this.addButtonClicked = this.addButtonClicked.bind(this);
    this.state = {coinList: []}
  }

  componentWillMount() {
    const {user: {currentUser}} = this.props;
    if (isNonEmptyObject(currentUser) && isNonEmptyArray(currentUser.coins)) {
      this.setState({coinList: currentUser.coins});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {user} = nextProps;
    if (isNonEmptyObject(user.currentUser) && !isNonEmptyObject(this.props.user.currentUser)) {
      this.setState({coinList: user.currentUser.coins});
    }
  }

  showModal() {
    this.setState({show: true});
  }

  hideModal() {
    this.setState({show: false});
  }

  getCoinData(event) {
    let coinSearchString = event.target.value;
    if (coinSearchString && coinSearchString.length > 0) {
      this.props.getCoinSearchData(coinSearchString);
    }
  }

  addCoinToList(coin) {
    let currentCoinList = this.state.coinList;
    currentCoinList.push(coin.symbol);
    this.setState({coinList: currentCoinList});
  }

  addButtonClicked() {
    if (isNonEmptyArray(this.state.coinList)) {
      this.props.submitAddCoin(this.state.coinList);
    }
    this.props.hideModal();
  }
  render() {
    const {coins: {searchData}} = this.props;
    let self = this;
    let coinSearchListResponse = <span/>;
    const baseURI = "https://www.cryptocompare.com";
    if (searchData && _.isArray(searchData)) {
      coinSearchListResponse =
        searchData.map(function(item, idx){
          return (
          <div key={item.symbol+idx} className="search-row" onClick={self.addCoinToList.bind(self, item)}>
            <img src = {`${baseURI}${item.imageurl}`}  className="coin-logo-extra-small"/>
            <span className="search-symbol">{item.symbol}</span>
            <span className="search-fullname">{item.fullname}</span>
          </div>
          )
        })
    }
    let coinsAddedList = <span/>;
    if (this.state.coinList) {
      coinsAddedList =
        <div>
          {this.state.coinList.map(function (coin, idx) {
            return <span className="btn btn-default btn-sm coin-added-list" key={coin+idx}>{coin}</span>
          })}
        </div>
    }
    return (
      <div className="static-modal">
        <Modal show={this.props.modalValue}
               onHide={this.props.hideModal}>
          <Modal.Header>
            <Modal.Title>Add Coin
            <div>{coinsAddedList}</div></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl type="text" placeholder="Coin Name or Symbol" onChange={this.getCoinData}/>
            <div className="coin-search-list-response-container">
              {coinSearchListResponse}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.hideModal}>Close</Button>
            <Button bsStyle="primary" onClick={this.addButtonClicked}>Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}