// pRoy24 TokenPlex

import UserRegisterForm from './UserRegisterForm';
import {connect} from 'react-redux';
import {registerUser, registerUserResponse, validateUserName, validateUserNameResponse} from '../../../actions/user';

function mapStateToProps(state) {
  return {coins: state.coins}
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitRegister: (vals) => {
      dispatch(registerUser(vals)).then((response)=> {
        dispatch(registerUserResponse(response.payload.data));
      })
    },
    validateUserName: (userName) => {
      dispatch(validateUserName(userName)).then((response) => {
        dispatch(validateUserNameResponse(response.payload.data));
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterForm);