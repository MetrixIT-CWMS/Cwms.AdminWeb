/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

export const GetAdUserProfileView = (callback) => ({type: 'GET_AD_USER_PROFILE_VIEW', callback});
export const PostAdUserResetPswrd = (body, callback) => ({type: 'POST_AD_USER_RESET_PSWRD', body, callback});
export const PutAdUserPrfleUpdate = (body, callback) => ({type: 'PUT_AD_USER_PROFILE_UPDATE', body, callback});