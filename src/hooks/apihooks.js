/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import moment from 'moment';
import localForage from './localForage';
import hashHistory from '../hashHistory';

export const setHeadersToken = async (response) => {
  const responseJson = response?.data;
  if (response.headers.get('cwmsadatoken')) {
    const sdt = moment().format();
    const cwmsadatoken = response.headers.get('cwmsadatoken');
    if (cwmsadatoken !== 'NA') {
      await localForage.setItem('accesstoken', { cwmsadatoken, sdt });
      responseJson?.userObj?.rolesObj?._id && await localForage.setItem('userInfo', responseJson.userObj);
    } else {
      localForage.clearItems();
      hashHistory.push('/');
    }
  }
}