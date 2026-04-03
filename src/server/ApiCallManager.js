/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import * as rdd from 'react-device-detect';
import moment from 'moment';

import hashHistory from '../hashHistory';
import localForage from '../hooks/localForage';

const noInternetRes = {status: '12000', message: 'No Internet Connection'};

export const getApiCall = async (reqObj) => {
  const internet = navigator.onLine;
  if (internet) {
    const atObj = await localForage.getItem('accesstoken');
    const cwmsadatoken = atObj.value ? { cwmsadatoken: atObj.value.cwmsadatoken } : {};
    const cwmsua = await getUiInfo();
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...cwmsadatoken, cwmsua
      }
    };
    return callApi(reqObj.apiUrl, options);
  } else {
    hashHistory.push('/no-internet');
    return noInternetRes;
  }
}
export const postApiCall = async (reqObj) => {
  const internet = navigator.onLine;
  if (internet) {
    const atObj = await localForage.getItem('accesstoken');
    const otObj = await localForage.getItem('otptoken');
    const cwmsadatoken = atObj.value ? { cwmsadatoken: atObj.value.cwmsadatoken } : {};
    const cwmsadotoken = otObj.value ? { cwmsadotoken: otObj.value } : {};
    const cwmsua = await getUiInfo();
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...cwmsadatoken, ...cwmsadotoken, cwmsua,
      },
      body: JSON.stringify(reqObj.body)
    };
    return callApi(reqObj.apiUrl, options);
  } else {
    hashHistory.push('/no-internet');
    return noInternetRes;
  }
}
export const putApiCall = async (reqObj) => {
  const internet = navigator.onLine;
  if (internet) {
    const atObj = await localForage.getItem('accesstoken');
    const cwmsadatoken = atObj.value ? { cwmsadatoken: atObj.value.cwmsadatoken } : {};
    const cwmsua = await getUiInfo();
    const options = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...cwmsadatoken, cwmsua
      },
      body: JSON.stringify(reqObj.body)
    };
    return callApi(reqObj.apiUrl, options);
  } else {
    hashHistory.push('/no-internet');
    return noInternetRes;
  }
}
export const deleteCall = async (reqObj) => {
  const internet = navigator.onLine;
  if (internet) {
    const atObj = await localForage.getItem('accesstoken');
    const cwmsadatoken = atObj.value.cwmsadatoken;
    const cwmsua = await getUiInfo();
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        cwmsadatoken, cwmsua
      },
      body: JSON.stringify(reqObj.body)
    };
    return callApi(reqObj.apiUrl, options);
  } else {
    hashHistory.push('/no-internet');
    return noInternetRes;
  }
}

const callApi = async (apiUrl, options) => {
  try {
    const response = await fetch(apiUrl, options);
    const responseJson = await response.json();
    if (response.headers.get('cwmsadatoken')) {
      const sdt = moment().format();
      const cwmsadatoken = response.headers.get('cwmsadatoken');
      if(cwmsadatoken !== 'NA') {
        await localForage.setItem('accesstoken', {cwmsadatoken, sdt});
        responseJson?.userObj?.rolesObj?._id && await localForage.setItem('userInfo', responseJson.userObj);
      } else logOutUer();
    }
    if (response.headers.get('cwmsadotoken')) {
      await localForage.setItem('otptoken', response.headers.get('cwmsadotoken'));
    }
    if(responseJson.status === '401') logOutUer();
    return responseJson;
  } catch (error) {
    return {status: '504', message: 'Un konwn error'};
  }
}
const logOutUer = () => {
  localForage.clearItems();
  hashHistory.push('/');
}

const getUiInfo = async () => {
  const ipObj = await getIpData();
  const uiInfo = {
    osVersion: rdd.osVersion,
    osName: rdd.osName,
    fullBrowserVersion: rdd.fullBrowserVersion,
    browserVersion: rdd.browserVersion,
    browserName: rdd.browserName,
    deviceType: rdd.deviceType,
    mobileVendor: rdd.mobileVendor,
    mobileModel: rdd.mobileModel,
    engineName: rdd.engineName,
    engineVersion: rdd.engineVersion,
    ua: rdd.getUA,
    ...ipObj
  };
  return JSON.stringify(uiInfo);
}

const getIpData = async () => {
  const ipApis = [
    'https://api.ipify.org/?format=json',
    'https://api64.ipify.org/?format=json',
    'https://ipapi.co/json/', 'https://ipinfo.io/json'
  ];

  for (let i = 0; i < ipApis.length; i++) {
    const ip = await getIp(ipApis[i]);
    if(ip) return {ip};
  }
  return {};
}
const getIp = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if(data?.ip) return data.ip;
    else return '';
  } catch (error) {
    return '';
  }
}
