import ListCoins from './ListCoins';
import {connect} from 'react-redux';
import {getCoinsList, getCoinsListSuccess, getCoinsListFailure,
  getCoinDailyHistoryData, getCoinDailyHistoryDataSuccess, getCoinDayHistoryDataFailure,
  getCoinSearchData, getCoinSearchDataResponse} from '../../actions/coins';

function mapStateToProps(state) {
  return {coins: state.coins}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCoinListData: (range) => {
      dispatch(getCoinsList(range)).then((response)=> {
        if (response.payload.status === 200) {
          dispatch(getCoinsListSuccess(response.payload.data));
        } else {
          dispatch(getCoinsListFailure(response.payload.error));
        }
      })
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
        dispatch(getCoinSearchDataResponse(response.payload.data));
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCoins);