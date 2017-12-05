import UserView from './UserView';
import {connect} from 'react-redux';
import {getCoinsList, getCoinsListSuccess, getCoinsListFailure,
  getCoinDailyHistoryData, getCoinDailyHistoryDataSuccess, getCoinDayHistoryDataFailure,
  getCoinSearchData, getCoinSearchDataResponse, getCoinWeeklyHistoryData, getCoinWeeklyHistoryDataSuccess, getCoinWeeklyHistoryDataFailure} from '../../actions/coins';
import {authenticateUser, authenticateUserResponse, resetUser} from '../../actions/user';

import { submitAddCoin, submitAddCoinResponse, addUserCoinWeeklyHistoryData,
        addUserTransaction, addUserTransactionResponse,removeCoinFromProfile, removeCoinFromProfileResponse} from '../../actions/user';

function mapStateToProps(state) {
  return {coins: state.coins, user: state.user}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCoinListData: () => {
      dispatch(getCoinsList()).then((response)=> {
        console.log(response);
        if (response.payload.status === 200) {
          dispatch(getCoinsListSuccess(response.payload.data));
        } else {
          dispatch(getCoinsListFailure(response.payload.error));
        }
      })
    },

    getCoinWeekHistoryData: (coin_symbol) => {
      dispatch(getCoinWeeklyHistoryData(coin_symbol)).then((response) => {
        if (response.payload.status === 200) {
          let normalizedResponse = {};
          normalizedResponse[coin_symbol] = response.payload.data;
          dispatch(addUserCoinWeeklyHistoryData({data: normalizedResponse}));
        } else {
          dispatch(getCoinWeeklyHistoryDataFailure(response.payload.error));
        }
      });
    },

    getCoinDailyHistoryData: (coin_name) => {
      dispatch(getCoinDailyHistoryData(coin_name)).then((response)=> {
        if (response.payload.status === 200) {
          dispatch(getCoinDailyHistoryDataSuccess(response.payload.data));
        } else {
          dispatch(getCoinDayHistoryDataFailure(response.payload.data));
        }
      });
    },
    getCoinSearchData: (coinSearchString) => {
      dispatch(getCoinSearchData(coinSearchString)).then((response) => {
        if (response.payload.status === 200) {
          dispatch(getCoinSearchDataResponse(response.payload.data));
        }
      });
    },

    submitAddCoin: (coinList) => {
      dispatch(submitAddCoin(coinList)).then((response) => {
        if (response.payload.status === 200) {
          dispatch(submitAddCoinResponse(response.payload.data));
        }
      })
    },
    toggleModal: (value) => {
     // dispatch(toggleTransactionModal(value));
    },

    submitAddTransaction: (payload) => {
      dispatch(addUserTransaction(payload)).then((response) => {
        if (response.payload.status === 200) {
          dispatch(addUserTransactionResponse(response.payload.data.data));
        }
      })
    },

    authenticateUser: () => {
      const userToken = localStorage.getItem("token");
      if (userToken && userToken.length > 0) {
        dispatch(authenticateUser(userToken)).then((response) => {
          dispatch(authenticateUserResponse(response.payload.data));
        })
      }
    },

    removeCoin: (coin, user) => {
      const userToken = localStorage.getItem("token");
      dispatch(removeCoinFromProfile(coin, user)).then((response) => {
        dispatch(removeCoinFromProfileResponse(response.payload.data));
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserView);