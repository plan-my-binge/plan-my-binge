import {connect} from 'react-redux'
import {setUserBingeTime, toggleBookmark} from "./actionCreater";
import {BingeDetail} from "../components/BingeDetail";
import {getBookmarkStatus} from "./selectors";

const mapStateToProps = (state, ownProps) => {
  return {
    bookmark: getBookmarkStatus(ownProps.detail.pmbId)(state),
    userBingeTime: state.user.userBingeTime
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleBookmark: (id) => dispatch(toggleBookmark(id)),
    setUserBingeTime: ({value, unit}) => dispatch(setUserBingeTime({value, unit}))
  }
};

const BingeDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BingeDetail);

export default BingeDetailContainer