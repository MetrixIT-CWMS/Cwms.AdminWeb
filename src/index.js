/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as Router } from 'react-router-dom';

import history from './hashHistory';
import App from './App';
import './assets/css/bootstrap.min.css';
import './assets/plugins/fontawesome/css/fontawesome.min.css';
import './assets/plugins/fontawesome/css/all.css';

import './assets/css/feathericon.min.css';
import './assets/plugins/morris/morris.css';

import './assets/css/style.css';

import './assets/css/light.css';

import jQuery from 'jquery';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

/** ========== Start: Redux Implementation =========== */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga);
/** ========== End: Redux Implementation =========== */


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
