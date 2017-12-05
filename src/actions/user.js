import axios from 'axios';
import {APP_SERVER_URI} from '../config/config';

export const SUBMIT_ADD_COIN = 'SUBMIT_ADD_COIN';
export const SUBMIT_ADD_COIN_RESPONSE = 'SUBMIT_ADD_COIN_RESPONSE';
export const ADD_USER_WEEK_DATA = 'ADD_USER_WEEK_DATA';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_RESPONSE = 'LOGIN_USER_RESPONSE';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_RESPONSE = 'REGISTER_USER_RESPONSE';

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const AUTHENTICATE_USER_RESPONSE = 'AUTHENTICATE_USER_RESPONSE';

export const ADD_USER_TRANSACTION = 'ADD_USER_TRANSACTION';
export const ADD_USER_TRANSACTION_RESPONSE = 'ADD_USER_TRANSACTION_RESPONSE';

export const VALIDATE_USER_NAME = 'VALIDATE_USER_NAME';
export const VALIDATE_USER_NAME_RESPONSE = 'VALIDATE_USER_NAME_RESPONSE';

export const RESET_USER = 'RESET_USER';

export const REMOVE_COIN_FROM_PROFILE = 'REMOVE_COIN_FROM_PROFILE';
export const REMOVE_COIN_FROM_PROFILE_RESPONSE = 'REMOVE_COIN_FROM_PROFILE_RESPONSE';

export function submitAddCoin(coinList) {
  let queryStr = "coinList=" + JSON.stringify(coinList);
  let authToken = localStorage.getItem("token");
  let transactionHeaders = {
    headers: { Authorization: "Bearer " + authToken}}

  const request = axios.get(`${APP_SERVER_URI}/users/list-coin?${queryStr}`, transactionHeaders);
  return {
    payload: request,
    type: SUBMIT_ADD_COIN
  }
}

export function submitAddCoinResponse(response) {
  return {
    payload: response,
    type: SUBMIT_ADD_COIN_RESPONSE
  }
}

export function addUserCoinWeeklyHistoryData(response) {
  return {
    payload: response,
    type: ADD_USER_WEEK_DATA
  }
}

export function loginUser(values) {
  const request = axios.post(`${APP_SERVER_URI}/users/login-user`, values);
  return {
    payload: request,
    type: LOGIN_USER
  }
}

export function loginUserResponse(response) {
  return {
    payload: response,
    type: LOGIN_USER_RESPONSE
  }
}

export function registerUser(values) {
  const request = axios.post(`${APP_SERVER_URI}/users/register-user`, values);
  return {
    payload: request,
    type: REGISTER_USER
  }
}

export function registerUserResponse(response) {
  return {
    payload: response,
    type: REGISTER_USER_RESPONSE
  }
}

export function authenticateUser(userToken) {
  let values = {token: userToken};
  const request = axios.post(`${APP_SERVER_URI}/users/authenticate-user`, values);
  return {
    payload: request,
    type: AUTHENTICATE_USER
  }
}

export function authenticateUserResponse(responseData) {
  return {
    payload: responseData,
    type: AUTHENTICATE_USER_RESPONSE
  }
}

export function addUserTransaction(transactionPayload) {
  let authToken = localStorage.getItem("token");
  let transactionHeaders = {
    headers: { Authorization: "Bearer " + authToken}}
  const request = axios.post(`${APP_SERVER_URI}/users/add-user-transaction`, transactionPayload, transactionHeaders);
  return {
    payload: request,
    type: ADD_USER_TRANSACTION
  }
}

export function addUserTransactionResponse(responseData) {
  return {
    payload: responseData,
    type: ADD_USER_TRANSACTION_RESPONSE
  }
}

export function validateUserName(userName) {
  const request = axios.get(`${APP_SERVER_URI}/users/validate-user-name?username=${userName}`, userName);
  return {
    payload: request,
    type: VALIDATE_USER_NAME
  }
}

export function validateUserNameResponse(response) {
  return {
    payload: response,
    type: VALIDATE_USER_NAME_RESPONSE
  }
}

export function resetUser() {
  return {
    type: RESET_USER
  }
}

export function removeCoinFromProfile(coin, user) {
  let authToken = localStorage.getItem("token");
  let transactionHeaders = {
    headers: { Authorization: "Bearer " + authToken}}

  const request = axios.delete(`${APP_SERVER_URI}/users/delete-coin?user=${user}&coin=${coin}`, transactionHeaders);
  return {
    type: REMOVE_COIN_FROM_PROFILE,
    payload: request
  }
}

export function removeCoinFromProfileResponse(response) {
  return {
    type: REMOVE_COIN_FROM_PROFILE_RESPONSE,
    payload: response
  }
}