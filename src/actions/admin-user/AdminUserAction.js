/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

export const PostAdUsersList = (body, callback) => ({type: 'POST_AD_USERS_LIST', body, callback});
export const PostAdUsersCreate = (body, callback) => ({type: 'POST_AD_USERS_CREATE', body, callback});
export const PutAdUserUpdate = (recordId, body, callback) => ({type: 'PUT_AD_USER_UPDATE', recordId, body, callback});
export const PutAdUserStatsUpdate = (recordId, body, callback) => ({type: 'PUT_AD_USER_STATS_UPDATE', recordId, body, callback});
export const PutAdUserPswdUpdatete = (recordId, body, callback) => ({type: 'PUT_AD_USER_PSWD_UPDATE', recordId, body, callback});