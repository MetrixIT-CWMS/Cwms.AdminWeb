/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { combineReducers } from 'redux';

import LoginReducer from './login/LoginReducer';

const appReducer = combineReducers({
  LoginReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'AD_USER_LOGGED_OUT') {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
