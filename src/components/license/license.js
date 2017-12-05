// pRoy24 TokenPlex
import React, { Component } from 'react';
import NavBarContainer from '../nav/NavBarContainer';

const EULA_STRNG = ""
export default class License extends Component {
  render () {
    return (
      <div>
        <div className="container-fluid coc-app">
          <NavBarContainer openLogin={this.openLogin} openRegister={this.openRegister}/>
          <div className="content-component">
            <div dir="ltr">
              <h2>Privacy:</h2>
              <p>We will not share your date or use it in any form other than what you willingly share through the website.</p>
              <h2>Monetization</h2>
              <p>Currently, we are operating solely on donations and do not have any plans to monetize the product in the future.</p>
              <h2>Accuracy</h2>
              <p>This portal serves data from a centralized aggregator over multiple sources.</p>
              <p>We try our best to preserve accurate and up to date information from 3rd party sources.</p>
              <p>However we bear no responsibility regarding the accuracy of the data.</p>
              <h2>Responsibility</h2>
              <p>This portal serves as informational purposes only and gathers data from multiple 3rd party sources.</p>
              <p>We do not hold any responsibility for decisions made as a result of viewing information on the portal.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}