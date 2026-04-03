/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SetPswrdComponent } from '../../components/setPassword';
import { PutUpdatePswd } from '../../actions/login/LoginActions';
import hashHistory from '../../hashHistory';

class SetPswrdSubPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPswd: false, newShowPswd: false,
      pswrd: '', nPswrd: '',
      errors: {}, errMsg: '', succMsg: '', isDisable: false,

    }
  }
  setStateData = (data) => this.setState({ ...data });
  handleActionShow = (type) => {
    const { errors } = this.state;
    if (type === 'pswd') {
      this.setState({ showPswd: !this.state.showPswd, errors: { ...errors, pswrd: '' }, errMsg: '' });
    } else if (type === 'npswd') {
      this.setState({ newShowPswd: !this.state.newShowPswd, errors: { ...errors, nPswrd: '' }, errMsg: '' });
    }
  }
  validateForm = () => {
    const { pswrd, nPswrd } = this.state;
    let errors = {};
    let isValid = true;
    if (!pswrd) {
      errors.pswrd = 'New password is required';
      isValid = false;
    }
    // else if (pswrd.length < 8) {
    //   errors.pswrd = "Password must be at least 8 characters";
    //   isValid = false;
    // }
    // else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(pswrd)) {
    //   errors.pswrd = "Password must contain uppercase, lowercase, number and special character";
    //   isValid = false;
    // }

    if (!nPswrd) {
      errors.nPswrd = 'Confirm password is required';
      isValid = false;
    }
    else if (pswrd !== nPswrd) {
      errors.nPswrd = 'Passwords do not match';
      isValid = false;
    }
    this.setState({ errors });
    return isValid;
  };
  handleSubmit = () => {
    const { pswrd } = this.state;
    if (!this.validateForm()) return;
    const reqBody = { id: this.props.id, password: pswrd };
    this.setState({ errMsg: "", isDisable: true });
    this.props.PutUpdatePswd(reqBody, (resObj) => {
      if (resObj && resObj.status === '200') {
        hashHistory.push("/login");
      } else if (resObj.status === '100') {
        this.setState({ errMsg: resObj.resData?.message, isDisable: false });
      } else {
        this.setState({ errMsg: 'Password Update Failed', isDisable: false });
      }
    });
  };
  render() {
    return <SetPswrdComponent state={this.state} setStateData={this.setStateData} handleActionShow={this.handleActionShow} handleSubmit={this.handleSubmit} />
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  PutUpdatePswd: (body, callback) => dispatch(PutUpdatePswd(body, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetPswrdSubPage);
