/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import hashHistory from '../../hashHistory';

import { AdminUserCreateComponent } from '../../components/admin-users';
import { PostAdUsersCreate } from '../../actions/admin-user/AdminUserAction';
import { type } from 'jquery';

class AdminUserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      refUID: '',
      uStatus: 'Active',
      emID: '',
      mobNum: '',
      mobCc: '+1',
      gender: '',
      dobStr: '',
      errMsg: '',
      error: '',
      type: '',
    };
  }

  setStateData = (data) => this.setState({ ...data });

  handleCreateUser = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, refUID, uStatus, emID, mobNum, mobCc, altEmID, gender, dobStr } = this.state;
    if (!name) {
      this.setState({ errMsg: 'Name is required', type: 'name' });
    } else if (!refUID) {
      this.setState({ errMsg: 'User ID is required', type: 'refUID' });
    } else if (!emID) {
      this.setState({ errMsg: 'Email Id is required', type: 'emID' });
    } else if (emID && !emailRegex.test(emID)) {
      this.setState({ errMsg: "Please enter valid Email Address", type: 'emID' })
    } else if (!mobNum) {
      this.setState({ errMsg: 'Mobile Number is required', type: 'mobNum' });
    } else if(mobNum.length < 10) {
      this.setState({ errMsg: 'Mobile Number must be 10 digits', type: 'mobNum' });
    } else {
      const reqBody = { name, refUID, myPrimary: emID, 
        sName: name.split(" ")[0], mobCc, mobNum, 
        mobCcNum: mobCc + mobNum, emID, dobStr, gender, uStatus 
      };
      this.props.PostAdUsersCreate(reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.props.handleAdminCreate('close');
        } else if (resObj.status === '103' && resObj.resData?.message?.refUID) {
          this.setState({ error: 'User Id Already Exists'});
        } else if (resObj.status === '103' && resObj.resData?.message?.myPrimary) {
          this.setState({ error: 'Email Id Already Exists'});
        } else {
          this.setState({ error: 'Create Failed' });
        }
      })
    }
  }

  render() {
    return (
      <AdminUserCreateComponent
        state={this.state}
        setStateData={this.setStateData}
        handleCreateUser={this.handleCreateUser}
        handleCreateClose={this.props.handleCreateClose}
      />
    );
  }
}

const mapStateToProps = (state) => ({ PanelsReducer: state.PanelsReducer });
const mapDistatchToProps = (dispatch) => ({
  PostAdUsersCreate: (body, callback) => dispatch(PostAdUsersCreate(body, callback))
});

export default connect(mapStateToProps, mapDistatchToProps)(AdminUserCreate);