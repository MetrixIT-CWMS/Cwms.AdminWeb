/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

export const PostAdUserLogin = (body, callback) => ({type: 'POST_AD_USER_LOGIN', body, callback});
export const GetAdUserLogout = (callback) => ({ type: 'GET_AD_USER_LOGOUT', callback });
export const SetSidebarMenuVal = (data) => ({type: 'SET_SIDEBAR_MENU_VAL', data});

export const PostAdUserFrgtPswdSndOtp = (body, callback) => ({type: 'POST_AD_USER_FRGT_PSWD_SND_OTP', body, callback});
export const PostAdUserFrgtPswdVrfyOtp = (body, callback) => ({type: 'POST_AD_USER_FRGT_PSWD_VRFY_OTP', body, callback});
export const PostAdUserFrgtPswdReset = (body, callback) => ({type: 'POST_AD_USER_FRGT_PSWD_RESET', body, callback});
export const PutUpdatePswd = (body, callback) => ({type: 'PUT_UPDATE_PSWRD', body, callback});
