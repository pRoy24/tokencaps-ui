/**
 Copyright Church of Crypto, pRoy24
 */
import axios from 'axios';

export const GET_REDDIT_CONTENT = 'GET_REDDIT_CONTENT';
export const GET_REDDIT_CONTENT_SUCCESS = 'GET_REDDIT_CONTENT_SUCCESS';
export const GET_REDDIT_CONTENT_FAILURE = 'GET_REDDIT_CONTENT_FAILURE';

export function getRedditContent(subRedditURI) {
  const request = axios.get(subRedditURI);
  return {
    type: GET_REDDIT_CONTENT,
    payload: request
  }
}

export function getRedditContentSuccess(response) {
  return {
    type: GET_REDDIT_CONTENT_SUCCESS,
    payload: response
  }
}

export function getRedditContentFailure(error) {
  return {
    type: GET_REDDIT_CONTENT_FAILURE,
    payload: error
  }
}