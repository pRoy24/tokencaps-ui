/**
 Copyright Church of Crypto, pRoy24
 */
import React, {Component} from 'react';
import {VictoryChart, VictoryAxis,
  VictoryZoomContainer, VictoryLine,VictoryTooltip, Flyout, VictoryBrushContainer } from 'victory';
import _ from 'lodash';
import {Row, Col, DropdownButton, MenuItem} from 'react-bootstrap';
import moment from 'moment';
import ResponsiveChart from '../graphs/ResponsiveChart';

export default class CoinHomeView extends Component {
  componentWillMount() {
    const {coins: {coinDetail: {symbol}}, match: {params}} = this.props;
    if (params.symbol) {
      this.props.getCoinMonthHistoryData(params.symbol);
    }
  }


  componentWillReceiveProps(nextProps) {

    const {coins: {coinDetail, coinDetail: {symbol, exchangeData}}, match: {params}} = nextProps;


    if (params.symbol && !this.props.coins.coinDetail[params.symbol] && symbol !== this.props.coins.coinDetail.symbol) {
     // this.props.getCoinWeeklyHistoryData(symbol);
    }
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain});
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain});
  }
  render() {
    const {coins: {coinDetail, coinDetail: {coinSnapshot}}} = this.props;
    let coinFullName = "";
    if (coinDetail.detail) {
      coinFullName = coinDetail.detail.fullname;
    }
    const chartStyle = { parent: {minWidth: "100%", marginLeft: "10%", color: "#fff"},
      axis: {
        stroke: 'black',
        strokeOpacity: 0
      },
      ticks: {
        size: 2,
        stroke: 'black',
        strokeOpacity: 0.1
      },
      grid: {
        stroke: 'rgba(0, 0, 0, 0.1)',
        strokeWidth: 1,
        strokeDasharray: '6, 6',
      },
      tickLabels: {
        stroke: "#ECECEC",
        fontSize: '12px',
        fontFamily: 'inherit',
        fillOpacity: 1,
        margin: 0,
        padding: 0
      },
      axisLabel: {
        fontsize: 13
      }
    };
    let marketExchangeValues = <span/>;
    let ccagValues = {};
    if (_.isArray(coinSnapshot) && coinSnapshot.length > 0) {
      ccagValues = coinSnapshot.find(function (item) {
        if (item.market === "CCCAGG") {
          return (item)
        }
      });
      marketExchangeValues =
        <div key={ccagValues.fromsymbol+"-"}>
            <Row className="coin-row-top-container">
              <Col lg={12} xs={12}>{coinFullName}</Col>

            </Row>
            <Col lg={3} sm={3} md={3} xsHidden>
              <div>
                <span className="">From</span>
                <span className="">&nbsp;{ccagValues.fromsymbol}</span>
              </div>
              <div>
                <span className="">To&nbsp;</span>
                <span className="">
                    <DropdownButton title={ccagValues.tosymbol}  id={ccagValues.tosymbol+"btn"} className="graph-menu-item-btn">

                    </DropdownButton>
                  </span>
              </div>
            </Col>
            <Col lg={3} sm={3} md={3} xs={6}>
              <div>
                <span className="coin-detail-right-1 detail-row-value">{ccagValues.high24hour}</span>
                <span className="coin-detail-left-1 detail-row-label">High 24 Hour</span>
              </div>
              <div>
                <span className="coin-detail-right-1 detail-row-value">{ccagValues.low24hour}</span>
                <span className="coin-detail-left-1 detail-row-label">Low 24 Hour</span>
              </div>
            </Col>
            <Col  lg={3} sm={3} md={3} xs={6}>
              <div>
                <span className="coin-detail-right-1 detail-row-value">{ccagValues.price}</span>
                <span className="coin-detail-left-1 detail-row-label">Last Price</span>
              </div>
              <div>
                <span className="coin-detail-right-1 detail-row-value">{ccagValues.lastvolume}</span>
                <span className="coin-detail-left-1 detail-row-label">Last Volume</span>
              </div>
            </Col>
            <Col lg={3}  sm={3} md={3} xsHidden>
              <div>
                <span className="coin-detail-right-1 detail-row-value">{ccagValues.market}</span>
                <span className="coin-detail-left-1 detail-row-label">Market</span>
              </div>
              <div>
                <span className="coin-detail-right-1 detail-row-value">{`${moment(ccagValues.lastupdate * 1000).format("MM-DD HH:mm ")}`}</span>
                <span className="coin-detail-left-1 detail-row-label">Last Updated</span>
              </div>
            </Col>
          </div>
    }
    let coinDataGraph = <span/>;
    let tickValues  = [];

    if (coinDetail.yearlyHistoryData && coinDetail.yearlyHistoryData.length > 0) {
      let weeklyGraphData = coinDetail.yearlyHistoryData.map(function(item){
        tickValues.push(item.time * 1000);
        return {x: item.time * 1000, y: item.open, close: item.close, high: item.high, low: item.low}
      });
      coinDataGraph =
        <div>
        <div className="coin-graph-responsive-container">
          <ResponsiveChart weeklyGraphData={weeklyGraphData}
                           containerComponent={
                             <VictoryZoomContainer responsive={false}
                                                   dimension="x"
                                                   zoomDomain={this.state.zoomDomain}
                                                   onDomainChange={this.handleZoom.bind(this)}
                             />
                           }>
            <VictoryAxis
              style={chartStyle}
              orientation="bottom"
              data={tickValues} scale={{x: "time"}}
            />
            <VictoryAxis dependentAxis style={chartStyle}/>
            <VictoryLine
              style={{
                data: {stroke: "#00B0F1"}
              }}
              labelComponent={<VictoryTooltip flyoutComponent={<Flyout width={100} height={100}/>}/>}
              data={weeklyGraphData}
            />
          </ResponsiveChart>
        </div>
          <div className="coin-graph--handle-responsive-container hidden-xs">
            <ResponsiveChart weeklyGraphData={weeklyGraphData}
                             containerComponent={
                               <VictoryBrushContainer responsive={false}
                                                      dimension="x"
                                                      selectedDomain={this.state.selectedDomain}
                                                      onDomainChange={this.handleBrush.bind(this)}/>
                             }>
              <VictoryAxis
                style={chartStyle}
                orientation="bottom"
                data={weeklyGraphData} scale={{x: "time"}}
              />
              <VictoryAxis dependentAxis style={chartStyle} tickCount={4}/>
              <VictoryLine
                style={{
                  data: {stroke: "#00B0F1"}
                }}
                data={weeklyGraphData}
              />
            </ResponsiveChart>
          </div>
        </div>
    }

    let btnTitle = "";
    if (ccagValues.tosymbol) {
      btnTitle = ccagValues.tosymbol;
    }
    return (
      <div className="coin-detail-container">
        <div className="clear-10"/>

        <Row  className="coin-detail-description-row card card-1 coin-detail-main-row">
            {marketExchangeValues}
        </Row>
        <Row className="coin-detail-graph-description-row card card-1">
          <Col lg={12} className="coin-detail-graph-filter">
            <Col lg={4} xs={3} md={4} sm={4}>
              <DropdownButton title="7 Days"  id="btn-55" className="graph-menu-item-btn"/>
            </Col>
            <Col lg={4} xs={6} md={4} sm={4}>
              <DropdownButton title="Line Graph" id="btn-55" className="graph-menu-item-btn">
                <MenuItem eventKey="1">CandleStick Graph</MenuItem>
              </DropdownButton>
            </Col>
            <Col lg={4} xs={3} md={4} sm={4}>
              <DropdownButton title={btnTitle}  id="btn-55" className="graph-menu-item-btn"/>
            </Col>
          </Col>
          <Col lg={12}>
            <div className="coin-data-graph-container">
            {coinDataGraph}
            </div>
          </Col>
          </Row>
      </div>
    )
  }
}