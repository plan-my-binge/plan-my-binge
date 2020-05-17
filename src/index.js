import React from 'react';
import ReactDOM from 'react-dom';
import PlanMyBinge from "./components/PlanMyBinge.jsx";
import './style/app.less'
import {register} from 'register-service-worker'
import { PersistGate } from 'redux-persist/integration/react'
import { persistReducer, persistStore } from 'redux-persist'

import {Provider} from "react-redux";
import rootReducer from "./reducers/rootReducer";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import showSaga from "./containers/showsSaga";
import storage from 'redux-persist/lib/storage'

// const appOfflineConfig = {
//   ...offlineConfig, persistOptions: {
//     blacklist: ['showDetailPage', 'app']
//   }
// };

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: persistedReducer,
  middleware
});
let persistor = persistStore(store);

sagaMiddleware.run(showSaga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PlanMyBinge/>
    </PersistGate>

  </Provider>,
  document.getElementById('app'));


// register('/serviceWorker.js', {
//   registrationOptions: {scope: './'},
//   ready(registration) {
//     console.log('Service worker is active.')
//   },
//   registered(registration) {
//     console.log('Service worker has been registered.')
//   },
//   cached(registration) {
//     console.log('Content has been cached for offline use.')
//   },
//   updatefound(registration) {
//     console.log('New content is downloading.')
//   },
//   updated(registration) {
//     console.log('New content is available; please refresh.')
//   },
//   offline() {
//     console.log('No internet connection found. App is running in offline mode.')
//   },
//   error(error) {
//     console.error('Error during service worker registration:', error)
//   }
// });