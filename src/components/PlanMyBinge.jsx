import React, {Component} from 'react';
import {AppContainer} from "./AppContainer.jsx";
if (!process.env.SSR) require('../style/app.less');

class PlanMyBinge extends Component {
  render () {
    return <AppContainer/>
  }
}

export default PlanMyBinge;
