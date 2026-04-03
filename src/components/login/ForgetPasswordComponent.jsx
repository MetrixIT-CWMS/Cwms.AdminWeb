/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import hashHistory from '../../hashHistory';

const ForgetPasswordComponent = (props) => {
  const { displaySuccess, showScreen, email, errMsg, disabled, timer, otp, otpError, isResendDisabled, pswdError, newPassword, confrimPassword, isNewPswrdKey, isCnfrmPswrdKey } = props.state;
  const { handleChange, handleSubmit, handleOtpChange, handleResendOtp, handleOtpSubmit, handleNewpwsdChange, handleCnfmPswdChange, handlePswdChngSubmit, isCnfrmPasswordCheck, isNewPasswordCheck } = props;
  const handleLogin = () => hashHistory.push('/login');
  return (
    <div>
      <div className='main-wrapper login-body'>
        <div className='login-wrapper'>
          <div className='container'>
            <div className='loginbox'>
              <div className='login-left'>
                <h1 className='logo-text'>CWMS</h1>
                <h6 className='logo-text'>Company Websites Management System</h6>
              </div>
              <div className='login-right'>
                <div className='login-right-wrap'>
                  <h1>Forgot Password?</h1>
                  <p className='account-subtitle'>Enter your account email to reset password</p>
                  {displaySuccess ? (
                    <div className='text-center'>
                      <h3 style={{ color: 'green' }}>Password Reset Successful</h3>
                      <p style={{ color: 'green' }}>You can now login with your new password.</p>
                      <button className='btn btn-success' onClick={handleLogin}>OK</button>
                    </div>
                  ) : (
                    <>
                      <form>
                        {showScreen == 'fEmail' && (
                          <>
                            <div className='form-group'>
                              <input className='form-control' type='text' placeholder='Enter Email' autoComplete='off' value={email} onChange={handleChange} autoFocus />
                            </div>
                            <div className='text-danger text-center'>{errMsg}</div>
                            <div className='form-group'>
                              <button disabled={disabled} onClick={handleSubmit} className='btn btn-primary btn-block'> Get OTP </button>
                            </div>
                          </>
                        )}
                        {showScreen == 'fOTP' && (
                          <>
                            <div className='form-group'>
                              <input className='form-control' type='text' value={otp} placeholder='Enter OTP' maxLength={6} onChange={handleOtpChange} autoFocus />
                            </div>
                            {otpError && (
                              <div style={{ color: 'red', marginTop: '5px' }}>{otpError} </div>
                            )}
                            <div className='form-group'>
                              <button disabled={disabled} className='btn btn-primary btn-block' onClick={handleOtpSubmit}>Verify</button>
                            </div>
                            <div className='d-flex justify-content-between' style={{ minHeight: '24px' }}>
                              <div style={{ visibility: timer > 0 ? 'visible' : 'hidden' }}>
                                <div>Resend otp in <span style={{ color: 'red' }}>{timer}</span></div>
                              </div>
                              {<div style={{ color: `${!isResendDisabled ? 'gray' : 'blue'}`, cursor: 'pointer', pointerEvents: `${!isResendDisabled ? 'none' : ''}` }} onClick={handleResendOtp}>Resend OTP</div>}
                            </div>
                          </>
                        )}

                        {showScreen == 'fPassword' && (
                          <>
                            <div className='form-group'>
                              <input className='form-control' type={`${!isNewPswrdKey ? 'password' : ''}`} maxLength={20} placeholder='Enter New Password' value={newPassword} onChange={handleNewpwsdChange} autoFocus />
                              <span className='input-group-text bg-transparent eye-icon'> {isNewPswrdKey ? <i onClick={isNewPasswordCheck} className='fa fa-eye' ></i> : <i onClick={isNewPasswordCheck} class='fa-solid fa-eye-slash'></i>} </span>
                            </div>
                            <div className='form-group'>
                              <input className='form-control' type={`${!isCnfrmPswrdKey ? 'password' : ''}`} maxLength={20} placeholder='Confirm Password' value={confrimPassword} onChange={handleCnfmPswdChange} />
                              <span className='input-group-text bg-transparent eye-icon'> {isCnfrmPswrdKey ? <i onClick={isCnfrmPasswordCheck} className='fa fa-eye' ></i> : <i onClick={isCnfrmPasswordCheck} class='fa-solid fa-eye-slash'></i>} </span>
                            </div>

                            {pswdError && (
                              <div style={{ color: 'red', marginTop: '5px' }}>{pswdError} </div>
                            )}
                            <button disabled={disabled} className='btn btn-primary btn-block' onClick={handlePswdChngSubmit}>Reset Password</button>
                            <br />
                            <h5>Password Rules</h5>
                            <ul>
                              <li><small>Contains at least eight characters.</small></li>
                              <li><small>Including at least one number.</small></li>
                              <li><small>Includes both lower and uppercase letters.</small></li>
                              <li><small>Include at least one special characters.</small></li>
                              <li><small>Cannot contain your 'password'</small></li>
                            </ul>
                          </>
                        )}
                      </form>
                      <br />
                      <div className='text-center forgotpass'>
                        <p>Remember your password? <span> <a onClick={handleLogin} style={{ cursor: 'pointer' }}>Login</a></span></p>
                      </div>
                    </>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPasswordComponent;
