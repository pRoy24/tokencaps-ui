import CoinHeartBeatView from './CoinHeartBeatView';
import {connect} from 'react-redux';
import {getCoinDetail, getCoinDetailSuccess, getCoinDetailFailure, getCoinDailyHistoryData,
  getCoinDetailDailyHistoryDataFailure, getCoinDetailDailyHistoryDataSuccess, getCoinWeeklyHistoryData, getCoinWeeklyHistoryDataSuccess,
  getCoinWeeklyHistoryDataFailure, resetCoinSnaphsot} from '../../actions/coins';
import {getRedditContent, getRedditContentSuccess, getRedditContentFailure} from '../../actions/webservice';
function mapStateToProps(state) {
  return {
    coins: state.coins,
    webService: state.webService
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCoinSnapshot: (coinSymbol) => {
      dispatch(getCoinDetail(coinSymbol)).then((response)=>{
        if (response.payload.status === 200) {
          dispatch(getCoinDetailSuccess(response.payload.data));
        } else {
          dispatch(getCoinDetailFailure(response.payload.error));
        }
      });
    },
    getCoinDailyHistoryData: (coin_name) => {
      dispatch(getCoinDailyHistoryData(coin_name)).then((response)=> {
        if (response.payload.status === 200) {
          dispatch(getCoinDetailDailyHistoryDataSuccess(response.payload.data));
        } else {
          dispatch(getCoinDetailDailyHistoryDataFailure(response.payload.data));

        }
      });
    },
    getCoinWeeklyHistoryData: (coin_name) => {
      dispatch(getCoinWeeklyHistoryData(coin_name)).then((response)=> {
        if (response.payload.status === 200) {
          dispatch(getCoinWeeklyHistoryDataSuccess(response.payload.data));
        } else {
          dispatch(getCoinWeeklyHistoryDataFailure(response.payload.data));
        }
      });
    },
    resetCoinSnaphsot: () => {
      dispatch(resetCoinSnaphsot());
    },
    getRedditContent: (reddit_url) => {
      dispatch(getRedditContent(reddit_url)).then((response) => {
        if (response.payload.status === 200) {
          dispatch(getRedditContentSuccess(response.payload.data));
        } else {
          dispatch(getRedditContentFailure(response.payload.data));
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinHeartBeatView);