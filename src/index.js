import React from 'react';
import ReactDOM from 'react-dom';
import PlanMyBinge from "./components/PlanMyBinge.jsx";
import './style/app.less'
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import {offline} from '@redux-offline/redux-offline';
import {register} from 'register-service-worker'

import {Provider} from "react-redux";
import rootReducer from "./reducers/rootReducer";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
  enhancers: [offline(offlineConfig)]
});

ReactDOM.render(
  <Provider store={store}>
    <PlanMyBinge/>,
  </Provider>,
  document.getElementById('app'));


register('/serviceWorker.js', {
  registrationOptions: {scope: './'},
  ready(registration) {
    console.log('Service worker is active.')
  },
  registered(registration) {
    console.log('Service worker has been registered.')
  },
  cached(registration) {
    console.log('Content has been cached for offline use.')
  },
  updatefound(registration) {
    console.log('New content is downloading.')
  },
  updated(registration) {
    console.log('New content is available; please refresh.')
  },
  offline() {
    console.log('No internet connection found. App is running in offline mode.')
  },
  error(error) {
    console.error('Error during service worker registration:', error)
  }
});