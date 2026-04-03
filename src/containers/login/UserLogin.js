/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React from 'react';
import { connect } from 'react-redux';

import { UserLoginComponent } from '../../components/login';
import { PostAdUserLogin } from '../../actions/login/LoginActions';
import hashHistory from '../../hashHistory';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '', password: '', disabled: false, errMsg: '', showPswd: false,
    };
  }
  setStateData = (data) => this.setState({ ...data });

  loginSubmit = (event) => {
    this.setState({ disabled: true });
    const { userID, password } = this.state;
    if (!userID) {
      this.setState({ errMsg: 'User ID / Email is required', disabled: false });
    } else if (!password) {
      this.setState({ errMsg: 'Password is required', disabled: false });
    } else {
      const body = { userID, password };
      this.props.PostAdUserLogin(body, (resObj) => {
        if (resObj.status == '200') {
          const userData = resObj.resData.result;
          hashHistory.push('/jobs');
          userData.cCode !== 'MIT' ? hashHistory.push('/jobs') : hashHistory.push('/ceipal-applicants');
          userData.cCode !== 'MIT' ? localForage.setItem('tabValue', 'jobs') : localForage.setItem('tabValue', 'ceipal-applicants');
        } else {
          this.setState({ errMsg: resObj.resData?.message, disabled: false });
        }
      });
    }
    event.preventDefault();
  }

  render() {
    return <UserLoginComponent
      state={this.state}
      setStateData={this.setStateData}
      loginSubmit={this.loginSubmit}
    />;
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  PostAdUserLogin: (body, callback) => dispatch(PostAdUserLogin(body, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
