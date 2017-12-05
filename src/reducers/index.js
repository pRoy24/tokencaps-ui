import { combineReducers } from 'redux'
import coinsReducer from './coins';
import userReducer from './user';
import webservicesReducer from './webservice';
import { reducer as formReducer } from 'redux-form';

const cocReducer = combineReducers({
  coins : coinsReducer,
  user: userReducer,
  webService: webservicesReducer,
  form: formReducer
})

export default cocReducer