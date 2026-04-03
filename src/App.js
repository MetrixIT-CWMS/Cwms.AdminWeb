/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import './i18n';
import hashHistory from './hashHistory';
import localForage from './hooks/localForage';

import { ForgotPswrd, UserLogin } from './containers/login';
import { AdminUsersList } from './containers/admin-users';
import { ApplicantsList } from './containers/applicants';
import { JobsList } from './containers/jobs';
import { ProfileList } from './containers/profile';
import NoPageFoundComponent from './no-page/NoPageFoundComponent';
import NoInternetComponent from './no-page/NoInternetComponent';
import { SetSidebarMenuVal } from './actions/login/LoginActions';
import { CeipalApplicantsList } from './containers/ceipal-applicants';
import { SetPswrdPage } from './containers/set-password';

const App = (props) => {
  const location = useLocation();

  useEffect(() => {
    handleUserLogin();
    SetLoggedInUserAuthObj();
  }, [location]);

  const handleUserLogin = async () => {
    const userObj = await localForage.getItem('userObj');
    const userData = userObj?.value;
    const atObj = await localForage.getItem('accesstoken');
    const accesstoken = atObj?.value;

    if (location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/forgot-password' &&  !location.pathname.startsWith('/set-password')) {
      if (!userData || !userData.refUID || !accesstoken) {
        hashHistory.push('/login');
      }
    } else if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/forgot-password') {
      if (userData && userData?.refUID && accesstoken) {
        userData.cCode !== 'MIT' ? hashHistory.push('/jobs') : hashHistory.push('/ceipal-applicants');
        userData.cCode !== 'MIT' ? localForage.setItem('tabValue', 'jobs') : localForage.setItem('tabValue', 'ceipal-applicants');
      }
    }
    if (userData && userData?.refUID && accesstoken && location.pathname === '/ceipal-applicants') {
      if (userData.cCode !== 'MIT') {
        hashHistory.push('/jobs');
        localForage.setItem('tabValue', 'jobs');
      }
    }
    if (userData && userData?.refUID && accesstoken && location.pathname === '/users') {
      if (userData.uRole !== 'Admin') {
        userData.cCode !== 'MIT' ? hashHistory.push('/jobs') : hashHistory.push('/ceipal-applicants');
        userData.cCode !== 'MIT' ? localForage.setItem('tabValue', 'jobs') : localForage.setItem('tabValue', 'ceipal-applicants');
      }
    }
    if(userData?.refUID && accesstoken && location.pathname?.startsWith('/set-password')){
      userData.cCode !== 'MIT' ? hashHistory.push('/jobs') : hashHistory.push('/ceipal-applicants');
      userData.cCode !== 'MIT' ? localForage.setItem('tabValue', 'jobs') : localForage.setItem('tabValue', 'ceipal-applicants');
    }
  }
  const SetLoggedInUserAuthObj = async () => {
    const userObj = await localForage.getItem('userObj');
    const userData = userObj && userObj.value || {};
    const tabObj = await localForage.getItem('tabValue');
    const tabValue = tabObj.value || 'jobs';
    userData.refUID && props.SetSidebarMenuVal(tabValue);
  }

  useEffect(() => {
    const handleOnline = () => {
      hashHistory.push('/jobs');
      localForage.setItem('tabValue', 'jobs');
    };
    const handleOffline = () => {
      hashHistory.push('/no-internet');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if (!navigator.onLine) {
      hashHistory.push('/no-internet');
    }
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/' element={<UserLogin />} />
        <Route path='login' element={<UserLogin />} />
        <Route path='forgot-password' element={<ForgotPswrd/>} />
        <Route path='users' element={<AdminUsersList />} />
        <Route path='applicants' element={<ApplicantsList />} />
        <Route path='jobs' element={<JobsList />} />
        <Route path='profile' element={<ProfileList />} />
        <Route path='ceipal-applicants' element={<CeipalApplicantsList />} />
        <Route path='set-password/:id' element={<SetPswrdPage />} />
        {/*---------- No Page ----------*/}
        <Route path='/page-not-found' element={<NoPageFoundComponent />} />
        <Route path='/no-internet' element={<NoInternetComponent />} />
        <Route path='*' element={<Navigate to='/page-not-found' replace />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  SetSidebarMenuVal: (data) => dispatch(SetSidebarMenuVal(data))
});

export default connect(mapStateToProps, mapDistachToProps)(App);
