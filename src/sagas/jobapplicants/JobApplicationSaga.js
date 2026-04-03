/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { postApiCall } from '../../server/ApiCallManager';
import apis from '../../../config/apis.json';

const errEmptyRes = { status: '605', message: 'Server not responding' };
const timeOutRes = { status: '606', message: 'Server not responding' };

//--- Begin: Saga main Action Watcher generator function
function* WatchAdminJbApplicantsSaga() {
  yield takeLatest('POST_AD_JB_APPLICTN_LIST', workerPostAdJbApplictnList);
  yield takeLatest('POST_AD_JB_APPLICTN_CREATE', workerPostAdJbApplictnCreate);
  yield takeLatest('POST_AD_JB_APPLICTN_Update', workerPostAdJbApplictnUpdate);
  yield takeLatest('POST_AD_PDF_VIEW', workerPostAdPdfView);
}
export default WatchAdminJbApplicantsSaga;
//--- End: Saga main Action Watcher generator function

function* workerPostAdJbApplictnList(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    const reqObj = { apiUrl: apis.PostAdJbApplictnListAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostAdJbApplictnCreate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    const reqObj = { apiUrl: apis.PostAdJbApplicantCreateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostAdJbApplictnUpdate(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    const reqObj = { apiUrl: apis.PostAdJbApplicantUpdateAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}

function* workerPostAdPdfView(action) {
  const timeOutApiCall = setTimeout(() => { action.callback(timeOutRes) }, 50000);
  try {
    const reqObj = { apiUrl: apis.PostAdPdfViewAPI, body: action.body };
    const resObj = yield call(postApiCall, reqObj);
    clearTimeout(timeOutApiCall);
    action.callback(resObj);
  } catch (error) {
    clearTimeout(timeOutApiCall);
    action.callback(errEmptyRes);
  }
}
