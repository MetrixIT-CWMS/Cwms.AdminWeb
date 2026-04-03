/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React, { act } from 'react';
import { connect } from 'react-redux';

import { AdminUsersListComponent } from '../../components/admin-users';
import { PostAdUsersList, PutAdUserStatsUpdate, PutAdUserPswdUpdatete } from '../../actions/admin-user/AdminUserAction';

class AdminUsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stModal: false,
      actionShow: false,
      action: '',
      actions: { create: 'Create', edit: 'Edit', view: 'View', statusUpdate: 'Status Update', pswdUpdate: 'Password Update' },

      admnUsrsList: [],
      admnUsrsListCount: 0,
      page: 1,
      searchStr: '',
      limit: 10,
      isSearch: false,

      showCreate: false,
      showView: false,
      showEdit: false,
      showStatus: false,
      admnView: {},
      errMsg: '',
      disable: false,
      uStatus: '',

      passwordModel: false,
      changePassword: '',
      showChangePassword: false,
      sucMsg: '',

      password: '',
      showPassword: '',
      confirmPassword: '',

    };
  };

  componentDidMount = () => {
    const { page, limit, searchStr, isSearch } = this.state;
    this.getAdminUsrsList(page, limit, searchStr, isSearch);
  }
  getAdminUsrsList = (page, limit, searchStr, isSearch) => {
    const reqBody = { page, limit, searchStr };
    this.props.PostAdUsersList(reqBody, resObj => {
      if (resObj.status == '200') {
        this.setState({ admnUsrsList: resObj.resData.result.list, admnUsrsListCount: resObj.resData.result.count, page, limit, searchStr });
      } else if (isSearch) {
        this.setState({ admnUsrsList: [], admnUsrsListCount: 0, page: 1, limit, searchStr });
      } else {
        this.setState({ AdminUsersList: [], admnUsrsListCount: 0 });
      }
    });
  }
  handleChangeSearch = (e) => {
    const { limit } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getAdminUsrsList(1, limit, '', false);
  }
  handleKeyInput = (e) => {
    e.key === 'Enter' && this.getAdminUsrsList(1, this.state.limit, this.state.searchStr, true);
  }
  handleChangeLimit = (e) => {
    const { searchStr } = this.state;
    let limit = e.target.value
    this.getAdminUsrsList(1, limit, searchStr, false);
  }
  handlePagination = (e) => {
    const { limit, searchStr, status } = this.state;
    const page = e.selected + 1;
    this.setState({ page });
    this.getAdminUsrsList(page, limit, searchStr, false);
  }

  setStateData = (data) => this.setState({ ...data });

  handleActionClick = (action) => this.setState({ action, actionShow: true });

  handleAdminCreate = (value) => {
    const { page, limit, searchStr, isSearch } = this.state;
    value != 'create' && this.getAdminUsrsList(page, limit, searchStr, isSearch);
    this.setState({ showCreate: !this.state.showCreate });
  }
  handleCreateClose = () => {
    this.setState({ showCreate: false });
  }

  handleAdmnView = (item) => {
    this.setState({ admnView: item, showView: true });
  }

  handleAdmnEdit = (item, value) => {
    const { page, limit, searchStr, isSearch } = this.state;
    value != 'update' && this.getAdminUsrsList(page, limit, searchStr, isSearch);
    this.setState({ admnView: item, showEdit: !this.state.showEdit });
  }
  handleEditClose = () => {
    this.setState({ showEdit: false });
  }

  handleAdminStsUpdt = (item) => {
    this.setState({ uStatus: item.uStatus, showStatus: true, admnView: item, disable: false });
  }

  handleStatsChange = (e) => {
    const uStatus = e.target.value;
    this.setState({ uStatus })
  }

  handleStatusUpdate = () => {
    const { admnView, uStatus, page, limit, searchStr, isSearch } = this.state;
    const recordId = admnView._id;
    const oldObj = { uStatus: admnView.uStatus }
    const reqBody = { uStatus };
    if (JSON.stringify(reqBody) == JSON.stringify(oldObj)) {
      this.setState({ errMsg: "There are no Changes" })
    } else {
      this.props.PutAdUserStatsUpdate(recordId, reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.setState({ showStatus: false, disable: true });
          this.getAdminUsrsList(page, limit, searchStr, isSearch);
        } else {
          this.setState({ errMsg: 'Status update failed', disable: false });
        }
      });
    }
  }

  handleAdminPassword = (item) => {
    this.setState({ admnView: item, passwordModel: true });
  }

  changePassWordValue = (e) => this.setState({ changePassword: e.target.value, errMsg: '' });
  handleConfirmPasswordShowHide = () => {
    this.setState({ showChangePassword: !this.state.showChangePassword });
  }
  handleChangePassword = () => {
    const { changePassword, admnView } = this.state;
    const pswdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=])[A-Za-z\d~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=]{8,20}$/;
    if (!changePassword) {
      this.setState({ errMsg: 'Change Password is Requied' });
    } else if (changePassword.length < 8) {
      this.setState({ errMsg: 'Change Password Should Be Greater Than 7 Characters' });
    } else if (changePassword && (changePassword.toLowerCase().includes('password') || !pswdRegex.test(changePassword))) {
      this.setState({ errMsg: 'Change Password is not matching its rules' });
    } else {
      const recordId = admnView._id;
      const reqBody = { password: changePassword };
      this.setState({ disable: true });
      this.props.PutAdUserPswdUpdatete(recordId, reqBody, (resObj) => {
        if (resObj.status === '200') {
          this.setState({ passwordModel: false, disable: false, changePassword: '' });
        } else {
          this.setState({ errMsg: 'Password Updation Failed' });
        }
      });
    }
  }

  render() {
    return (
      <AdminUsersListComponent state={this.state} setStateData={this.setStateData} handleActionClick={this.handleActionClick} handleChangeSearch={this.handleChangeSearch} handleKeyInput={this.handleKeyInput} handleChangeLimit={this.handleChangeLimit} handleChangePage={this.handleChangePage} handleAdmnView={this.handleAdmnView} handleAdmnEdit={this.handleAdmnEdit} handleStatusUpdate={this.handleStatusUpdate} handleAdminStsUpdt={this.handleAdminStsUpdt} handleStatsChange={this.handleStatsChange} handleAdminCreate={this.handleAdminCreate} handleChangePassword={this.handleChangePassword} changePaswword={this.changePaswword} handlePasswordShowHide={this.handlePasswordShowHide} changeConfirmPassWord={this.changeConfirmPassWord} handleConfirmPasswordShowHide={this.handleConfirmPasswordShowHide} handleAdminPassword={this.handleAdminPassword} changePassWordValue={this.changePassWordValue} handlePagination={this.handlePagination} handleCreateClose={this.handleCreateClose} handleEditClose={this.handleEditClose} />
    );
  };
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  PostAdUsersList: (body, callback) => dispatch(PostAdUsersList(body, callback)),
  PutAdUserStatsUpdate: (recordId, body, callback) => dispatch(PutAdUserStatsUpdate(recordId, body, callback)),
  PutAdUserPswdUpdatete: (recordId, body, callback) => dispatch(PutAdUserPswdUpdatete(recordId, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(AdminUsersList);
