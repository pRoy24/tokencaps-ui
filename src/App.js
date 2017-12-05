import React, { Component } from 'react';
import './Styles.css';
import 'bootstrap/dist/css/bootstrap.css';


import IndexView from '../src/components/List/IndexView';
import CoinViewContainer from '../src/components/coin/CoinViewContainer';
import CoinExchangeView from '../src/components/coin/CoinExchangeView';
import CoinHeartBeatView from '../src/components/coin/CoinHeartBeatView';
import CoinTechnicalView from '../src/components/coin/CoinTechnicalView';
import CoCMission from '../src/components/mission/CoCMission';
import CocHome from '../src/components/home/CoCHome';
import { Switch, Route, BrowserRouter, Router } from 'react-router-dom';
import UserViewContainer from '../src/components/user/UserViewContainer';
import CoCDonate from '../src/components/donate/CoCDonate';
import License from '../src/components/license/license';
import history from '../src/history';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <IndexView>
          <Switch>
            <Route exact path='/' component={CocHome}/>
            <Route exact path='/home' component={CocHome}/>
            <Route path="/user" component={UserViewContainer}/>
            <Route path={"/donate"} component={CoCDonate}/>
            <Route path={"/mission"} component={CoCMission}/>
            <Route path={"/license"} component={License}/>
            <Route path='/token/:symbol' component={CoinViewContainer}>
              <Route path={"token/:symbol/home"} component={CoinViewContainer}/>
              <Route path={"token/:symbol/exchanges"} component={CoinExchangeView}/>
              <Route path={"token/:symbol/heartbeat"} component={CoinHeartBeatView}/>
              <Route path={"token/:symbol/technical"} component={CoinTechnicalView}/>
            </Route>
          </Switch>
        </IndexView>
      </Router>
    );
  }
}

export default App;
