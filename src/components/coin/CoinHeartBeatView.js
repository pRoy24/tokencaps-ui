/**
 Copyright Church of Crypto, pRoy24
 */
import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import './CoinHeartBeatView.css';
import _ from 'lodash';

export default class CoinHeartBeatView extends Component {

  componentDidMount() {
    const {coins: { coinDetail: {coinSocial}}} = this.props;
    if (coinSocial && coinSocial.Reddit) {
      this.props.getRedditContent(coinSocial.Reddit.link +"hot.json?sort=hot&limit=10&t=all");
    }

  }

  componentWillReceiveProps(nextProps) {
    const {coins: {coinDetail, coinDetail: {coinSocial}}, match: {params}, webservice} = this.props;
    if (!this.props.coins.coinDetail.coinSocial && coinSocial && coinSocial.Reddit.link) {
      this.props.getRedditContent(coinSocial.Reddit.link + "new.json?sort=new");
    }
  }

  render() {
    const {coins: {coinDetail, coinDetail: {coinSocial}}, match: {params}, webService} = this.props;
    let redditContent = <span/>;
    let coinHeartBeatData = <span/>;
    if (_.isObject(coinSocial)) {
      coinHeartBeatData =
      <Row className="coin-detail-description-row card card-1" >
        <Row className="coin-row-top-container">
          <Col lg={4} xs={12}>
            <div className="coin-social-label-head">
              <i className="fa fa-facebook" aria-hidden="true"/> {coinSocial.Facebook.link}
            </div>
          </Col>
          <Col lg={4} xs={12}>
            <div className="coin-social-label-head">
              <i className="fa fa-twitter" aria-hidden="true"/> {coinSocial.Twitter.link}
            </div>
          </Col>
          <Col lg={4} xs={12}>
            <div className="coin-social-label-head">
              <i className="fa fa-reddit-alien" aria-hidden="true"/> {coinSocial.Reddit.link}
            </div>
          </Col>
        </Row>
        <Col lg={4} xs={4}>
          <div >
            <span className="coin-detail-right-1 detail-row-value">{coinSocial.Facebook.likes}</span>
            <span className="coin-detail-left-1 detail-row-label">Likes</span>
          </div>
          <div>
            <span className="coin-detail-right-1 detail-row-value">{coinSocial.Facebook.talking_about}</span>
            <span className="coin-detail-left-1 detail-row-label">Talking About</span>
          </div>
        </Col>
        <Col lg={4} xs={4}>
          <div>
            <span className="coin-detail-right-1 detail-row-value">{coinSocial.Twitter.followers}</span>
            <span className="coin-detail-left-1 detail-row-label">Followers</span>
          </div>
          <div>
            <span className="coin-detail-right-1 detail-row-value">{coinSocial.Twitter.statuses}</span>
            <span className="coin-detail-left-1 detail-row-label">Tweets</span>
          </div>
        </Col>
        <Col lg={4} xs={4}>
          <div>
            <span className="coin-detail-right-1 detail-row-value">{coinSocial.Reddit.active_users}</span>
            <span className="coin-detail-left-1 detail-row-label">Active Users</span>
          </div>
          <div>
            <span className="coin-detail-right-1 detail-row-value">{coinSocial.Reddit.subscribers}</span>
            <span className="coin-detail-left-1 detail-row-label">Subscribers</span>
          </div>
        </Col>
      </Row>
    }
    if (webService && webService.redditContent && webService.redditContent.children) {
      redditContent = webService.redditContent.children.map(function(contentItem, idx){
        let itemHtml = [];
        let titleHTML = <span/>;
        if (contentItem.data && contentItem.data.preview && contentItem.data.preview.images[0]) {
          let imgAttrs = contentItem.data.preview.images[0].source;
          itemHtml.push(
            <Col lg={2} key={"img"+idx}>
              <img src={imgAttrs.url} style={{"position": "relative", "width": "100px", height: "100px"}}/>
            </Col>);
        } else {
          itemHtml.push(
            <Col lg={2} key={"img"+idx}>
              <img src={"http://via.placeholder.com/350x150"} style={{"position": "relative", "width": "100px", height: "60px"}}/>
            </Col>);
        }

        let currentPermaLink = "http://reddit.com/" + contentItem.data.permalink;
        if (contentItem.data.selftext) {
          itemHtml.push(
            <Col lg={10}>
              <div className="reddit-tldr-cell">
              {contentItem.data.selftext}
              </div>
              <div className="reddit-link-cell">
                <span>Read More at: </span>
                <a href={currentPermaLink} target="_blank">{contentItem.data.permalink}</a>
              </div>
            </Col>
          )
        } else {
          itemHtml.push(
            <Col lg={10}>
            <div className="reddit-link-cell">
              <span>Read More at: </span>
              <a href={currentPermaLink} target="_blank">{contentItem.data.permalink}</a>
            </div>
            </Col>
          )
        }
        if (contentItem.data.title) {
          titleHTML = (
            <Row className="coin-row-top-container">
              {contentItem.data.title}
            </Row>
          )
        }
        return <Row className="coin-detail-description-row card card-1" >{titleHTML}{itemHtml}</Row>;
      });

    }
    return (
      <div className="coin-detail-container">
        <div className="clear-10"/>
        {coinHeartBeatData}
        {redditContent}
      </div>
    );
  };
}