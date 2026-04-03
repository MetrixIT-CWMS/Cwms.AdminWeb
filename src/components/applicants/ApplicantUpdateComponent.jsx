/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import Select from 'react-select';

import Countries from '../../../public/data/Countries.json';

const ApplicantUpdateComponent = (props) => {
  const { jobsList, name, email, phoneNumber, description, fileName, file, selectedSrc, selectedJob, errMsg, countryCode, disable, aplcObj, } = props.state;
  const { handleNameChange, handleEmailChange, handlePhoneNumberChange, handleDescriptionChange, handleFileChange,handleSrcChange, handleSelectedJob, handleSubmit,handleCountryCodeChange,} = props;

  return (
    <div className='page-header'>
      <div className='row'>
        <div className='col-lg-12'>
          <form>
            <div className='row formtype'>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label> Job<span style={{ color: 'red' }}>*</span>:</label>
                  <Select options={jobsList} onChange={handleSelectedJob} value={ jobsList?.length  ? jobsList.find((option) => option.value === selectedJob): [] } placeholder='Select a job role' isClearable  />
                </div>
              </div>

              <div className='col-md-4'>
                <div className='form-group'>
                  <label> Applicant Name<span style={{ color: 'red' }}>*</span>: </label>
                  <input type='text'
                    className='form-control'
                    name='applicantName'
                    placeholder='Applicant Name' value={name} onChange={handleNameChange}/>
                </div>
              </div>

              <div className='col-md-4'>
                <div className='form-group'>
                  <label>  Applicant Email<span style={{ color: 'red' }}>*</span>: </label>
                  <input  type='email' className='form-control' placeholder='Applicant Email' name='applicantEmail' value={email} onChange={handleEmailChange}/>
                </div>
              </div>

              <div className='col-md-4'>
                <label> Mobile Number<span style={{ color: 'red' }}>*</span></label>
                <div className='input-group'>
                  <select className='form-select' value={countryCode} name='countryCode' onChange={handleCountryCodeChange}style={{ maxWidth: '77px' }} >
                    {Countries?.length > 0 && Countries.map((item, i) => (<option key={i} value={item.mobCC}> {item.mobCC} {item.sCode} </option> ))}
                  </select>
                  <input type='text' name='mobileNumber' className='form-control'  placeholder='XXXXXXXXXX'value={phoneNumber} onChange={handlePhoneNumberChange} />
                </div>
              </div>

              <div className='col-md-4'>
                <div className='form-group'>
                  <label> Source<span style={{ color: 'red' }}>*</span>:</label>
                  <select className='form-select' value={selectedSrc}onChange={handleSrcChange} >
                    <option value=''>-- Select Source --</option>
                    <option value='Website'>Website</option>
                    <option value='Referral'>Referral</option>
                    <option value='Linkedin'>Linkedin</option>
                    <option value='Job Portal'>Job Portal</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
              </div>

              <div className='col-md-4'>
                <div className='form-group'>
                  <label>  Applicant Description<span style={{ color: 'red' }}>*</span>: </label>
                  <textarea className='form-control' name='applicantDescription' placeholder='Applicant Description'rows='3'  maxLength='250' value={description} onChange={handleDescriptionChange}></textarea>
                </div>
              </div>

              <div className='form-group'>
                <label>  Applicant Resume<span style={{ color: 'red' }}>*</span>:</label>
                <div className='d-flex align-items-center justify-content-between flex-wrap gap-2'>
                  {aplcObj?.aResume && fileName === 'choose file' && (
                    <div className='me-3' style={{ fontWeight: '500' }}>
                      Previous Resume: {aplcObj.aResume}
                    </div>
                  )}
                  <div className='custom-file mb-3' style={{ maxWidth: '300px' }}>
                    <input type='file' placeholder='Applicant Resume' className='custom-file-input' id='resumeFile'accept='.pdf,.doc,.docx' onChange={handleFileChange}/>
                    <label className='custom-file-label' htmlFor='resumeFile'>{fileName !== 'choose file' ? fileName : 'Choose file'} </label>
                  </div>
                </div>
              </div>
            </div>
            {errMsg && (<div style={{ color: 'red', marginTop: '5px' }}>{errMsg}</div>)}
            <button type='submit' className='btn btn-primary mt-3' onClick={handleSubmit} disabled={disable}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicantUpdateComponent;
