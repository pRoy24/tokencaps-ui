// pRoy24 TokenPlex

import IndexView from './IndexView';
import {connect} from 'react-redux';


function mapStateToProps(state) {
  return {coins: state.coins}
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView);