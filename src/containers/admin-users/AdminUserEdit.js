/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import hashHistory from '../../hashHistory';

import { AdminUserEditComponent } from '../../components/admin-users';
import { PutAdUserUpdate } from '../../actions/admin-user/AdminUserAction';
import { type } from 'jquery';
class AdminUserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      refUID: '',
      emID: '',
      mobNum: '',
      mobCc: '+1',
      gender: '',
      dobStr: '',
      errMsg: '',
      recordId: '',
      dataObj: {},
      type: '',
      error: '',
      type: '',
    };
  }

  componentDidMount = () => {
    this.setState({ name: this.props.admnView.name, refUID: this.props.admnView.refUID, emID: this.props.admnView.emID, mobNum: this.props.admnView.mobNum, mobCc: this.props.admnView.mobCc, gender: this.props.admnView.gender, dobStr: this.props.admnView.dobStr, recordId: this.props.admnView._id, dataObj: this.props.admnView });
  }

  setStateData = (data) => this.setState({ ...data });
  
 
  handleUpdateUser = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, refUID, emID, mobNum, mobCc, gender, dobStr, recordId, dataObj } = this.state;
    
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
        mobCcNum: mobCc + mobNum, emID, dobStr, gender
      };
      const oldObj = { 
      name: dataObj.name, refUID: dataObj.refUID, myPrimary: dataObj.emID, sName: dataObj.name.split(" ")[0], mobCc: dataObj.mobCc, mobNum: dataObj.mobNum, 
      mobCcNum: dataObj.mobCc + dataObj.mobNum, emID: dataObj.emID, dobStr: dataObj.dobStr, gender: dataObj.gender
    }
      if(JSON.stringify(reqBody) == JSON.stringify(oldObj)){
        this.setState({ error: "There are no Changes"})
      } else {
        this.props.PutAdUserUpdate(recordId, reqBody, (resObj) => {
          if (resObj.status === '200') {
            this.props.handleAdmnEdit('close');
            this.setState({ name: '', refUID: '', emID: '', mobNum: '', mobCc: '+1', gender: '', dobStr: '', })
          } else if (resObj.status === '103' && resObj.resData?.message?.refUID) {
            this.setState({ error: 'User Id Already Exists'});
          } else if (resObj.status === '103' && resObj.resData?.message?.myPrimary) {
            this.setState({ error: 'Email Id Already Exists'});
          } else {
            this.setState({ error: 'Updation Failed' });
          }
        })
      }  
    }
  }

  render() {
    return (
      <AdminUserEditComponent
        state={this.state}
        setStateData={this.setStateData}
        handleUpdateUser={this.handleUpdateUser}
        handleEditClose={this.props.handleEditClose}
      />
    );
  }
}

const mapStateToProps = (state) => ({ PanelsReducer: state.PanelsReducer });
const mapDispatchToProps = (dispatch) => ({
  PutAdUserUpdate: (recordId, body, callback) => dispatch(PutAdUserUpdate(recordId, body, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserEdit);