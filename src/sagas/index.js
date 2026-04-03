/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { all, fork } from 'redux-saga/effects';

import WatchUserLoginSaga from './login';
import WatchAdminUsersSaga from './adminusers/AdminUsersSaga';
import WatchJobsSaga from './jobs';
import WatchProfilesSaga from './profile';
import WatchAdminJbApplicantsSaga from './jobapplicants/JobApplicationSaga';
import WatchCiepalApplicantsSaga from './ceipal-applicants';

function* RootSaga() {
  yield all([
    fork(WatchUserLoginSaga),
    fork(WatchAdminUsersSaga),
    fork(WatchJobsSaga),
    fork(WatchProfilesSaga),
    fork(WatchAdminJbApplicantsSaga),
    fork(WatchCiepalApplicantsSaga)
  ]);
}

export default RootSaga;
