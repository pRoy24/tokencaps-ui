import React, { Component } from 'react';
import {ButtonToolbar, ToggleButtonGroup, ToggleButton,
  FormGroup, ControlLabel, FormControl, MenuItem, Col, Button} from 'react-bootstrap';
import _ from 'lodash';
import history from '../../history';
const baseURI = "https://www.cryptocompare.com";

export default class ListCoinActionsBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {searchBoxVisible: false, currentPage: 1,
      currentView: 'list', userBtnVal: 2, publicBtnVal: 1};
    this.getCoinData = this.getCoinData.bind(this);
    this.gotoPublicBoard = this.gotoPublicBoard.bind(this);
    this.gotoUserBoard = this.gotoUserBoard.bind(this);
    this.increaseList = this.increaseList.bind(this);
    this.decreaseList = this.decreaseList.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.match || nextProps.match.path === "/") {
      this.setState({userBtnVal: 2, publicBtnVal: 1});
    }
    else if ( nextProps.match.path === "/user") {
      this.setState({userBtnVal: 1, publicBtnVal: 2});
    }

  }
  gotoPublicBoard() {
    history.push('/');
  }
  gotoUserBoard() {
    history.push('/user');
  }
  getCoinData(event) {
    let coinSearchString = event.target.value;
    if (coinSearchString && coinSearchString.length > 0) {
      this.props.onSearchComponentClick();
      this.props.getCoinSearchData(coinSearchString);
    }
  }

  increaseList() {
    this.props.fetchCoinListData(this.state.currentPage + 1);
    this.setState({currentPage: this.state.currentPage +1});
  }

  decreaseList() {
    if (this.state.currentPage > 1) {
      this.props.fetchCoinListData(this.state.currentPage - 1);
      this.setState({currentPage: this.state.currentPage - 1});
    }
  }

  gotoCoinPage(coinItem) {
    history.push('/token/'+coinItem.symbol);
  }

  showLoginOrCoinModal() {

  }

  componentWillMount() {
    let path = this.props.match ? this.props.match.path : "/";
    this.setState({"currentView": path});
  }

  render() {
    const {coins: {searchData}, dropdownVisible} = this.props;
    const self = this;
    let coinSearchQueryResponse = <span/>;
    let currentPageView = "1 - 100";
    if (this.state.currentPage) {
      currentPageView = ((100 * (this.state.currentPage - 1)) + 1) + " - " + (100 * (this.state.currentPage - 1) + 100);
    }
    if (dropdownVisible && _.isArray(searchData) && searchData.length > 0) {
      coinSearchQueryResponse = <div className="coin-search-menu-item-container" id="coin-search-dropdown">
        {searchData.map(function (item, idx) {
        return (
          <MenuItem className="coin-search-item" key={item.name + idx} onClick={self.gotoCoinPage.bind(self, item)}>
            <div className="coin-search-item-image">
            <img src={`${baseURI}/${item.imageurl}`} className="coin-logo-extra-small"/>
            </div>
            <div className="coin-search-item-name">{item.name}</div>
          </MenuItem>);
      })}
      </div>;
    }
    let coinActionView =
      <div>
        <i className="fa fa-chevron-left arrow-block" onClick={this.decreaseList}/>
        <div className="current-range-display">{currentPageView}</div>
        <i className="fa fa-chevron-right arrow-block" onClick={this.increaseList}/>
      </div>;

    if (this.state.currentView === "/user") {

      coinActionView = <Button onClick={this.props.showModal} className="add-token-btn">Add Token</Button>
    }

    return (
      <div className="list-coin-action-board-container">
        <Col lg={2} xs={6} className="arrow-block-small">
          {coinActionView}
        </Col>
        <Col lg={6}  xs={6}>
        <div className="coin-search-board-container">
          <FormControl type="text" placeholder="Enter Coin To Search for" id="coin-search-textbox"
                       className="coin-search-text-box" onChange={this.getCoinData}/>
            {coinSearchQueryResponse}
        </div>
        </Col>
        <Col lg={4} xsHidden className="coin-list-toggle-display">
        <ButtonToolbar style={{"display": "inline-block", "float": "right"}}>
          <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]} className="board-toggle-button-container">
            <ToggleButton value={this.state.publicBtnVal} onClick={this.gotoPublicBoard}>Public Board</ToggleButton>
            <ToggleButton value={this.state.userBtnVal} onClick={this.gotoUserBoard}>User Board</ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
        </Col>
      </div>
    )
  }
}