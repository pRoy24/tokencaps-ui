import {GET_REDDIT_CONTENT, GET_REDDIT_CONTENT_SUCCESS, GET_REDDIT_CONTENT_FAILURE} from '../actions/webservice';
import _ from 'lodash';

const initialState = {redditContent: {}, coinDetail: {}, searchData: []}
export  default function webservicesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REDDIT_CONTENT:
      return {...state, redditContent: {}}
    case GET_REDDIT_CONTENT_SUCCESS:
      return {...state, redditContent: action.payload.data}
    case GET_REDDIT_CONTENT_FAILURE:
      return {...state, redditContent: {}}
    default:
      return {...state};
  }
}