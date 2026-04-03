/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { call, takeLatest } from 'redux-saga/effects';
import { getApiCall, postApiCall, putApiCall } from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = { status: '605', message: 'Server not responding' };
const timeOutRes = { status: '606', message: 'Server not responding' };

//--- Begin: Saga main Action Watcher generator function
function* WatchProfilesSaga() {
  yield takeLatest('GET_AD_USER_PROFILE_VIEW', workerGetAdUserProfileView);
  yield takeLatest('POST_AD_USER_RESET_PSWRD', workerPostAdUserResetPswrd);
  yield takeLatest('PUT_AD_USER_PROFILE_UPDATE', workerPutAdUserPrfleUpdate);
}
export default WatchProfilesSaga;
//--- End: Saga main Action Watcher generator function

function* workerGetAdUserProfileView(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.GetAdUserProfileViewAPI};
    const resObj = yield call(getApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostAdUserResetPswrd(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PostAdUserResetPswrdAPI, body: action.body};
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPutAdUserPrfleUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PutAdUserPrfleUpdateAPI, body: action.body};
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}