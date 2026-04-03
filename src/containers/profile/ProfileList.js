/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { Component } from 'react';
import { connect } from 'react-redux';

import { GetAdUserProfileView, PostAdUserResetPswrd, PutAdUserPrfleUpdate } from '../../actions/profile/ProfileActions';
import { GetAdUserLogout } from '../../actions/login/LoginActions';
import { ProfileListComponent } from '../../components/profile';
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';
import { initCaps } from '../../hooks/common';

class ProfileList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prflView: {},
      pswdModal: false,
      showPswd: false, newShowPswd: false, cnfShowPswd: false,
      pswrd: '', nPswrd: '', cPswrd: '',
      errors: {}, errMsg: '', succMsg: '', isDisable: false,
      editModal: false, editErrs: {},
      editData: { name: '', refUID: '', sName: '', mobCc: '+91', mobNum: '', emID: '', dobStr: '', gender: '' },
      prevData: {}
    }
  }
  componentDidMount = () => {
    this.getPrflData();
  }
  getPrflData = () => {
    this.props.GetAdUserProfileView((resObj) => {
      if (resObj.status === '200') {
        this.setState({ prflView: resObj.resData.result });
        const data = this.state.editModal && this.setData(resObj.resData.result);
        this.state.editModal && this.setState({ editData: data, prevData: data });
      } else {
        this.setState({ prflView: {} });
      }
    })
  }
  setData = (res) => {
    return {
      name: res.name, sName: res.sName, refUID: res.refUID, mobCc: res.mobCc, mobNum: res.mobNum, emID: res.emID, gender: res.gender, dobStr: res.dobStr
    };
  }
  setStateData = (data) => this.setState({ ...data });
  handleActionShow = (type) => {
    if (type === 'pswd') {
      this.setState({ showPswd: !this.state.showPswd });
    } else if (type === 'npswd') {
      this.setState({ newShowPswd: !this.state.newShowPswd });
    } else if (type === 'cpswd') {
      this.setState({ cnfShowPswd: !this.state.cnfShowPswd });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const pswdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*\[\]\\()|{}:';"<>,./?_+\-=])[A-Za-z\d~!@#$%^&*\[\]\\()|{}:';"<>,./?_+\-=]{8,20}$/;
    const { pswrd, nPswrd, cPswrd } = this.state;
    if (!pswrd) {
      this.setState({ errors: { pswrd: 'Current Password is required' } });
    } else if (!nPswrd.trim()) {
      this.setState({ errors: { nPswrd: 'New Password is required' } });
    } else if (pswrd === nPswrd) {
      this.setState({ errors: { nPswrd: 'New Password should not be same as Current Password' } });
    } else if (nPswrd.toLowerCase().includes('password') || !pswdRegex.test(nPswrd)) {
      this.setState({ errors: { nPswrd: "New Password is not matching its rules" } });
    } else if (!cPswrd.trim()) {
      this.setState({ errors: { cPswrd: "Confirm Password is required" } });
    } else if (nPswrd !== cPswrd) {
      this.setState({ errors: { cPswrd: 'New Password and Confirm Password should be same' } });
    } else {
      this.setState({ isDisable: true });
      const reqBody = { password: nPswrd };
      this.props.PostAdUserResetPswrd(reqBody, (resObj) => {
        if (resObj.status === '200') {
          this.setState({ succMsg: 'Password updated successfully', errMsg: '', errors: {}, isDisable: false });
          setTimeout(() => {
            this.handleClose();
          }, 1000);
        } else if (resObj.status === '102') {
          this.setState({ errMsg: 'Current Password is Invalid', errors: {}, isDisable: false });
        } else {
          this.setState({ errMsg: 'Password Update Failed', errors: {}, isDisable: false });
        }
      });
    }
  };
  handleLogout = async () => {
    this.props.GetAdUserLogout(resObj => { });
    await localForage.clearItems();
    hashHistory.push('/login');
  }
  handleClose = () => {
    this.setState({ pswdModal: false, errMsg: '', succMsg: '', errors: {}, showPswd: false, newShowPswd: false, cnfShowPswd: false, pswrd: '', nPswrd: '', cPswrd: '' })
  }
  handleEditClose = () => {
    this.setState({ editModal: false, errMsg: '', succMsg: '', editErrs: {}, editData: { name: '', refUID: '', sName: '', mobCc: '+91', mobNum: '', emID: '', dobStr: '', gender: '' }, isDisable: false })
  }
  handlePrflChange = (e) => {
    const { name, value } = e.target;
    let val;
    if (name === 'name' || name === 'sName') val = initCaps(value);
    else val = value;
    this.setState(prev => ({ editData: { ...prev.editData, [name]: val }, editErrs: { ...prev.editErrs, [name]: '' }, errMsg: '' }))
  }
  validations = () => {
    const { editData } = this.state;
    let editErrs = {};
    const phRegex = /^\d{10}$/;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,5}$/;
    const rFields = { name: 'Name', sName: 'Short Name', refUID: 'User ID', mobNum: 'Mobile Number', emID: 'Email' };
    Object.keys(rFields).forEach((field) => {
      if (!editData[field]) {
        editErrs[field] = `${rFields[field]} is required`;
      }
    });
    if (editData.emID && !(emailValid).test(editData.emID.trim())) {
      editErrs.emID = 'Invalid Email';
    }
    if (editData.mobNum && !phRegex.test(editData.mobNum)) {
      editErrs.mobNum = 'Enter a valid 10-digit number';
    }
    this.setState({ editErrs });
    return Object.keys(editErrs).length === 0;
  }
  handlePrflUpdate = () => {
    const { editData, prevData } = this.state;
    const isValid = this.validations();
    this.setState({ isDisable: true });
    const { name, refUID, sName, mobCc, mobNum, emID, dobStr, gender } = editData;
    if (isValid) {
      const reqBody = {
        name, refUID, myPrimary: emID, sName,
        mobCc, mobNum,
        mobCcNum: mobNum ? mobCc + mobNum : '',
        emID,
        dobStr: dobStr || '',
        gender: gender || ''
      }
      const reqBody1 = {
        name: prevData.name,
        refUID: prevData.refUID,
        myPrimary: prevData.emID,
        sName: prevData.sName,
        mobCc: prevData.mobCc,
        mobNum: prevData.mobNum,
        mobCcNum: prevData.mobCc + prevData.mobNum,
        emID: prevData.emID,
        dobStr: prevData.dobStr,
        gender: prevData.gender
      }
      const hasChanges = Object.keys(reqBody).some(key => reqBody[key] !== reqBody1[key]);
      if (hasChanges) {
        this.props.PutAdUserPrfleUpdate(reqBody, (resObj) => {
          if (resObj.status === '200') {
            this.setState({ succMsg: 'Profile updated successfully', isDisable: false });
            this.getPrflData();
            setTimeout(() => {
              this.handleEditClose();
            }, 1000);
          } else {
            this.setState({ errMsg: 'Profile Update Failed', isDisable: false });
          }
        })
      } else {
        this.setState({ errMsg: 'There are no changes', isDisable: false });
      }
    }
  }
  profileEdit = () => {
    this.setState({ editModal: true });
    this.getPrflData();
  }
  render() {
    return (
      <ProfileListComponent state={this.state} setStateData={this.setStateData} handleActionShow={this.handleActionShow} handleSubmit={this.handleSubmit} handleLogout={this.handleLogout} handleClose={this.handleClose}
        handlePrflChange={this.handlePrflChange} handleEditClose={this.handleEditClose} handlePrflUpdate={this.handlePrflUpdate} profileEdit={this.profileEdit} />
    )
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  GetAdUserProfileView: (callback) => dispatch(GetAdUserProfileView(callback)),
  PostAdUserResetPswrd: (body, callback) => dispatch(PostAdUserResetPswrd(body, callback)),
  GetAdUserLogout: (callback) => dispatch(GetAdUserLogout(callback)),
  PutAdUserPrfleUpdate: (body, callback) => dispatch(PutAdUserPrfleUpdate(body, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileList);
