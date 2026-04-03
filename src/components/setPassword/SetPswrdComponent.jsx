/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React from 'react'
import HeaderComponent from '../header/HeaderComponent';
import SidebarComponent from '../sidebar/SidebarComponent';

const SetPswrdComponent = (props) => {
  const { showPswd, newShowPswd, pswrd, nPswrd, errors, isDisable, errMsg } = props.state;
  const { handleActionShow, setStateData, handleSubmit } = props;
  return (
    <div className="main-wrapper">
      <div className="container-fluid vh-100">
        <div className="row h-100">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="card shadow p-5 w-75">
              <h4 className="text-center mb-4">Set Your New Password</h4>
              <div className="form-group mb-3">
                <label>New Password</label>

                <div className="input-group">
                  <span className="input-group-text"><i className="fas fa-lock"></i></span>
                  <input autoFocus type={!showPswd ? "password" : "text"} value={pswrd} className="form-control" placeholder="New Password" onChange={(e) => setStateData({ pswrd: e.target.value, errors: { ...errors, pswrd: "" }, errMsg: "" })} />
                  <span className="input-group-text bg-white">
                    <i onClick={() => handleActionShow("pswd")} className={`fas ${showPswd ? "fa-eye" : "fa-eye-slash"}`} style={{ cursor: "pointer" }}></i>
                  </span>
                </div>
                {errors.pswrd && (<small className="text-danger">{errors.pswrd}</small>)}
              </div>
              <div className="form-group mb-3">
                <label>Confirm Password</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="fas fa-lock"></i></span>
                  <input type={!newShowPswd ? "password" : "text"} value={nPswrd} maxLength={20} className="form-control" placeholder="Confirm Password" onChange={(e) => setStateData({ nPswrd: e.target.value, errors: { ...errors, nPswrd: "" }, errMsg: "" })} />

                  <span className="input-group-text bg-white">
                    <i onClick={() => handleActionShow("npswd")} className={`fas ${newShowPswd ? "fa-eye" : "fa-eye-slash"}`} style={{ cursor: "pointer" }}></i>
                  </span>
                </div>
                {errors.nPswrd && (<small className="text-danger">{errors.nPswrd}</small>)}
              </div>


              {/* Password Rules */}
              {/* <div className="mt-3">
                <p className="text-danger mb-1">Password Rules</p>

                <ul className="ps-3 small">
                  <li>At least 8 characters</li>
                  <li>Include one number</li>
                  <li>Uppercase & lowercase letters</li>
                  <li>Include one special character</li>
                  <li>Cannot be your current password</li>
                  <li>Cannot contain "password"</li>
                </ul>
              </div> */}
              {errMsg && <div className='text-danger text-center'>{errMsg}</div>}
              <div className="text-center mt-4">
                <button type="button" className="btn btn-success w-100" onClick={handleSubmit} disabled={isDisable}>Submit</button>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white" style={{ background: "#009688" }}>
            <h1 className="display-3 fw-bold">CWMS</h1>
            <p className="text-center fs-5">Company Websites Management System</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetPswrdComponent
