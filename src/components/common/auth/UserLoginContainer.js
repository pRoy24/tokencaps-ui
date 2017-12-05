// pRoy24 TokenPlex

import UserLoginForm from './UserLoginForm';
import {connect} from 'react-redux';
import {loginUser, loginUserResponse} from '../../../actions/user';

function mapStateToProps(state) {
  return {coins: state.coins}
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitLogin: (vals) => {
      dispatch(loginUser(vals)).then((response)=> {
        dispatch(loginUserResponse(response.payload.data));
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginForm);