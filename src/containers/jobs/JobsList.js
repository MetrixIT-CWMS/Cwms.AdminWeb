/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { JobsListComponent } from '../../components/jobs';
import { PostJobsList, PutJobStatusUpdate, GetJobLyfCycleList } from '../../actions/jobs/JobsActions';
import localForage from '../../hooks/localForage';

class JobsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobsList: [],
      jobsListCount: 0,
      page: 1, limit: 10, searchStr: '', status: 'Active', prevSearchStr: '',
      actionShow: false, action: '',
      actions: { create: 'Create', edit: 'Edit', view: 'View', statusUpdate: 'Status Update', lc: 'Lifecycle' },
      stModal: false, listObj: {}, errMsg: '',
      disabled: false,
      lcList: [],
      disableEditIcon: [],
      jNotes:'',
      index: 0
    }
  }
  componentDidMount = async () => {
    const { page, limit, searchStr, status } = this.state;
    this.getJobsList(page, limit, searchStr, status);
    const ui = await localForage.getItem('userObj');
    const userInfo = ui.value || {};
    this.setState({ userInfo });
  }
  getJobsList = (page, limit, searchStr, status) => {
    const reqBody = { page, limit, searchStr, status };
    this.props.PostJobsList(reqBody, (resObj) => {
      if (resObj?.status === '200') {
        const resData = resObj.resData.result;
        this.setState({ jobsList: resData.list, jobsListCount: resData.count }, () => this.disableEdit(resData.list));
      } else {
        this.setState({ jobsList: [], jobsListCount: 0 });
      }
    });
  }
  disableEdit = (jList) => {
    const disableEditIcon = [];
    if (jList?.length > 0) {
      jList.forEach((item, index) => {
        const { cDtStr } = item;
        const offset = new Date().getTimezoneOffset();
        const cDate = moment(cDtStr, 'YYYY-MM-DD HH:mm').subtract(offset, 'minutes');
        const now = moment();
        const diffInMs = now.diff(cDate);
        const disable = diffInMs >= 24 * 60 * 60 * 1000;
        disableEditIcon[index] = disable;
      });
    }
    this.setState({ disableEditIcon });
  }
  setStateData = (data) => this.setState({ ...data });
  setTabs = (k) => {
    const { page, limit, searchStr } = this.state;
    this.setState({ status: k });
    this.getJobsList(page, limit, searchStr, k);
  }
  handleChangeLimit = (e) => {
    const { searchStr, status } = this.state;
    const { value } = e.target;
    this.setState({ limit: value, page: 1 });
    this.getJobsList(1, value, searchStr, status);
  }
  handleChangeSearch = (e) => {
    const { page, limit, status } = this.state;
    const { value } = e.target;
    this.setState({ searchStr: value });
    if (value === '') {
      this.setState({ prevSearchStr: '' });
      this.getJobsList(page, limit, '', status);
    }
  }
  handleSearch = () => {
    const { page, limit, searchStr, prevSearchStr, status } = this.state;
    if (searchStr.trim() !== prevSearchStr.trim()) {
      this.setState({ prevSearchStr: searchStr });
      this.getJobsList(page, limit, searchStr, status);
    }
  };
  handleKeyInput = (e) => {
    const { page, limit, searchStr, prevSearchStr, status } = this.state;
    if (e.key === 'Enter') {
      if (searchStr.trim() !== prevSearchStr.trim()) {
        this.setState({ prevSearchStr: searchStr });
        this.getJobsList(page, limit, searchStr, status);
      }
    }
  };
  handlePagination = (e) => {
    const { limit, searchStr, status } = this.state;
    const page = e.selected + 1;
    this.setState({ page });
    this.getJobsList(page, limit, searchStr, status);
  };
  handleActionClick = (action, obj = {}, i = 0) => {
    this.setState({ action, listObj: obj, stModal: action === 'Status Update', actionShow: action !== 'Status Update', index: i });
    if (action === 'Lifecycle' && obj?._id) {
      this.getLcList(obj);
    }
  };
  getLcList = (obj) => {
    this.props.GetJobLyfCycleList(obj._id, (resObj) => {
      if (resObj?.status === '200') {
        this.setState({ lcList: resObj.resData.result, listObj: obj });
      } else {
        this.setState({ listObj: [], listObj: obj });
      }
    });
  }
  jobStatusUpdate = () => {
    const { page, limit, searchStr, status, listObj, jNotes } = this.state;
    const jSt = listObj.jStatus === 'Active' ? 'Closed' : 'Active';
    this.setState({ disabled: true, errMsg: '' });
    const reqBody = { id: listObj._id, status: jSt, notes: jNotes };
    this.props.PutJobStatusUpdate(reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ stModal: false, listObj: {}, disabled: false, errMsg: '', jNotes:'' });
        this.getJobsList(page, limit, searchStr, status);
      } else {
        this.setState({ errMsg: 'Job status update failed', disabled: false });
      }
    });
  }
  render() {
    return (
      <JobsListComponent state={this.state} setStateData={this.setStateData} handleActionClick={this.handleActionClick} getJobsList={this.getJobsList} jobStatusUpdate={this.jobStatusUpdate}
        setTabs={this.setTabs} handleChangeLimit={this.handleChangeLimit} handleChangeSearch={this.handleChangeSearch} handleSearch={this.handleSearch} handleKeyInput={this.handleKeyInput} handlePagination={this.handlePagination} />
    )
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  PostJobsList: (body, callback) => dispatch(PostJobsList(body, callback)),
  PutJobStatusUpdate: (body, callback) => dispatch(PutJobStatusUpdate(body, callback)),
  GetJobLyfCycleList: (id, callback) => dispatch(GetJobLyfCycleList(id, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsList);
