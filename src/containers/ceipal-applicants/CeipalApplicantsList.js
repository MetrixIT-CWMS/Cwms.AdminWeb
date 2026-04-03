/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { Component } from 'react';
import { connect } from 'react-redux';
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import moment from 'moment/moment';

import { CeipalApplicantsListComponent } from '../../components/ceipal-applicants';
import { PostCiepalApplicantsResumesList, PostCiepalApplicantsResumesTotalList, GetCiepalClientsList } from '../../actions/ceipal-applicants/CeipalApplicantsActions';
import localForage from '../../hooks/localForage';

class CeipalApplicantsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1, limit: 10, searchStr: '',
      applicantsList: [], applicantsListCount: 0,
      skillModal: false, listObj: {},
      selectedDate: moment().format("YYYY-MM-DD"), isExporting: false,
      viewModal: false,
      userInfo: {},
      skillsSearch: null,
      skillsArr: [],
      filterDate: '',
      startDate: '', endDate: '', showCustomDates: false,
      minFromDate: '', maxFromDate: '', maxToDate: '',
      clientsList: [], selectedClient: null
    }
    this.dropdownRef = null;
  }
  async componentDidMount() {
    const { page, limit, searchStr, skillsArr, filterDate, selectedClient } = this.state;
    const ui = await localForage.getItem('userObj');
    const userInfo = ui.value || {};
    const { startDate, endDate } = this.setFilteredDate(filterDate);
    this.getClientsList();
    this.setState({ userInfo, startDate, endDate }, () => {
      if (userInfo.uRole === 'Admin') {
        this.getApplicantsList(page, limit, searchStr, skillsArr, startDate, endDate, selectedClient);
      }
    });
  }
  setStateData = (data) => this.setState({ ...data });
  getApplicantsList = (page, limit, searchStr, skillsArr, startDate, endDate, sClients) => {
    const reqBody = {
      page, limit, searchStr, skillsArr, startDate, endDate, sClients
    };    
    this.props.PostCiepalApplicantsResumesList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ applicantsList: resObj.resData.result.list, applicantsListCount: resObj.resData.result.count, page, limit, searchStr });
      } else {
        this.setState({ applicantsList: [], applicantsListCount: 0 });
      }
    })
  }
  setFilteredDate = (filterDate) => {
    const today = new Date();
    let startDate = '';
    let endDate = today.toISOString().split('T')[0];

    if (filterDate === 'Upto 7 days') {
      const from = new Date();
      from.setDate(today.getDate() - 6);
      startDate = from.toISOString().split('T')[0];
    }

    return { startDate, endDate };
  };
  getClientsList = () => {
    this.props.GetCiepalClientsList({}, (resObj) => {
      if (resObj.status === '200') {
        const resData = resObj.resData.result;
        const clientsList = resData.map(item => {
            const clientName = item.client?.toUpperCase();
            return { ...item, label: clientName, value: clientName };
          })
        this.setState({ clientsList });
      }
    })
  }
  filterChange = (e) => {
    const { limit, searchStr, skillsArr, selectedClient } = this.state;
    const value = e.target.value;
    const today = new Date();

    const formatDate = (date) => date.toISOString().split("T")[0];

    let startDate = "";
    let endDate = "";
    let showCustomDates = false;
    let minFromDate = "";
    let maxFromDate = "";
    let maxToDate = "";

    if (value === "Upto 7 days") {
      const from = new Date();
      from.setDate(today.getDate() - 6);

      startDate = formatDate(from);
      endDate = formatDate(today);
    }

    if (value === "Today") {
      startDate = formatDate(today);
      endDate = formatDate(today);
    }

    if (value === "Yesterday") {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      startDate = formatDate(yesterday);
      endDate = formatDate(yesterday);
    }

    if (value === "Custom Dates") {
      showCustomDates = true;

      const minDate = new Date();
      minDate.setDate(today.getDate() - 365);

      minFromDate = formatDate(minDate);
      maxFromDate = formatDate(today);
    }

    this.setState({ filterDate: value, startDate, endDate, showCustomDates, minFromDate, maxFromDate, maxToDate });
    if (value !== "Custom Dates") {
      this.getApplicantsList(1, limit, searchStr, skillsArr, startDate, endDate, selectedClient);
    }
  };
  handleFromDateChange = (e, type) => {
    const { value } = e.target;
    const { limit, searchStr, skillsArr, startDate, selectedClient } = this.state;

    const formatDate = (date) => date.toISOString().split("T")[0];

    if (type === 'from') {
      const today = new Date();
      const from = new Date(value);
      let maxToDate = "";
      const plus30 = new Date(from);
      plus30.setDate(from.getDate() + 30);

      if (from.getMonth() === today.getMonth() && from.getFullYear() === today.getFullYear()) {
        maxToDate = formatDate(today);
      } else {
        maxToDate = formatDate(plus30);
      }
      this.setState({ startDate: value, maxToDate, endDate: "" });

    } else {
      if (startDate && value < startDate) {
        alert("End date should be greater than or equal to Start date");
        return;
      }
      this.setState({ endDate: value }, () => {
        if (startDate && value) {
          this.getApplicantsList(1, limit, searchStr, skillsArr, startDate, value, selectedClient);
        }
      });
    }
  };
  handleChangeSearch = (e) => {
    const { limit, userInfo, skillsArr, startDate, endDate, selectedClient } = this.state;
    const { value } = e.target;
    this.setState({ searchStr: value });
    if (value === "") {
      if (userInfo?.uRole === "Admin") {
        this.getApplicantsList(1, limit, "", skillsArr, startDate, endDate, selectedClient);
      } else {
        this.setState({ applicantsList: [], applicantsListCount: 0 });
      }
    }
  }
  handleSkillsSearch = (selectedOptions) => {
    const { limit, userInfo, searchStr, startDate, endDate, selectedClient } = this.state;
    const skills = selectedOptions ? selectedOptions.map((opt) => opt.value.toLowerCase()) : "";
    this.setState({ skillsArr: skills });
    if (skills === "") {
      if (userInfo?.uRole === "Admin") {
        this.getApplicantsList(1, limit, "", [], startDate, endDate, selectedClient);
      } else {
        this.setState({ applicantsList: [], applicantsListCount: 0 });
      }
    } else {
      this.getApplicantsList(1, limit, searchStr, skills, startDate, endDate, selectedClient);
    }
  };
  clientChange = (selectedOption) => {
    const { limit, userInfo, searchStr, startDate, endDate } = this.state;    
    const client = selectedOption ? selectedOption.value : "";
    const sClients = client.toLowerCase();
    if (!client) {
      this.setState({ selectedClient: null });
      if (userInfo?.uRole === "Admin") {
        this.getApplicantsList(1, limit, "", [], startDate, endDate, []);
      } else {
        this.setState({ applicantsList: [], applicantsListCount: 0 });
      }
    } else {
      this.setState({ selectedClient: [sClients] });
      this.getApplicantsList(1, limit, searchStr, [], startDate, endDate, [sClients]);
    }
  };
  handleKeyInput = (e) => {
    e.key === 'Enter' && this.getApplicantsList(1, this.state.limit, this.state.searchStr, this.state.skillsArr, this.state.startDate, this.state.endDate, this.state.selectedClient);
  }
  handleSearch = () => {
    this.getApplicantsList(1, this.state.limit, this.state.searchStr, this.state.skillsArr, this.state.startDate, this.state.endDate, this.state.selectedClient);
  }
  handleChangeLimit = (e) => {
    const { searchStr, skillsArr, startDate, endDate, selectedClient } = this.state;
    let limit = e.target.value;
    this.getApplicantsList(1, limit, searchStr, skillsArr, startDate, endDate, selectedClient);
  }

  handlePagination = (e) => {
    const { limit, searchStr, status, skillsArr, startDate, endDate, selectedClient } = this.state;
    const page = e.selected + 1;
    this.setState({ page });
    this.getApplicantsList(page, limit, searchStr, skillsArr, startDate, endDate, selectedClient);
  };
  getFilteredData = () => {
    const { applicantsList, selectedDate } = this.state;

    if (!selectedDate) return applicantsList;

    return applicantsList.filter(item => {
      const itemDate = item.cOn.split(" ")[0];
      return itemDate === selectedDate;
    });
  };
  prepareExportData = (data) => {
    return data.map(item => ({
      "First Name": item.fName,
      "Middle Name": item.mName,
      "Last Name": item.lName,
      "Full Name": item.nName,

      "Mobile Number": item.mobNum,
      "Email": item.email,
      "Resume Path": item.rPath,
      "LinkedIn URL": item.linkedinUrl,

      "Work Authorization": item.workAuth,
      "Experience (Years)": item.experience,
      "Application Status": item.appStatus,

      "Location": `${item.city}, ${item.state}, ${item.country} - ${item.zip}`,

      "Source": item.source,
      "Job Title": item.jobTitle,
      "Relocation": item.relocation,

      "Skills": item.skills,

      "Resume Full Name": item.resumeObj?.fullName,
      "Resume Email": item.resumeObj?.email,
      "Resume Phone": item.resumeObj?.phone,
      "Resume Skills": item.resumeObj?.skills?.join(", "),
      "Resume Experience": item.resumeObj?.experience?.length > 0 ? item.resumeObj?.experience.map(exp =>
        `Client: ${exp.client}, Company: ${exp.company}, Role: ${exp.role} (${exp.duration})`).join("; ") : ""
    }));
  };
  // downloadExcel = (exportData, selectedDate) => {
  //   const worksheet = XLSX.utils.json_to_sheet(exportData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");
  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array"
  //   });
  //   const data = new Blob([excelBuffer], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //   });
  //   saveAs(data, `Ceipal_Applicants_${selectedDate}.xlsx`);
  // };
  downloadExcel = (exportData, selectedDate) => {
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Get sheet range
    const range = XLSX.utils.decode_range(worksheet['!ref']);

    // Column indexes (based on your object order)
    const LINKEDIN_COL = 15;        // "LinkedIn URL"
    const RESUME_PATH_COL = 14;     // "Resume Path"
    const RESUME_DOWNLOAD_COL = 29; // "Resume Download URL"
    const RESUME_FILE_PATH_COL = 30;// "Resume File Path"

    for (let row = range.s.r + 1; row <= range.e.r; row++) {

      const addHyperlink = (colIndex) => {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: colIndex });
        const cell = worksheet[cellAddress];

        if (cell && cell.v && typeof cell.v === "string") {
          cell.l = { Target: cell.v };
          cell.s = { font: { color: { rgb: "0563C1" }, underline: true } };
        }
      };

      addHyperlink(LINKEDIN_COL);
      addHyperlink(RESUME_PATH_COL);
      addHyperlink(RESUME_DOWNLOAD_COL);
      addHyperlink(RESUME_FILE_PATH_COL);
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    saveAs(data, `Ceipal_Applicants_${selectedDate}.xlsx`);
    this.setState({ isExporting: false });
  };
  handleExport = () => {
    const { selectedDate, searchStr, startDate, endDate, isExporting, applicantsListCount, filterDate, skillsArr } = this.state;
    // if (!filterDate) {
    //   alert("Please select date range to export");
    //   return;
    // }
    if (filterDate === "Custom Dates") {
      if (!startDate || !endDate) {
        alert("Please select Start Date and End Date");
        return;
      }
    }
    if (isExporting) return;
    if (applicantsListCount > 5000) {
      alert("Export limit exceeded. Please filter results to 5000 or fewer applicants.");
      return;
    }
    this.setState({ isExporting: true });
    // const filteredData = this.getFilteredData();
    // if (filteredData.length === 0) {
    //   alert("No data found for selected date");
    //   this.setState({ isExporting: false });
    //   return;
    // }
    const reqBody = { startDate, endDate, searchStr, skillsArr };
    this.props.PostCiepalApplicantsResumesTotalList(reqBody, (resObj) => {
      if (resObj.status === "200") {
        this.setState({ isExporting: false });
        const exportData = this.prepareExportData(resObj.resData.result);
        this.downloadExcel(exportData, selectedDate);
      } else if (resObj.status === '606') {
        alert("Large data export in progress. Please wait..!");
      } else {
        this.setState({ isExporting: false });
        alert("Failed to fetch data for export");
      }
    });
  };
  downloadFile = (rPath) => {
    if (!rPath) {
      alert("File URL not available");
      return;
    }

    const link = document.createElement("a");
    link.href = rPath;
    link.target = "_blank";
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  render() {
    return <CeipalApplicantsListComponent
      state={this.state}
      setStateData={this.setStateData}
      handleChangeLimit={this.handleChangeLimit} handleChangeSearch={this.handleChangeSearch} handleKeyInput={this.handleKeyInput} handlePagination={this.handlePagination}
      handleExport={this.handleExport} downloadFile={this.downloadFile} handleSkillsSearch={this.handleSkillsSearch} handleSearch={this.handleSearch} filterChange={this.filterChange} handleFromDateChange={this.handleFromDateChange} clientChange={this.clientChange}
    />
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  PostCiepalApplicantsResumesList: (body, callback) => dispatch(PostCiepalApplicantsResumesList(body, callback)),
  PostCiepalApplicantsResumesTotalList: (body, callback) => dispatch(PostCiepalApplicantsResumesTotalList(body, callback)),
  GetCiepalClientsList: (body, callback) => dispatch(GetCiepalClientsList(body, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(CeipalApplicantsList);
