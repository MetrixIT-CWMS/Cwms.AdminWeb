
/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

const ApplicantViewComponent = (props) => {
  const { aplicantObj }=props;

  return (
    <div className='page-header'>
      <div className='row'>
        <div className='col-lg-12'>
          <form >
            <div className='row formtype'>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Job|</label>
                  {aplicantObj.cjTitle}|{aplicantObj.cJobID}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Applicant Name</label>
                  {aplicantObj.aName}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Applicant Email</label>
                  {aplicantObj.aEmail}
                </div>
              </div>
              <div className='col-md-4'>
                <label>Mobile Number</label>
                <div className='input-group'>
                  {aplicantObj.aPhone}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Source:</label>
                  {aplicantObj.aResume}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicantViewComponent;
