/**
 Copyright Church of Crypto, pRoy24
 */

import React, {Component} from 'react';
import {VictoryChart, VictoryAxis,
  VictoryZoomContainer, VictoryLine, VictoryBrushContainer, VictoryPie } from 'victory';
import _ from 'lodash';
import {Row, Col, DropdownButton, MenuItem} from 'react-bootstrap';
import moment from 'moment';
import './CoinExchanges.css';

export default class CoinExchangeView extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {coins: {coinDetail, coinDetail: {coinSnapshot}}} = this.props;
    let marketExchangeValues = <span/>;
    let exchangeVolumeValues = [];
    let pieExchangeVolumeValues = [];
    let currentNormalizedExhangeResponse = [];
    let totalCurrentVolume = 0;
    let currentVolumeDistribution = <span/>;
    if (_.isArray(coinSnapshot) && coinSnapshot.length > 0) {
      marketExchangeValues = coinSnapshot.sort(function (a,b) {
        return ( Number(b.lastvolume) - Number(a.lastvolume));
      }).map(function (item, idx) {
        if (item.market.toLowerCase() !== "cccagg") {
          exchangeVolumeValues.push({x: item.market, y: item.lastvolume})
          totalCurrentVolume += Number(item.lastvolume);
        return (
          <Row className="coin-detail-description-row card card-1" key={item.tosymbol + idx}>
            <div key={item.fromsymbol+"-"+idx}>
              <Row className="coin-row-top-container">
                <Col lg={6}>&nbsp;{item.market}</Col>
                <Col lg={6}>{item.exch_url}</Col>
              </Row>
              <Col lg={3} md={3} xsHidden smHidden>
                <div>
                  <span className="">From</span>
                  <span className="">{item.fromsymbol}</span>
                </div>
                <div>
                  <span className="">To</span>
                  <span className="">
                    <DropdownButton title={item.tosymbol}  className="graph-menu-item-btn">
                      <MenuItem eventKey="1">Dropdown link</MenuItem>
                      <MenuItem eventKey="2">Dropdown link</MenuItem>
                    </DropdownButton>
                  </span>
                </div>
              </Col>
              <Col lg={3} xs={6}>
                <div>
                  <span className="coin-detail-right-1 detail-row-value">{item.high24hour}</span>
                  <span className="coin-detail-left-1 detail-row-label">High 24 Hour</span>
                </div>
                <div>
                  <span className="coin-detail-right-1 detail-row-value">{item.low24hour}</span>
                  <span className="coin-detail-left-1 detail-row-label">Low 24 Hour</span>
                </div>
              </Col>
              <Col lg={3} xs={6}>
                <div>
                  <span className="coin-detail-right-1 detail-row-value">{item.price}</span>
                  <span className="coin-detail-left-1 detail-row-label">Last Price</span>
                </div>
                <div>
                  <span className="coin-detail-right-1 detail-row-value">{item.lastvolume}</span>
                  <span className="coin-detail-left-1 detail-row-label">Last Volume</span>
                </div>
              </Col>
              <Col lg={3} xsHidden smHidden>
                <div>
                  <span className="coin-detail-right-1 detail-row-value">{item.market}</span>
                  <span className="coin-detail-left-1 detail-row-label">Market</span>
                </div>
                <div>
                  <span className="coin-detail-right-1 detail-row-value">{`${moment(item.lastupdate * 1000).format("MM-DD HH:mm ")}`}</span>
                  <span className="coin-detail-left-1 detail-row-label">Last Updated</span>
                </div>
              </Col>
            </div>
          </Row>
        )
        } else {
          return null;
        }
      }).filter(Boolean);
      let otherValues = 0;

      pieExchangeVolumeValues = exchangeVolumeValues.map(function(exchangeValue, idx){
        return {x: exchangeValue.x, y: Number(exchangeValue.y)  * 100};
      }).sort(function(a,b){
        return a.y - b.y;
      });

       currentNormalizedExhangeResponse = pieExchangeVolumeValues.splice(0, 6);

    currentVolumeDistribution = pieExchangeVolumeValues.map(function(exchangeValue , idx){
      return (
        <div key={"percentDistribution"+idx}>
          <span>{exchangeValue.x}</span>
          <span> {(Number(exchangeValue.y)/totalCurrentVolume).toFixed(2)} %</span>
        </div>
      )
    });
    }

    return (
      <div className="coin-detail-container">
        <div className="clear-10"/>
        <Row>
          <Col lg={8} className="exchange-view-left-pane">
            {marketExchangeValues}
          </Col>
          <Col lg={4} className="exchange-view-right-pane">
            <div className="card card-1 coin-exchange-distribution-container">
            <VictoryPie colorScale={["#00B0F1", "#6DD2F7", "#58C99E", "#11B275", "#53959C" ]}
                        style={{ labels: { fill: "white", fontSize: 14, fontWeight: "500" } }}
                        data={currentNormalizedExhangeResponse}/>
            </div>
            <div className="card card-1 coin-exchange-distribution-container coin-exchange-percentages">
              Current Volume Distribution
              <div>
                {currentVolumeDistribution}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}