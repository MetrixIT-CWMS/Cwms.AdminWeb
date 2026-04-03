/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ForgetPasswordComponent } from '../../components/login'
import { PostAdUserFrgtPswdSndOtp, PostAdUserFrgtPswdVrfyOtp, PostAdUserFrgtPswdReset } from '../../actions/login/LoginActions'

class ForgotPswrd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySuccess: false,
      showScreen: 'fEmail',
      email: '',
      errMsg: '',
      disabled: false,
      otp: '',
      otpError: '',
      timer: 60,
      isResendDisabled: false,
      newPassword: '',
      confrimPassword: '',
      pswdError: '',
      isNewPswrdKey: false,
      isCnfrmPswrdKey: false,

      showOtp: false,
      showpwsdForm: false,
    };
    this.timerInterval = null;
  }

  handleChange = (e) => {
    const {disabled} = this.state;
    if(!disabled) {
      const cleanedEmail = e.target.value.replace(/\s/g, '').toLowerCase();
      this.setState({ email: cleanedEmail, errMsg: '' });
    }
  }
  handleSubmit = (e) => {
    const { email } = this.state;
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,5}$/;
    if (email.trim() === '') {
      this.setState({ errMsg: 'Email Is Required' });
    } else if (!emailRegex.test(email)) {
      this.setState({ errMsg: 'Invalid Email' });
    } else {
      this.handleSendOtp(email);
    }
  }
  handleSendOtp = (userID) => {
    this.setState({errMsg: '', disabled: true, otp: '', timer: 60, otpError: '', isResendDisabled: false});
    const reqBody = {userID};
    this.props.PostAdUserFrgtPswdSndOtp(reqBody, (resObj) => {
      if(resObj.status == '180') {
        this.startTimer();
        this.setState({ showScreen: 'fOTP', disabled: false });
      } else this.setState({ errMsg: 'OTP sent failed.', otpError: 'OTP sent failed.', disabled: false });
    });
  }
  startTimer = () => {
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer <= 1) {
          clearInterval(this.timerInterval);
          return { timer: 0, isResendDisabled: true };
        }
        return {timer: prevState.timer - 1};
      });
    }, 1000);
  }

  handleOtpChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]{0,6}$/.test(value)) {
      this.setState({ otp: value, otpError: ''  });
    }
  }
  handleResendOtp = () => {
    if(this.state.timer === 0)
      this.handleSendOtp(this.state.email);
  }
  handleOtpSubmit = (e) => {
    e.preventDefault();
    const { otp } = this.state;
    if (otp === '') {
      this.setState({ otpError: 'Enter OTP' });
    } else if (!/^[0-9]{6}$/.test(otp)) {
      this.setState({ otpError: 'Invalid OTP.' });
    } else {
      const reqBody = {otp};
      this.setState({errMsg: '', disabled: true, otpError: ''});
      this.props.PostAdUserFrgtPswdVrfyOtp(reqBody, (resObj) => {
        if(resObj.status == '182') {
          clearInterval(this.timerInterval);
          this.setState({showScreen: 'fPassword', errMsg: '', disabled: false, otpError: ''});
        } else this.setState({otpError: resObj?.message, errMsg: '', disabled: false});
      });
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.showScreen !== 'fOTP' && this.state.showScreen == 'fOTP') {
  //     this.startTimer();
  //   }
  // }

  handleNewpwsdChange = (e) => this.setState({ newPassword: e.target.value, pswdError: '' });
  handleCnfmPswdChange = (e) => this.setState({ confrimPassword: e.target.value, pswdError: '' });
  handlePswdChngSubmit = (e) => {
    e.preventDefault();
    const {newPassword, confrimPassword} = this.state;
    const pswdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*\[\]\\()|{}:';'<>,./?_+\-=])[A-Za-z\d~!@#$%^&*\[\]\\()|{}:';'<>,./?_+\-=]{8,20}$/;
    if (!newPassword) {
      this.setState({ pswdError: 'New Password is required' });
    } else if (/password/i.test(newPassword)) {
      this.setState({ pswdError: 'Password cannot contain the word "password"' });
    } else if (!pswdRegex.test(newPassword)) {
      this.setState({ pswdError: 'New password is not matching its rules' });
    } else if (!confrimPassword) {
      this.setState({ pswdError: 'Confirm password is required' });
    } else if (newPassword !== confrimPassword) {
      this.setState({ pswdError: 'New Password and Confirm Password should be same' });
    } else {
      this.setState({errMsg: '', otpError: '', disabled: true, pswdError: ''});
      const reqBody = { password: newPassword };
      this.props.PostAdUserFrgtPswdReset(reqBody, (resObj) => {
        if(resObj.status == '200') this.setState({ showScreen: 'fEmail', errMsg: '', otpError: '', pswdError: '', disabled: false, displaySuccess: true });
        else this.setState({ pswdError: 'Reset Password Failed.', errMsg: '', otpError: '', disabled: false });
      });
    }
  }
  isNewPasswordCheck = () => this.setState({ isNewPswrdKey: !this.state.isNewPswrdKey });
  isCnfrmPasswordCheck = () => this.setState({ isCnfrmPswrdKey: !this.state.isCnfrmPswrdKey });

  render() {
    return <ForgetPasswordComponent state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleOtpChange={this.handleOtpChange} handleOtpSubmit={this.handleOtpSubmit} handleResendOtp={this.handleResendOtp}
      handleNewpwsdChange={this.handleNewpwsdChange} handleCnfmPswdChange={this.handleCnfmPswdChange} handlePswdChngSubmit={this.handlePswdChngSubmit} isNewPasswordCheck={this.isNewPasswordCheck} isCnfrmPasswordCheck={this.isCnfrmPasswordCheck} />
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  PostAdUserFrgtPswdSndOtp: (body, callback) => dispatch(PostAdUserFrgtPswdSndOtp(body, callback)),
  PostAdUserFrgtPswdVrfyOtp: (body, callback) => dispatch(PostAdUserFrgtPswdVrfyOtp(body, callback)),
  PostAdUserFrgtPswdReset: (body, callback) => dispatch(PostAdUserFrgtPswdReset(body, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPswrd);
