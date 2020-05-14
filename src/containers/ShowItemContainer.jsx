import {connect} from 'react-redux'
import {markShowAsVisited} from "./actionCreater";
import {ShowItem} from "../components/ShowItem";

const mapStateToProps = (state, ownProps) => {
  return {
    userBingeTime: state.user.userBingeTime
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    markShowAsVisited: (id) => dispatch(markShowAsVisited(id))
  }
};

const ShowItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowItem);

export default ShowItemContainer