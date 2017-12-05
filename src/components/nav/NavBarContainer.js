// pRoy24 TokenPlex

import SideNavBar from './SideNavBar';
import {connect} from 'react-redux';
import {authenticateUser, authenticateUserResponse, resetUser} from '../../actions/user';

import { submitAddCoin, submitAddCoinResponse, addUserCoinWeeklyHistoryData,
  addUserTransaction, addUserTransactionResponse} from '../../actions/user';

function mapStateToProps(state) {
  return {coins: state.coins, user: state.user}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerData: () => {
      const userToken = localStorage.getItem("token");
      if (userToken && userToken.length > 0) {
        dispatch(authenticateUser(userToken)).then((response) => {
          dispatch(authenticateUserResponse(response.payload.data));
        })
      }
    },
    resetUser: () => {
      dispatch(resetUser());
    },

    submitAddCoin: (coinList) => {
      dispatch(submitAddCoin(coinList)).then((response) => {
        if (response.payload.status === 200) {
          dispatch(submitAddCoinResponse(response.payload.data));
        }
      })
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);