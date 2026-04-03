/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */


import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const JobCreateComponent = (props) => {
  const { disabled, jobData, errors, errMsg, editorState } = props.state;
  const { jobID, jTitle, jCompany, jExp, jLoc, jPstns, jType, jpDate, jeDate, jwLoc, jStatus } = jobData;
  const { setStateData, handleJobChange, handleCreateJob, handleClose } = props;
  return (
    <div className='page-header'>
      <div className='row'>
        <div className='col-lg-12'>
          <form>
            <div className='row formtype'>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Job Title</label><span className='text-danger'>*</span>
                  <input className={`form-control ${errors.jTitle ? 'border-danger' : ''}`} type='text' placeholder='Job Title' name='jTitle' value={jTitle} onChange={handleJobChange} />
                  {errors.jTitle && <small className='text-danger'>{errors.jTitle}</small>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Job ID</label><span className='text-danger'>*</span>
                  <input className={`form-control ${errors.jobID ? 'border-danger' : ''}`} type='text' placeholder='Job ID' name='jobID' value={jobID} onChange={handleJobChange} />
                  {errors.jobID && <small className='text-danger'>{errors.jobID}</small>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Company</label><span className='text-danger'>*</span>
                  <input className={`form-control ${errors.jCompany ? 'border-danger' : ''}`} type='text' placeholder='Company' name='jCompany' value={jCompany} onChange={handleJobChange} />
                  {errors.jCompany && <small className='text-danger'>{errors.jCompany}</small>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Experience</label><span className='text-danger'>*</span>
                  <input className={`form-control ${errors.jExp ? 'border-danger' : ''}`} type='text' placeholder='Experience' name='jExp' value={jExp} onChange={handleJobChange} />
                  {errors.jExp && <small className='text-danger'>{errors.jExp}</small>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Location</label><span className='text-danger'>*</span>
                  <select className={`form-select ${errors.jLoc ? 'border-danger' : ''}`} id='sel2' name='jLoc' value={jLoc} onChange={handleJobChange}>
                    <option>Select Location</option>
                    <option value='USA'>USA</option>
                    <option value='India'>India</option>
                    <option value='Canada'>Canada</option>
                  </select>
                  {errors.jLoc && <small className='text-danger'>{errors.jLoc}</small>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>No of Openings</label><span className='text-danger'>*</span>
                  <input className={`form-control ${errors.jPstns ? 'border-danger' : ''}`} type='text' placeholder='No of Openings' name='jPstns' value={jPstns} onChange={handleJobChange} />
                  {errors.jPstns && <small className='text-danger'>{errors.jPstns}</small>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Job Type</label>
                  <select className='form-select' id='sel2' name='jType' value={jType} onChange={handleJobChange}>
                    <option value='Full-time'>Full-time</option>
                    <option value='Part-time'>Part-time</option>
                    <option value='Internship'>Internship</option>
                    <option value='Contract'>Contract</option>
                  </select>
                  {errors.jType && <small className='text-danger'>{errors.jType}</small>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Job Post Date</label><span className='text-danger'>*</span>
                  <input type='date' className={`form-control ${errors.jpDate ? 'border-danger' : ''}`} name='jpDate' value={jpDate} onChange={handleJobChange} />
                  {errors.jpDate && <small className='text-danger'>{errors.jpDate}</small>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Job Expiry Date</label><span className='text-danger'>*</span>
                  <input type='date' className={`form-control ${errors.jeDate ? 'border-danger' : ''}`} name='jeDate' value={jeDate} onChange={handleJobChange} />
                  {errors.jeDate && <small className='text-danger'>{errors.jeDate}</small>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Work Location</label><span className='text-danger'>*</span>
                  <input type='text' className={`form-control ${errors.jwLoc ? 'border-danger' : ''}`} id='datetimepicker3' placeholder='Work Location' name='jwLoc' value={jwLoc} onChange={handleJobChange} />
                  {errors.jwLoc && <small className='text-danger'>{errors.jwLoc}</small>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Job Status</label>
                  <select className={`form-select ${errors.jStatus ? 'border-danger' : ''}`} id='sel2' name='jStatus' value={jStatus} onChange={handleJobChange}>
                    <option value='Active'>Active</option>
                    <option value='Closed'>Closed</option>
                  </select>
                  {errors.jStatus && <small className='text-danger'>{errors.jStatus}</small>}
                </div>
              </div>
            </div>
            <div className='row formtype'>
              <div className='col-md-12'>
                <div className='form-group'>
                  <label>Job Description</label><span className='text-danger'>*</span>
                  <Editor
                    editorState={editorState}
                    wrapperClassName={`demo-wrapper ${errors.jDesc ? 'error-border' : ''}`}
                    editorClassName="demo-editor"
                    onEditorStateChange={(editorState) => setStateData({ editorState, errors: { ...errors, jDesc: '' } })}
                    toolbar={{
                      options: ['inline', 'list', 'link'],
                      inline: { options: ['bold'] },
                      // blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'] },
                      list: { options: ['unordered', 'ordered'] },
                    }}
                    className='form-control'
                  />
                  {errors.jDesc && <small className='text-danger'>{errors.jDesc}</small>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='text-danger text-center'>{errMsg}</div>
      <div className='d-flex justify-content-end mt-3'>
        <button type='button' className='btn btn-danger me-2' onClick={handleClose}>Close</button>
        <button type='button' className='btn btn-primary' disabled={disabled} onClick={handleCreateJob}>Create</button>
      </div>
    </div>
  )
}

export default JobCreateComponent