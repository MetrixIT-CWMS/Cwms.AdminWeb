/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import localForage from '../../hooks/localForage';

const initialState = {
  userObj: {},
  sideMenu: ''
};

const LoginReducer = (state = initialState, action) => {
  const newState = { ...state };
  const data = action.data;
  switch (action.type) {
    case 'SET_LOGEDIN_USER_DATA_RES':
      if (data.status == '200') {
        const userData = data.resData.result;
        localForage.setItem('userObj', userData);
        newState.userObj = userData;
        userData.cCode !== 'MIT' ? localForage.setItem('tabValue', 'jobs') : localForage.setItem('tabValue', 'ceipal-applicants');
        newState.sideMenu = userData.cCode !== 'MIT' ? 'jobs' : 'ceipal-applicants';
      } else {
        localForage.removeItem('userObj');
        newState.userObj = {};
      }
      break;
    case 'SET_SIDEBAR_MENU_VAL':
      newState.sideMenu = data;
  }

  return newState;
}

export default LoginReducer;
