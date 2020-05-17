import React, {Component} from "react";
import {NavigationMenus} from "./NavigationMenus.jsx";
import styled from 'styled-components';
import {MainContent} from "./MainContent.jsx";
import {NavOptions} from "../utils/Constants";
import {connect} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {setSessionId, setUserId} from "../containers/actionCreater";
import {generateUUID} from "../utils/jsUtils";
import ReactGA from "react-ga";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSelection: NavOptions[0]
    }
  }

  componentDidMount() {
    let userId = this.props.userId || generateUUID();
    let sessionId = generateUUID();
    this.props.setUserId(userId);
    this.props.setSessionId(sessionId);
    ReactGA.set({userId, sessionId});
  }

  render() {
    return <StyledContainer>
      {this.props.ready &&
      <BrowserRouter>
        <NavigationMenus onNavChange={(menuSelection) => this.setState({menuSelection})}
                         selection={this.state.menuSelection}/>
        <MainContent/>
      </BrowserRouter>}
    </StyledContainer>;
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    ready: state.app.ready,
    userId: state.user.userId,
    sessionId: state.user.sessionId,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setUserId: (id) => dispatch(setUserId(id)),
  setSessionId: (id) => dispatch(setSessionId(id)),
});

export const AppContainer = connect(mapStateToProps,
  mapDispatchToProps
)(App);

const StyledContainer = styled.div`
  font-family: "Open Sans", "Helvetica Neue", Arial, sans-serif;
  line-height: 1.6;
  font-size: 18px;
  
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;