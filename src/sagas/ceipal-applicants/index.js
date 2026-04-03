/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { getApiCall, postApiCall } from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = { status: '605', message: 'Server not responding' };
const timeOutRes = { status: '606', message: 'Server not responding' };

//--- Begin: Saga main Action Watcher generator function
function* WatchCiepalApplicantsSaga() {
  yield takeLatest('POST_CIEPAL_APPLICANTS_RESUMES_LIST', workerPostCiepalApplicantsList);
  yield takeLatest('POST_CIEPAL_APPLICANTS_RESUMES_TOTAL_LIST', workerPostCiepalApplicantsTotalList);
  yield takeLatest('GET_CIEPAL_CLIENTS_LIST', workerGetCiepalClientsList);
}
export default WatchCiepalApplicantsSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostCiepalApplicantsList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    const reqObj = { apiUrl: apis.PostCiepalApplicantsResumesListAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostCiepalApplicantsTotalList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 300000);
  try {
    const reqObj = { apiUrl: apis.PostCiepalApplicantsResumesTotalListAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerGetCiepalClientsList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 300000);
  try {
    const reqObj = { apiUrl: apis.GetCiepalClientsListAPI, body: action.body };
    const resObj = yield call(getApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}