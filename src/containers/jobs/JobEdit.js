/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */


import { Component } from 'react';
import { connect } from 'react-redux';
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { PutJobUpdate } from '../../actions/jobs/JobsActions';
import { initCaps } from '../../hooks/common';
import { JobEditComponent } from '../../components/jobs'

class JobEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      action: props.state.action,
      userInfo: props.state.userInfo,
      editorState: EditorState.createEmpty(),
      jobData: { jobID: '', jTitle: '', jType: 'Full-time', jExp: '', jPstns: '', jLoc: '', jpDate: '', jeDate: '', jCompany: '', jwLoc: '', jDesc: '', jStatus: 'Active' },
      disabled: false,
      errors: {},
      errMsg: '',
      listObj: {},
      prevObj: {},
      disableEdit: false
    }
  }
  componentDidMount = () => {    
    this.getJobData(this.props.state.listObj || {});
    const disableEdit = this.props.state?.disableEditIcon[this.props.state.index];    
    this.setState({ disableEdit });
  }
  getJobData = (resObj) => {
    const data = this.setData(resObj);
    const html = typeof data.jDesc === 'string' ? data.jDesc : '';
    const blocksFromHtml = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({ jobData: data, editorState: editorState, listObj: resObj, prevObj: data });
  };

  setData = (res) => {
    return { ...res, jpDate: res.jpDtStr, jeDate: res.jeDtStr };
  }
  setStateData = (data) => this.setState({ ...data });
  handleJobChange = (e) => {
    const { name, value } = e.target;
    let val;
    if (name === 'jTitle') val = initCaps(value);
    else val = value;
    this.setState((prevState) => ({ jobData: { ...prevState.jobData, [name]: val }, errors: { ...prevState.errors, [name]: '' }, errMsg:'' }));
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
  handleUpdateJob = () => {
    const { jobData, editorState, prevObj } = this.state;
    const { jobID, jTitle, jCompany, jExp, jLoc, jPstns, jType, jpDate, jeDate, jwLoc, jStatus } = jobData;
    const isValid = this.validateJobData();
    if (isValid) {
      this.setState({ disabled: true, errMsg: '' });
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const jDesc = draftToHtml(rawContentState);
      const reqBody = { id: this.props.state.listObj?._id, jobID, jTitle, jCompany, jExp, jLoc, jPstns, jType, jpDtStr: jpDate, jeDtStr: jeDate, jwLoc, jDesc, jStatus };
      const reqBody1 = { id: prevObj._id, jobID: prevObj.jobID, jTitle: prevObj.jTitle, jCompany: prevObj.jCompany, jExp: prevObj.jExp, jLoc: prevObj.jLoc, jPstns: prevObj.jPstns, jType: prevObj.jType, jpDtStr: prevObj.jpDate, jeDtStr: prevObj.jpDate, jeDtStr: prevObj.jeDate, jwLoc: prevObj.jwLoc, jDesc: prevObj.jDesc, jStatus: prevObj.jStatus }
      const hasChanges = Object.keys(reqBody).some(key => reqBody[key] !== reqBody1[key]);
      if (hasChanges) {
        this.props.PutJobUpdate(reqBody, (resObj) => {
          if (resObj?.status === '200') {
            this.setState({ jobData: { jobID: '', jTitle: '', jType: 'Full-time', jExp: '', jPstns: '', jLoc: '', jpDate: '', jeDate: '', jCompany: '', jwLoc: '', jDesc: '', jStatus: 'Active' }, errors: {}, errMsg: '', editorState: EditorState.createEmpty(), disabled: false });
            this.props.setStateData({ actionShow: false, action: '' });
            this.props.getJobsList(1, 10, '', 'Active');
          } else if (resObj?.status === '103') {
            this.setState({ errMsg: 'Job ID Already exists', disabled: false });
          } else {
            this.setState({ errMsg: 'Failed to update job.', disabled: false });
          }
        });
      } else {
        this.setState({ errMsg: 'There are no changes', disabled: false });
      }
    }

  }
  handleClose = () => {
    this.setState({ jobData: { jobID: '', jTitle: '', jType: 'Full-time', jExp: '', jPstns: '', jLoc: '', jpDate: '', jeDate: '', jCompany: '', jwLoc: '', jDesc: '', appliedCount: 0, jStatus: 'Active' }, errors: {}, errMsg: '' });
    this.props.setStateData({ actionShow: false, action: '' });
  }
  handleEditIconClick = () => {
    this.props.handleActionClick('Edit', this.state.listObj);
    this.setState({ action: 'Edit' });
  }
  render() {
    return <JobEditComponent state={this.state} setStateData={this.setStateData} handleJobChange={this.handleJobChange} handleUpdateJob={this.handleUpdateJob} handleClose={this.handleClose} handleEditIconClick={this.handleEditIconClick} />
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  PutJobUpdate: (body, callback) => dispatch(PutJobUpdate(body, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(JobEdit);
