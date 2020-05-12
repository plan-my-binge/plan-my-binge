import {connect} from 'react-redux'
import {BottomNavBarWithRouter} from "../components/BottomNavBar";

const mapStateToProps = (state, ownProps) => {
  return {
    inputFocused: state.app.inputFocused
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({});

const BottomNavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomNavBarWithRouter);

export default BottomNavContainer