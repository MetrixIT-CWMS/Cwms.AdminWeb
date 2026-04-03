/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import hashHistory from '../../hashHistory';

import config from '../../../config/config.json';

const UserLoginComponent = (props) => {
  const { userID, password, disabled, errMsg, showPswd } = props.state;

  const handleEmail = (e) => props.setStateData({ userID: e.target.value, errMsg: '' });
  const handlePswd = (e) => props.setStateData({ password: e.target.value, errMsg: '' });
  const handleForgot = () => hashHistory.push('/forgot-password');
  const handleShowPassword = () => props.setStateData({ showPswd: !showPswd });

  return (
    <main>
      <div className='main-wrapper login-body'>
        <div className='login-wrapper'>
          <div className='container'>
            <div className='loginbox'>
              <div className='login-left'>
                <img className='img-fluid' src={config.logo} alt='Logo' />
                {/* <h1 className='logo-text'>CWMS</h1> */}
                <h6 className='logo-text'>Company Websites Management System</h6>
              </div>
              <div className='login-right'>
                <div className='login-right-wrap'>
                  <h1>Login</h1>
                  <p className='account-subtitle'>To access dashboard and more</p>

                  <form>
                    <div className='form-group'>
                      <input className='form-control' type='text' placeholder='User ID / Email' autoComplete='off' value={userID} onChange={handleEmail} />
                    </div>
                    <div className='form-group password-container'>
                      <input className='form-control' type={!showPswd ? 'password' : 'text'} placeholder='Password' value={password} autoComplete='off' onChange={handlePswd} />
                      <span className='pswd-icon'>
                        {!showPswd ? <i onClick={handleShowPassword} className='fa fa-eye-slash' ></i> : <i onClick={handleShowPassword} className='fa fa-eye' ></i>}
                      </span>
                    </div>
                    <div className='text-danger text-center'>{errMsg}</div>
                    <div className='form-group'>
                      <button type='submit' disabled={disabled} onClick={props.loginSubmit} className='btn btn-primary btn-block'>Login</button>
                    </div>
                  </form>

                  <div className='text-center forgotpass'>
                    <a onClick={handleForgot}>Forgot Password?</a>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserLoginComponent;