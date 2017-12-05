import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer navbar-fixed-bottom coc-footer-component text-center">
          &copy; Token Plex.
        <span>&nbsp;API Powered by <a href="https://www.cryptocompare.com/api/">
          <span className="footer-link"> https://www.cryptocompare.com/api/</span></a></span>
      </div>
    )
  }
}