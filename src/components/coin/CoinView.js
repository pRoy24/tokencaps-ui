import React, { Component } from 'react';
import './CoinView.css';
import CoinHomeView from './CoinHomeView';
import CoinExchangeView from './CoinExchangeView';
import { Link } from 'react-router-dom';
import CoinHeartBeatViewContainer from "./CoinHeartBeatViewContainer";
import CoinTechnicalView from "./CoinTechnicalView";

export default class CoinView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: "homeView"
    }
    this.setCurrentView = this.setCurrentView.bind(this);
    this.homeButtonClicked = this.homeButtonClicked.bind(this);
  }

  setCurrentView(currentView) {
    this.setState({currentView: currentView});
  }

  homeButtonClicked() {
  //  this.setState({"homeTab": })
  }

  componentWillMount() {
    const {match: {params}} = this.props;
    if (params.symbol) {
      this.props.fetchCoinSnapshot(params.symbol);
    }
  }

  componentWillUnmount() {
    this.props.resetCoinSnaphsot();
  }

  render() {
    const {match: {params: {symbol}}} = this.props;
    let coinCurrentView = <span/>;
    const self = this;
    let homeTab = "", exchangeTab = "", heartbeatTab = "", technicalTab = "";
    if (this.state.currentView === "homeView") {
      coinCurrentView = <CoinHomeView {...self.props}/>;
      homeTab = "tab-current";
    } else if (this.state.currentView === "exchangeView") {
      exchangeTab = "tab-current";
      coinCurrentView = <CoinExchangeView {...self.props}/>;
    } else if (this.state.currentView === "heartBeat") {
      coinCurrentView = <CoinHeartBeatViewContainer {...self.props}/>;
      heartbeatTab = "tab-current";
    } else if (this.state.currentView === "technical") {
      coinCurrentView = <CoinTechnicalView {...self.props}/>;
      technicalTab = "tab-current";
    }

    return(
      <div>
        <div className="tabs tabs-style-tzoid coin-view-container">
          <nav>
            <ul>
              <li className={homeTab} onClick={() => this.setCurrentView("homeView")}>
                <Link to="home">
                  <span>Overview</span>
                </Link>
              </li>
              <li onClick={() => this.setCurrentView("exchangeView")} className={exchangeTab}>
                <Link to="exchanges">
                  <span>Exchanges</span>
                </Link>
              </li>
              <li onClick={() => this.setCurrentView("heartBeat")} className={heartbeatTab}>
                <Link to="heartbeat" >
                  <span>Heartbeat</span>
                </Link>
              </li>
              <li onClick={() => this.setCurrentView("technical")} className={technicalTab}>
                <Link to="technical" >
                  <span>Technical</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="content-wrap">
            {coinCurrentView}
          </div>
        </div>
      </div>
    )
  }
}