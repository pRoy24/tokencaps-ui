/**
 Copyright Church of Crypto, pRoy24
 */
import React, { Component } from 'react';

export default class CoCMission extends Component {
  render() {
    return (
      <div className="coc-mission-container">
        <span className="mission-header"> This Project Aims To </span>
        <span className="mission-text">Provide comprehensive open source crypto data aggregation APIs.</span>
        <span className="mission-text">Build communities across tokens and utilities.</span>
        <span className="mission-text">Provide technical analysis and protfolio management toolkit.</span>
        <div className="mission-footer">Project Source Code - https://github.com/cryptoutils/thechurchofcrypto</div>
      </div>
    )
  }
}