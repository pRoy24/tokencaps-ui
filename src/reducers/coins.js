import { GET_COINS_LIST, GET_COINS_LIST_SUCCESS, GET_COINS_LIST_FAILURE, GET_COIN_DAILY_HISTORY_DATA,
GET_COIN_DAILY_HISTORY_DATA_SUCCESS, GET_COIN_DAILY_HISTORY_DATA_FAILURE, GET_COIN_DETAIL,
GET_COIN_DETAIL_SUCCESS, GET_COIN_DETAIL_FAILURE, GET_COIN_DETAIL_DAILY_HISTORY_DATA_SUCCESS,
  GET_COIN_WEEKLY_HISTORY_DATA_SUCCESS, RESET_COIN_SNAPSHOT, GET_COIN_SEARCH_DATA,
  GET_COIN_SEARCH_DATA_RESPONSE, GET_COIN_YEARLY_HISTORY, GET_COIN_YEARLY_HISTORY_SUCCESS,
  GET_COIN_YEARLY_HISTORY_FAILURE} from '../actions/coins';
import _ from 'lodash';
import {isNonEmptyObject} from '../utils/ObjectUtils';

const initialState = {coinsList: [], coinDetail: {}, searchData: []}
export  default function coinsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COINS_LIST:
      return {...state, coinsList: []}
    case GET_COINS_LIST_SUCCESS:
      return {...state, coinsList: action.payload}
    case GET_COIN_DAILY_HISTORY_DATA:
      return {...state}
    case GET_COIN_DAILY_HISTORY_DATA_SUCCESS:
      let historyData = action.payload.data;
      let currentCoinList = _.clone(state.coinsList, true);
      Object.keys(historyData).forEach(function(symbolKey){
        let currentCoin = currentCoinList.find((coin, idx, arr)=>{
          if (coin.symbol === symbolKey) {
            arr[idx].history_data = historyData[symbolKey];
          }
        })
      });
      return {...state, coinsList: currentCoinList};
    case GET_COIN_DAILY_HISTORY_DATA_FAILURE:
      return {...state};
    case GET_COIN_DETAIL_SUCCESS:
      let currentCoinDetail = _.clone(state.coinDetail, true);
      let  newCoinDetail = currentCoinDetail;
      if (isNonEmptyObject(action.payload.data)) {
        newCoinDetail =
          Object.assign({}, currentCoinDetail, action.payload.data[Object.keys(action.payload.data)[0]]);
      }
      return {...state, coinDetail: newCoinDetail}

    case GET_COIN_DETAIL_DAILY_HISTORY_DATA_SUCCESS:
      currentCoinDetail = _.clone(state.coinDetail, true);
      currentCoinDetail.dailyHistoryData = action.payload.data[Object.keys(action.payload.data)[0]];
      return {...state, coinDetail: currentCoinDetail}
    case GET_COIN_WEEKLY_HISTORY_DATA_SUCCESS:
      let coinDetail = _.clone(state.coinDetail, true);
      coinDetail.weeklyHistoryData = action.payload.data[Object.keys(action.payload.data)[0]];
      return {...state, coinDetail: coinDetail}
    case RESET_COIN_SNAPSHOT:
      return {...state, coinDetail: {}};
    case GET_COIN_SEARCH_DATA:
      return {...state, searchData: []};
    case GET_COIN_SEARCH_DATA_RESPONSE:
      return {...state, searchData: action.payload.data};
    case GET_COIN_YEARLY_HISTORY:
      return {...state, yearlyHistoryData: {}};
    case GET_COIN_YEARLY_HISTORY_SUCCESS:
      coinDetail = _.clone(state.coinDetail, true);
      coinDetail.yearlyHistoryData = action.payload.data;
      return {...state, coinDetail: coinDetail};
    case GET_COIN_YEARLY_HISTORY_FAILURE:
      return {...state, yearlyHistoryData: action.payload.error};
    default:
      return {...state};
  }
}
