/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { postApiCall, putApiCall } from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = { status: '605', message: 'Server not responding' };
const timeOutRes = { status: '606', message: 'Server not responding' };

//--- Begin: Saga main Action Watcher generator function
function* WatchAdminUsersSaga() {
  yield takeLatest('POST_AD_USERS_LIST', workerPostAdUsersList);
  yield takeLatest('POST_AD_USERS_CREATE', workerPostAdUsersCreate);
  yield takeLatest('PUT_AD_USER_UPDATE', workerPutAdUserUpdate);
  yield takeLatest('PUT_AD_USER_STATS_UPDATE', workerPutAdUserStatsUpdate);
  yield takeLatest('PUT_AD_USER_PSWD_UPDATE', workerPutAdUserPswdUpdate);
}

export default WatchAdminUsersSaga;
//--- End: Saga main Action Watcher generator function

function*  workerPostAdUsersList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PostAdUsersListAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostAdUsersCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PostAdUsersCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutAdUserUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PutAdUserUpdateAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutAdUserStatsUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PutAdUserStatsUpdateAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPutAdUserPswdUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PutAdUserPswdUpdateAPI + action.recordId, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}