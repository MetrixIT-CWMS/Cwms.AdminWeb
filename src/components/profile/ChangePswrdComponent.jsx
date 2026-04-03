/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */


const ChangePswrdComponent = (props) => {
  const { showPswd, newShowPswd, cnfShowPswd, pswrd, nPswrd, cPswrd, errors } = props.state;
  const { handleActionShow, setStateData } = props;
  return (
    <div className='row'>
      <div className='col-md-6'>
        <div className='form-group'>
          <label>Current Password</label>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'><i className='fas fa-lock'></i></span>
            </div>
            <input autoFocus={true} type={`${!showPswd ? 'password' : ''}`} value={pswrd} onChange={(e) => setStateData({ pswrd: e.target.value, errors: { pswrd: '' }, errMsg: '' })} className='form-control' placeholder='Current Password' />
            <span className='input-group-text bg-transparent eye-icon'>
              {!showPswd ? <i onClick={() => handleActionShow('pswd')} className='fa fa-eye-slash' ></i> : <i onClick={() => handleActionShow('pswd')} className='fa fa-eye' ></i>}
            </span>
          </div>
          {errors.pswrd && <small className='text-danger text-center'>{errors.pswrd}</small>}
        </div>
        <div className='form-group'>
          <label>New Password</label>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'><i className='fas fa-lock'></i></span>
            </div>
            <input type={`${!newShowPswd ? 'password' : ''}`} value={nPswrd} onChange={(e) => setStateData({ nPswrd: e.target.value, errors: { nPswrd: '' }, errMsg: '' })} maxLength={20} className='form-control' placeholder='New Password' />
            <span className='input-group-text bg-transparent eye-icon'>
              {!newShowPswd ? <i onClick={() => handleActionShow('npswd')} className='fa fa-eye-slash' ></i> : <i onClick={() => handleActionShow('npswd')} className='fa fa-eye' ></i>}
            </span>
          </div>
          {errors.nPswrd && <small className='text-danger text-center'>{errors.nPswrd}</small>}
        </div>
        <div className='form-group'>
          <label>Confirm Password</label>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'><i className='fas fa-lock'></i></span>
            </div>
            <input type={`${!cnfShowPswd ? 'password' : ''}`} value={cPswrd} onChange={(e) => setStateData({ cPswrd: e.target.value, errors: { cPswrd: '' }, errMsg: '' })} maxLength={20} className='form-control' placeholder='Confirm Password' />
            <span className='input-group-text bg-transparent eye-icon'>
              {!cnfShowPswd ? <i onClick={() => handleActionShow('cpswd')} className='fa fa-eye-slash' ></i> : <i onClick={() => handleActionShow('cpswd')} className='fa fa-eye' ></i>}
            </span>
          </div>
          {errors.cPswrd && <small className='text-danger text-center'>{errors.cPswrd}</small>}
        </div>
      </div>
      <div className='col-md-6'>
        <div className='form-control-feedback'>
          <p className='mb-1 text-danger'>Password Rules: </p>
          <ul>
            <li><small>Contains at least eight characters.</small></li>
            <li><small>Including at least one number.</small></li>
            <li><small>Includes both lower and uppercase letters.</small></li>
            <li><small>Include at least one special characters.</small></li>
            <li><small>Cannot be your current password.</small></li>
            <li><small>Cannot contain your 'password'</small></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChangePswrdComponent