import CoinExchangeView from './CoinExchangeView';
import {connect} from 'react-redux';
import {getCoinDetail, getCoinDetailSuccess, getCoinDetailFailure, getCoinDailyHistoryData,
  getCoinDetailDailyHistoryDataFailure, getCoinDetailDailyHistoryDataSuccess,
  getCoinWeeklyHistoryData, getCoinWeeklyHistoryDataSuccess,
  getCoinWeeklyHistoryDataFailure, resetCoinSnaphsot} from '../../actions/coins';

function mapStateToProps(state) {
  return {coins: state.coins}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinExchangeView);