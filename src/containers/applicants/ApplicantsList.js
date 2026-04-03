/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import apis from '../../../config/apis.json';
import configJson from '../../../config/config.json';
import { ApplicantsListComponent } from '../../components/applicants';
import { PostAdJbApplictnList, PostAdPdfView } from '../../actions/jobapplicants/JobApplicationAction';

class ApplicantsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actionShow: false, action: '', actions: { create: 'Create', view: 'View', edit: 'Update' },
      admnJobApplicntList: [],
      admnJobApplicntListCount: 0,
      page: 1,
      searchStr: '',
      limit: 10,
      isSearch: false,
      aplicantObj: {},
      pdfShow: false, pdfMessage: '',
      pdfUrl: ''
    }
  }

  componentDidMount = () => {
    const { page, limit, searchStr, isSearch } = this.state;
    this.getAdJbApplictnList(page, limit, searchStr, isSearch);
  }

  getAdJbApplictnList = (page, limit, searchStr, isSearch) => {
    const reqBody = {
      page: page,
      limit: limit,
      searchStr: searchStr
    };
    this.props.PostAdJbApplictnList(reqBody, resObj => {
      if (resObj.status == '200') {
        this.setState({ admnJobApplicntList: resObj.resData.result.list, admnJobApplicntListCount: resObj.resData.result.count, page, limit, searchStr });
      } else {
        this.setState({ admnJobApplicntList: [], admnJobApplicntListCount: 0 });
      }
    });
  }

  handleChangeSearch = (e) => {
    const { limit } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getAdJbApplictnList(1, limit, '', false);
  }
  handleKeyInput = (e) => {
    e.key === 'Enter' && this.getAdJbApplictnList(1, this.state.limit, this.state.searchStr, false);
  }

  handleChangeLimit = (e) => {
    const { searchStr } = this.state;
    let limit = e.target.value;
    this.getAdJbApplictnList(1, limit, searchStr, false);
  }

  handlePagination = (e) => {
    const { limit, searchStr, status } = this.state;
    const page = e.selected + 1;
    this.setState({ page });
    this.getAdJbApplictnList(page, limit, searchStr, false);
  };

  setStateData = (data) => this.setState({ ...data });

  handleActionClick = (action, item = {}) => {
    this.setState({ actionShow: true, action, aplicantObj: item })
  }

  handleCloseUpdate = () => {
    this.setState({ actionShow: false, action: '', aplicantObj: {} })
    const { page, limit, searchStr, isSearch } = this.state;
    this.getAdJbApplictnList(page, limit, searchStr, isSearch);
  }
  fileOpen = (item) => {
    const isPdf = item.arPath?.toLowerCase().endsWith('.pdf');
    if (isPdf) {
      this.openPdfFromApi(item.arPath);
    } else {
      this.downloadFile(item.arPath, item.aResume);
    }
  }
  openPdfFromApi = async (arPath) => {
    const pArr = arPath.split(configJson.filesBk);
    if (pArr.length > 1) {
      const reqBody = { filepaths: [pArr[1]] };
      this.props.PostAdPdfView(reqBody, resObj => {        
        if (resObj.status == '200') {
          const signedUrl = resObj.resData.result.urls[0];
          if (signedUrl !== 'null') {
            this.setState({ pdfShow: true, pdfUrl: signedUrl, pdfMessage: '' });
          } else {
            this.setState({ pdfShow: true, pdfUrl: '', pdfMessage: 'File not Found' });
          }
        } else {
          this.setState({ pdfShow: true, pdfUrl: '', pdfMessage: 'File not Found' });
        }
      });
    } else this.setState({ pdfShow: true, pdfUrl: arPath, pdfMessage: '' });
  }
  downloadFile = (filePath, fileName) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName || "document.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    return (
      <ApplicantsListComponent state={this.state} setStateData={this.setStateData} handleActionClick={this.handleActionClick} handleChangeSearch={this.handleChangeSearch} handleKeyInput={this.handleKeyInput} handleChangeLimit={this.handleChangeLimit} handleCloseUpdate={this.handleCloseUpdate} handlePagination={this.handlePagination}
        downloadFile={this.downloadFile} fileOpen={this.fileOpen} />
    )
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  PostAdJbApplictnList: (body, callback) => dispatch(PostAdJbApplictnList(body, callback)),
  PostAdPdfView: (body, callback) => dispatch(PostAdPdfView(body, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantsList);
