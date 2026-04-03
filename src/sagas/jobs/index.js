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
function* WatchJobsSaga() {
  yield takeLatest('POST_JOBS_LIST', workerPostJobsList);
  yield takeLatest('POST_JOB_CREATE', workerPostJobCreate);
  yield takeLatest('PUT_JOB_UPDATE', workerPutJobUpdate);
  yield takeLatest('PUT_JOB_STATUS_UPDATE', workerPutJobStatusUpdate);
  yield takeLatest('GET_JOB_LIFECYCLE_LIST', workerGetJobLyfCycleList);
  yield takeLatest('GET_JOBS_TOTAL_LIST', workerGetJobSTotalList);
}
export default WatchJobsSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostJobsList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PostJobsListAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPostJobCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PostJobCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPutJobUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PutJobUpdateAPI, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerPutJobStatusUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.PutJobStatusUpdateAPI, body: action.body };
    const resObj = yield call(putApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
function* workerGetJobLyfCycleList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.GetJobLyfCycleListAPI + action.id};
    const resObj = yield call(getApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerGetJobSTotalList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    // API calls here
    const reqObj = { apiUrl: apis.GetJobsTotalListAPI };
    const resObj = yield call(getApiCall, reqObj);

    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
