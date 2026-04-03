/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React from 'react';
import Countries from '../../../public/data/Countries.json';

const AdminUserCreateComponent = (props) => {

  const { admnView } = props; 

  return (
     <div className='page-header'>
      <div className='row formtype'>
        <div className='col-md-4'>
          <div className='form-group'>
            <label>Name</label>
            <input type='text' className='form-control' value={admnView.name} disabled={true} />
          </div>
        </div>

        <div className='col-md-4'>
          <div className='form-group'>
            <label>User ID </label>
            <input type='text' className='form-control' value={admnView.refUID} disabled={true} />
          </div>
        </div>

        <div className='col-md-4'>
          <div className='form-group'>
            <label>Email ID </label>
            <input type='text' className='form-control' value={admnView.emID} disabled={true} />
          </div>
        </div>

        <div className='col-md-4'>
          <div className='form-group'>
            <label>Mobile Number </label>
            <div className='input-group'>
              <select className='form-select' value={admnView.mobCc} style={{ maxWidth: '70px' }} disabled={true} >
                {Countries.map((item, i) => (
                  <option key={i} value={item.mobCC}>
                    {item.mobCC} {item.sCode}
                  </option>
                ))}
              </select>
              <input type='text' className='form-control' value={admnView.mobNum} disabled={true} />
            </div>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='form-group'>
            <label>Date of Birth</label>
            <input type='date' className='form-control' value={admnView.dobStr} disabled={true} />
          </div>
        </div>

        <div className='col-md-4'>
          <div className='form-group'>
            <label>Gender</label>
            <select className='form-select' value={admnView.gender} disabled={true} >
              <option value=''>-- Select Gender --</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
};
export default AdminUserCreateComponent;