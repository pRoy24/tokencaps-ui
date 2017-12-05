import {SUBMIT_ADD_COIN_RESPONSE, SUBMIT_ADD_COIN, ADD_USER_WEEK_DATA,
LOGIN_USER, LOGIN_USER_RESPONSE, REGISTER_USER, REGISTER_USER_RESPONSE,
  AUTHENTICATE_USER, AUTHENTICATE_USER_RESPONSE, ADD_USER_TRANSACTION,
  ADD_USER_TRANSACTION_RESPONSE, RESET_USER, VALIDATE_USER_NAME, VALIDATE_USER_NAME_RESPONSE,
  REMOVE_COIN_FROM_PROFILE_RESPONSE, REMOVE_COIN_FROM_PROFILE} from '../actions/user';
import _ from 'lodash';
import {isNonEmptyObject} from '../utils/ObjectUtils';

const initialState = {userCoinList: [], currentUser: {}}
export  default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_ADD_COIN:
      return {...state, userCoinList: []}
    case SUBMIT_ADD_COIN_RESPONSE:
      let userList = action.payload.data.sort((a, b)=>(a.symbol > b.symbol))
      return {...state, userCoinList: userList}

    case ADD_USER_WEEK_DATA:
      let currentUserCoinList = state.userCoinList;
      let currentHistoryData = action.payload.data;
      if (isNonEmptyObject(currentHistoryData)) {
        const coinSymbol = Object.keys(currentHistoryData)[0];
        for (let counter = 0; counter < currentUserCoinList.length; counter++) {
          if (currentUserCoinList[counter].symbol === coinSymbol) {
            currentUserCoinList[counter].weekly_data = currentHistoryData[coinSymbol].data;
            break;
          }
        }
      }
      return {...state, userCoinList: currentUserCoinList}

      case LOGIN_USER:
        return {...state, currentUser: {}};

    case LOGIN_USER_RESPONSE:
      if (action.payload.data && action.payload.data.token) {
        const userToken = action.payload.data.token;
        localStorage.setItem("token", userToken);
      }
      return {...state, currentUser: action.payload.data};
    case REGISTER_USER:
      return {...state, currentUser: {}};
    case REGISTER_USER_RESPONSE:
      if (action.payload.data && action.payload.data.token) {
        localStorage.setItem("token", action.payload.data.token);
      }
      return {...state, currentUser: action.payload.data};
    case AUTHENTICATE_USER:
      return {...state, currentUser: {}};
    case AUTHENTICATE_USER_RESPONSE:
      return {...state, currentUser: action.payload.data};
    case ADD_USER_TRANSACTION_RESPONSE:
      return {...state, currentUser: action.payload};
    case RESET_USER:
      return {...state, currentUser: {}, userCoinList: []}
    case VALIDATE_USER_NAME:
      return {...state, validateUser: {}};
    case VALIDATE_USER_NAME_RESPONSE:
      return {...state, validateUser:action.payload.data};
    case REMOVE_COIN_FROM_PROFILE:
      return {...state}
    case REMOVE_COIN_FROM_PROFILE_RESPONSE:
      let userNew = _.clone(state.currentUser, true);
      let userCoinList = _.clone(state.userCoinList, true);
      if (action.payload && isNonEmptyObject(action.payload.data)) {
        userNew = action.payload.data.currentUser;
        userCoinList = action.payload.data.coinList;
      }
      return {...state, currentUser: userNew, userCoinList: userCoinList.sort((a, b)=>(a.symbol > b.symbol))};
    default:
      return {...state};
  }
}