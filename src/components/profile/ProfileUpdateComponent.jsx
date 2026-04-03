/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { numebersOnly } from '../../hooks/common';

const ProfileUpdateComponent = (props) => {
  const { editErrs, editData } = props.state;
  const { name, refUID, sName, mobCc, mobNum, emID, dobStr, gender } = editData;  
  const { handlePrflChange } = props;
  return (
    <div className='page-header'>
      <div className='row'>
        <div className='col-lg-12'>
          <form>
            <div className='row formtype'>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Name</label><span className='text-danger'>*</span>
                  <input className={`form-control ${editErrs.name ? 'border-danger' : ''}`} type='text' placeholder='Name' name='name' value={name} onChange={handlePrflChange} />
                  {editErrs.name && <small className='text-danger'>{editErrs.name}</small>}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Short Name</label><span className='text-danger'>*</span>
                  <input className={`form-control ${editErrs.sName ? 'border-danger' : ''}`} type='text' placeholder='Short Name' name='sName' value={sName} onChange={handlePrflChange} />
                  {editErrs.sName && <small className='text-danger'>{editErrs.sName}</small>}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>User ID</label><span className='text-danger'>*</span>
                  <input className={`form-control ${editErrs.refUID ? 'border-danger' : ''}`} type='text' placeholder='User ID' name='refUID' value={refUID} onChange={handlePrflChange} />
                  {editErrs.refUID && <small className='text-danger'>{editErrs.refUID}</small>}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Mobile Number</label><span className='text-danger'>*</span>
                  <div className='d-flex'>
                    <select className={`form-select form-control ${editErrs.mobNum ? 'border-danger' : ''}`} value={mobCc} name='mobCc' onChange={handlePrflChange} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                      <option value='+1'>+1</option>
                      <option value='+91'>+91</option>
                    </select>
                    <input type='text' className={`form-control ${editErrs.mobNum ? 'border-danger' : ''}`} placeholder='Mobile Numbe' name='mobNum' maxLength={10} onKeyPress={numebersOnly} value={mobNum} onChange={handlePrflChange} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
                  </div>
                  {editErrs.mobNum && <small className='text-danger'>{editErrs.mobNum}</small>}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Email</label><span className='text-danger'>*</span>
                  <input className={`form-control ${editErrs.emID ? 'border-danger' : ''}`} type='text' placeholder='Email' name='emID' value={emID} onChange={handlePrflChange} />
                  {editErrs.emID && <small className='text-danger'>{editErrs.emID}</small>}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Gender</label>
                  <select className={`form-select ${editErrs.gender ? 'border-danger' : ''}`} id='sel2' name='gender' value={gender} onChange={handlePrflChange}>
                    <option value=''>Select</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                  </select>
                  {editErrs.gender && <small className='text-danger'>{editErrs.gender}</small>}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>DOB</label>
                  <input type='date' className={`form-control ${editErrs.dobStr ? 'border-danger' : ''}`} name='dobStr' value={dobStr} onChange={handlePrflChange} />
                  {editErrs.dobStr && <small className='text-danger'>{editErrs.dobStr}</small>}
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdateComponent