import axios from 'axios';
import {APP_SERVER_URI} from '../config/config';
export const GET_COINS_LIST = 'GET_COINS_LIST';
export const GET_COINS_LIST_SUCCESS = 'GET_COINS_LIST_SUCCESS';
export const GET_COINS_LIST_FAILURE = 'GET_COINS_LIST_FAILURE';
export const GET_COIN_DAILY_HISTORY_DATA = 'GET_COIN_DAILY_HISTORY_DATA';
export const GET_COIN_DAILY_HISTORY_DATA_SUCCESS = 'GET_COIN_DAILY_HISTORY_DATA_SUCCESS';
export const GET_COIN_DAILY_HISTORY_DATA_FAILURE = 'GET_COIN_DAILY_HISTORY_DATA_FAILURE';
export const GET_COIN_DETAIL = 'GET_COIN_DETAIL';
export const GET_COIN_DETAIL_SUCCESS = 'GET_COIN_DETAIL_SUCCESS';
export const GET_COIN_DETAIL_FAILURE = 'GET_COIN_DETAIL_FAILURE';
export const GET_COIN_DETAIL_DAILY_HISTORY_DATA_SUCCESS = 'GET_COIN_DETAIL_DAILY_HISTORY_DATA_SUCCESS';
export const GET_COIN_WEEKLY_HISTORY_DATA_SUCCESS = 'GET_COIN_WEEKLY_HISTORY_DATA_SUCCESS';
export const GET_COIN_WEEKLY_HISTORY_DATA = 'GET_COIN_WEEKLY_HISTORY_DATA';
export const GET_COIN_WEEKLY_HISTORY_DATA_FAILURE = 'GET_COIN_WEEKLY_HISTORY_DATA_FAILURE';
export const GET_COIN_SEARCH_DATA = 'GET_COIN_SEARCH_DATA';
export const GET_COIN_SEARCH_DATA_RESPONSE = 'GET_COIN_SEARCH_DATA_RESPONSE';
export const RESET_COIN_SNAPSHOT = 'RESET_COIN_SNAPSHOT';

export const GET_COIN_YEARLY_HISTORY = 'GET_COIN_YEARLY_HISTORY';
export const GET_COIN_YEARLY_HISTORY_SUCCESS = 'GET_COIN_YEARLY_HISTORY_SUCCESS';
export const GET_COIN_YEARLY_HISTORY_FAILURE = 'GET_COIN_YEARLY_HISTORY_FAILURE';

export function getCoinsList(range) {

  const getCoinsURI = `${APP_SERVER_URI}/coin/get-coin-list?range=${range}`;
  let request = axios.get(getCoinsURI);
  return {
    type : GET_COINS_LIST,
    payload: request
  }
}

export function getCoinsListSuccess(response) {
  return {
    type: GET_COINS_LIST_SUCCESS,
    payload: response.data
  }
}

export function getCoinsListFailure(response) {
  return {
    type: GET_COINS_LIST_FAILURE,
    payload: response
  }
}

export function getCoinDetail(coinSymbol) {
  const request = axios.get(`${APP_SERVER_URI}/coin/get-coin-detail?coin_symbol=${coinSymbol}`);
  return {
    payload: request,
    type: GET_COIN_DETAIL
  }
}

export function getCoinDetailSuccess(response) {
  return {
    payload: response,
    type: GET_COIN_DETAIL_SUCCESS
  }
}

export function getCoinDetailFailure(response) {
  return {
    payload: response,
    type: GET_COIN_DETAIL_FAILURE
  }
}

export function getCoinDetailDailyHistoryDataSuccess(response) {
  return {
    payload: response,
    type: GET_COIN_DETAIL_DAILY_HISTORY_DATA_SUCCESS
  }
}

export function getCoinDetailDailyHistoryDataFailure(response) {
  return {

  }
}

export function getCoinDailyHistoryData(coinSymbol) {
  const getCoinDailyHistoryDataURI = `${APP_SERVER_URI}/coin/coin-day-history?coin_symbol=${coinSymbol}`;
  let request = axios.get(getCoinDailyHistoryDataURI);
  return {
    type: GET_COIN_DAILY_HISTORY_DATA,
    payload: request
  }
}

export function getCoinDailyHistoryDataSuccess(response) {
  return {
    type: GET_COIN_DAILY_HISTORY_DATA_SUCCESS,
    payload: response
  }
}

export function getCoinDayHistoryDataFailure(response) {
  return {
    type: GET_COIN_DAILY_HISTORY_DATA_FAILURE,
    payload: response
  }
}

export function getCoinWeeklyHistoryDataSuccess(response) {
  return {
    payload: response,
    type: GET_COIN_WEEKLY_HISTORY_DATA_SUCCESS
  }
}

export function getCoinWeeklyHistoryData(coinSymbol) {
  const request = axios.get(`${APP_SERVER_URI}/coin/coin-week-history?coin_symbol=${coinSymbol}`);
  return {
    payload: request,
    type: GET_COIN_WEEKLY_HISTORY_DATA
  }
}

export function getCoinWeeklyHistoryDataFailure(response) {
  return {
    payload: response,
    type: GET_COIN_WEEKLY_HISTORY_DATA_FAILURE
  }
}

export function resetCoinSnaphsot() {
  return {
    type: RESET_COIN_SNAPSHOT
  }
}

export function getCoinSearchData(coinSearchString) {
  const request = axios.get(`${APP_SERVER_URI}/coin/search?coin_symbol=${coinSearchString}`);
  return {
    payload: request,
    type: GET_COIN_SEARCH_DATA
  }
}

export function getCoinSearchDataResponse(response) {
  return {
    payload: response,
    type: GET_COIN_SEARCH_DATA_RESPONSE
  }
}

export function getCoinYearHistoryData(coin_symbol) {
  const request = axios.get(`${APP_SERVER_URI}/coin/coin-week-history?coin_symbol=${coin_symbol}`);
  return {
    payload: request,
    type: GET_COIN_YEARLY_HISTORY
  }
}

export function getCoinYearHistoryDataSuccess(response) {
  return {
    payload: response,
    type: GET_COIN_YEARLY_HISTORY_SUCCESS
  }
}

export function getCoinYearHistoryDataFailure(response) {
  return {
    payload: response,
    type: GET_COIN_YEARLY_HISTORY_FAILURE
  }
}

