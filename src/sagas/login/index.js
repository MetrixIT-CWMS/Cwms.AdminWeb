/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { getApiCall, postApiCall, putApiCall } from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = {};
const timeOutRes = { status: '777', message: 'Server not responding' };

//--- Begin: Saga main Action Watcher generator function
function* WatchUserLoginSaga() {
  yield takeLatest('POST_AD_USER_LOGIN', workerPostAdUserLogin);
  yield takeLatest('GET_AD_USER_LOGOUT', workerGettAdUserLogout);

  yield takeLatest('POST_AD_USER_FRGT_PSWD_SND_OTP', workerPostAdUserFrgtPswdSndOtp);
  yield takeLatest('POST_AD_USER_FRGT_PSWD_VRFY_OTP', workerPostAdUserFrgtPswdVrfyOtp);
  yield takeLatest('POST_AD_USER_FRGT_PSWD_RESET', workerPostAdUserFrgtPswdReset);
  yield takeLatest('PUT_UPDATE_PSWRD', workerPutUpdatePswrd);
}
export default WatchUserLoginSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostAdUserLogin(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PostAdUserLoginAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    yield put({ type: 'SET_LOGEDIN_USER_DATA_RES', data: resObj });

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerGettAdUserLogout(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.GetAdUserLogoutAPI };
    const resObj = yield call(getApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostAdUserFrgtPswdSndOtp(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PostAdUserFrgtPswdSndOtpAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostAdUserFrgtPswdVrfyOtp(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PostAdUserFrgtPswdVrfyOtpAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostAdUserFrgtPswdReset(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PostAdUserFrgtPswdResetAPI, body: action.body};
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPutUpdatePswrd(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PutUpdatePswrdAPI, body: action.body};
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}