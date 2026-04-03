/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React from 'react';
import Countries from '../../../public/data/Countries.json';
import { initCaps, numebersOnly } from '../../hooks/common';

const AdminUserCreateComponent = (props) => {
  const { name, refUID, uStatus, emID, mobNum, mobCc, gender, dobStr, errMsg, type, error } = props.state;
  const { setStateData, handleCreateUser, handleCreateClose } = props;

  return (
    <div className='page-header'>
      <div className='row formtype'>
        <div className='col-md-4'>
          <div className='form-group'>
            <label>Name <span style={{ color: 'red' }}>*</span></label>
            <input type='text' className='form-control' value={name} placeholder='Name' autoFocusmaxLength={60} onChange={(e) => setStateData({ name: initCaps(e.target.value), errMsg: '' })} />
            { type === "name" && <p className='text-danger mt-2'>{errMsg}</p> }
          </div>
        </div>

        <div className='col-md-4'>
          <div className='form-group'>
            <label>User ID <span style={{ color: 'red' }}>*</span></label>
            <input type='text' className='form-control' value={refUID} maxLength={20} placeholder='User ID' onChange={(e) => setStateData({ refUID: (e.target.value).replace(/[^a-z0-9]/g, '').toLowerCase().trim(), errMsg: '' })} />
            { type === "refUID" && <p className='text-danger mt-2'>{errMsg}</p> }
          </div>
        </div>

        <div className='col-md-4'>
          <div className='form-group'>
            <label>Status</label>
            <select className='form-select' value={uStatus} onChange={(e) => setStateData({ uStatus: e.target.value, errMsg: '' })}>
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
              <option value='Hold'>Hold</option>
              <option value='Blocked'>Blocked</option>
            </select>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='form-group'>
            <label>Email ID <span style={{ color: 'red' }}>*</span></label>
            <input type='text' className='form-control' value={emID} placeholder='Email ID' maxLength={100} onChange={(e) => setStateData({ emID: (e.target.value).toLowerCase(), errMsg: '' })} />
            { type === "emID" && <p className='text-danger mt-2'>{errMsg}</p> }
          </div>
        </div>

        <div className='col-md-4'>
          <div className='form-group'>
            <label>Mobile Number <span style={{ color: 'red' }}>*</span></label>
            <div className='input-group'>
              <select className='form-select' value={mobCc} style={{ maxWidth: '70px' }} onChange={(e) => setStateData({ mobCc: e.target.value, errMsg: '' })} >
                {Countries.map((item, i) => (
                  <option key={i} value={item.mobCC}>
                    {item.mobCC} {item.sCode}
                  </option>
                ))}
              </select>
              <input type='text' className='form-control' onKeyPress={numebersOnly} value={mobNum} placeholder='Mobile Number' maxLength={10} onChange={(e) => setStateData({ mobNum: e.target.value, errMsg: '' })} />
            </div>
            { type === "mobNum" && <p className='text-danger mt-2'>{errMsg}</p> }
          </div>
        </div>

        <div className='col-md-4'>
          <div className='form-group'>
            <label>Date of Birth</label>
            <input type='date' className='form-control' value={dobStr} placeholder='Date of Birth' max={new Date().toISOString().split("T")[0]} onChange={(e) => setStateData({ dobStr: e.target.value, errMsg: '' })} />
          </div>
        </div>

        <div className='col-md-4'>
          <div className='form-group'>
            <label>Gender</label>
            <select className='form-select' value={gender} onChange={(e) => setStateData({ gender: e.target.value, errMsg: '' })} >
              <option value=''>-- Select Gender --</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>
        </div>
      </div>
      {error && <p className='d-flex justify-content-center text-danger'>{error}</p>}
      <div className='d-flex justify-content-center'>
        <button type='button' className='btn btn-danger me-2' onClick={handleCreateClose}>Cancel</button>
        <button type='button' className='btn btn-primary' onClick={handleCreateUser}>Create User</button>
      </div>
    </div>
  );
};
export default AdminUserCreateComponent;