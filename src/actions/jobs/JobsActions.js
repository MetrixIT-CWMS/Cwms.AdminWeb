/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

export const PostJobsList = (body, callback) => ({type: 'POST_JOBS_LIST', body, callback});
export const PostJobCreate = (body, callback) => ({type: 'POST_JOB_CREATE', body, callback});
export const PutJobUpdate = (body, callback) => ({type: 'PUT_JOB_UPDATE', body, callback});
export const PutJobStatusUpdate = (body, callback) => ({type: 'PUT_JOB_STATUS_UPDATE', body, callback});
export const GetJobLyfCycleList = (id, callback) => ({type: 'GET_JOB_LIFECYCLE_LIST', id, callback});
export const GetJobsTotalList = (callback) => ({type: 'GET_JOBS_TOTAL_LIST', callback});
