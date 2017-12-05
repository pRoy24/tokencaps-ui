/**
 Copyright Church of Crypto, pRoy24
 */
import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';

export default class CoinTechnicalView extends Component {
  render() {
    const {coins: {coinDetail, coinDetail: {coinSocial}}, match: {params}, webService} = this.props;

    let repoData= <div className="empty-text-container">Such Empty</div>;
    if (_.isObject(coinSocial) && _.isArray(coinSocial.CodeRepository.List)) {
      repoData = coinSocial.CodeRepository.List.map(function (repo) {
        return <Row className="coin-detail-description-row card card-1">
          <Row className="coin-row-top-container">
            <Col lg={4}>
              <div className="coin-social-label-head">
                {repo.url.split("/")[repo.url.split("/").length - 1]}
              </div>
            </Col>
            <Col lg={8} xs={12}>
              <div className="coin-social-label-head">
                <i className="fa fa-github" aria-hidden="true"/>
                <a href={repo.url} target="_blank"> {repo.url}</a>
              </div>
            </Col>

          </Row>

          <Col lg={4} xs={4}>
            <div >
              <span
                className="coin-detail-right-1 detail-row-value">{moment.unix(repo.created_at).format("MM/DD/YYYY")}</span>
              <span className="coin-detail-left-1 detail-row-label">Created</span>
            </div>
            <div>
              <span className="coin-detail-right-1 detail-row-value">{moment.unix(repo.last_push).format("MM/DD/YYYY")}</span>
              <span className="coin-detail-left-1 detail-row-label">Last Push</span>
            </div>
          </Col>
          <Col lg={4} xs={4}>
            <div >
              <span className="coin-detail-right-1 detail-row-value">{repo.language || "-"}</span>
              <span className="coin-detail-left-1 detail-row-label">Language</span>
            </div>
            <div>
              <span className="coin-detail-right-1 detail-row-value">{repo.forks}</span>
              <span className="coin-detail-left-1 detail-row-label">Forks</span>
            </div>
          </Col>
          <Col lg={4} xs={4}>
            <div >
              <span className="coin-detail-right-1 detail-row-value">{repo.stars}</span>
              <span className="coin-detail-left-1 detail-row-label">Stars</span>
            </div>
            <div>
              <span className="coin-detail-right-1 detail-row-value">{repo.subscribers}</span>
              <span className="coin-detail-left-1 detail-row-label">Subscribers</span>
            </div>
          </Col>
        </Row>
      });
    }
    return (
      <div className="coin-detail-container coin-technical-view-container">
        <div className="clear-10"/>
        {repoData}
      </div>
    )
  }
}