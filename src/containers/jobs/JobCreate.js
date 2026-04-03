/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { Component } from 'react';
import { connect } from 'react-redux';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { JobCreateComponent } from '../../components/jobs';
import { PostJobCreate } from '../../actions/jobs/JobsActions';
import { initCaps } from '../../hooks/common';

class JobCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      jDesc: '',
      jobData: { jobID: '', jTitle: '', jType: 'Full-time', jExp: '', jPstns: '', jLoc: '', jpDate: '', jeDate: '', jCompany: '', jwLoc: '', jStatus: 'Active' },
      disabled: false,
      errors: {},
      errMsg: '',
    }
  }
  setStateData = (data) => this.setState({ ...data });
  handleJobChange = (e) => {
    const { name, value } = e.target;
    let val;
    if (name === 'jTitle') val = initCaps(value);
    else val = value;
    this.setState((prevState) => ({ jobData: { ...prevState.jobData, [name]: val }, errors: { ...prevState.errors, [name]: '' }, errMsg: '' }));
  }
  validateJobData = () => {
    const { jobData, editorState } = this.state;
    let errors = {};
    const rFields = { jTitle: 'Job Title', jobID: 'Job ID', jCompany: 'Company', jExp: 'Experience', jLoc: 'Location', jPstns: 'No of Openings', jpDate: 'Job Post Date', jeDate: 'Job Expiry Date', jwLoc: 'Work Location' };
    Object.keys(rFields).forEach((field) => {
      if (!jobData[field]) {
        errors[field] = `${rFields[field]} is required`;
      }
    });
    const contentState = editorState.getCurrentContent();
    const isEditorEmpty = !contentState.hasText();
    if (isEditorEmpty) {
      errors.jDesc = 'Job Description is required';
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }
  handleCreateJob = () => {
    const { jobData, editorState } = this.state;
    const { jobID, jTitle, jCompany, jExp, jLoc, jPstns, jType, jpDate, jeDate, jwLoc, jStatus } = jobData;
    const isValid = this.validateJobData();
    if (isValid) {
      this.setState({ disabled: true, errMsg: '' });
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const jDesc = draftToHtml(rawContentState);
      const reqBody = { jobID, jTitle, jCompany, jExp, jLoc, jPstns, jType, jpDtStr: jpDate, jeDtStr: jeDate, jwLoc, jDesc, jStatus };
      this.props.PostJobCreate(reqBody, (resObj) => {
        if (resObj?.status === '200') {
          this.setState({ jobData: { jobID: '', jTitle: '', jType: 'Full-time', jExp: '', jPstns: '', jLoc: '', jpDate: '', jeDate: '', jCompany: '', jwLoc: '', jDesc: '', jStatus: 'Active' }, errors: {}, errMsg: '', editorState: EditorState.createEmpty(), disabled: false });
          this.props.setStateData({ actionShow: false, action: '' });
          this.props.getJobsList(1, 10, '', 'Active');
        } else if (resObj?.status === '103') {          
          this.setState({ errMsg: 'Job ID Already exists', disabled: false });
        } else {
          this.setState({ errMsg: resObj?.resData?.message || 'Failed to create job.', disabled: false });
        }
      });
    }
  }
  handleClose = () => {
    this.setState({ jobData: { jobID: '', jTitle: '', jType: 'Full-time', jExp: '', jPstns: '', jLoc: '', jpDate: '', jeDate: '', jCompany: '', jwLoc: '', jDesc: '', jStatus: 'Active' }, errors: {}, errMsg: '' });
    this.props.setStateData({ actionShow: false, action: '' });
  }
  render() {
    return <JobCreateComponent state={this.state} setStateData={this.setStateData} handleJobChange={this.handleJobChange} handleCreateJob={this.handleCreateJob} handleClose={this.handleClose} />
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  PostJobCreate: (body, callback) => dispatch(PostJobCreate(body, callback))
});
export default connect(mapStateToProps, mapDispatchToProps)(JobCreate);
