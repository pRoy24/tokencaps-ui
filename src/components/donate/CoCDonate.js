/**
 Copyright Church of Crypto, pRoy24
 */
import React, { Component } from 'react';
import BitCoinWallet from './bitcoin_wallet.png';
import EtherWallet from './ether_wallet.png';
import {Well} from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';

export default class CoCDonate extends Component {
  render() {
    return(
      <div className="donation-box-container">
        <div className="text-center donation-box-container-label">
          Donations help keep the servers running...
        </div>
        <Row className="coin-detail-description-row card card-1" >
          <Row className="coin-row-top-container donation-coin-label">
             Bitcoin
          </Row>
          <Row>
            <Col lg={4}>
              <img src={BitCoinWallet} className="wallet-img-block"/>
            </Col>
            <Col lg={8}>
              <Well className="wallet-address-block">
                1PFQ2WQgdsx3KeRbY2KLbb8VzmsPgzLwYu
              </Well>
            </Col>
          </Row>
        </Row>
        <Row className="coin-detail-description-row card card-1" >
          <Row className="coin-row-top-container donation-coin-label">
            Ethereum
          </Row>
          <Row>
            <Col lg={4}>
              <img src={EtherWallet} className="wallet-img-block"/>
            </Col>
            <Col lg={8}>
              <Well className="wallet-address-block">
                0x8702BE27a7C5ADcF8468cE0908Ca9e066C53C6d4
              </Well>
            </Col>
          </Row>
        </Row>

      </div>
    )
  }
}