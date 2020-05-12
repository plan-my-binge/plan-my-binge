import {connect} from 'react-redux'
import {toggleBookmark} from "./actionCreater";
import {BingeDetail} from "../components/BingeDetail";
import {getBookmarkStatus} from "./selectors";

const mapStateToProps = (state, ownProps) => {
  return {
    bookmark: getBookmarkStatus(ownProps.detail.pmbId)(state)
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleBookmark: (id) => dispatch(toggleBookmark(id))
  }
};

const BingeDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BingeDetail);

export default BingeDetailContainer