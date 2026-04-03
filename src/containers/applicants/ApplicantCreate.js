import { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment/moment';

import localForage from '../../hooks/localForage';
import apis from '../../../config/apis.json';
import { GetJobsTotalList } from '../../actions/jobs/JobsActions';
import { ApplicantCreateComponent } from '../../components/applicants';

class ApplicantCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobsList: [],
      jobData: {},
      selectedJob: '',
      name: '',
      email: '',
      phoneNumber: '',
      description: '',
      fileName: 'choose file',
      file: null,
      selectedSrc: '',
      customJob: '',
      errMsg: '',
      countryCode: '',
      disable:false
    };
  }

  componentDidMount = () => {
    this.getJobsList();
  }

  getJobsList = () => {
    this.props.GetJobsTotalList(resObj => { 
      if (resObj.status == '200') {
        this.setState({ jobsList: resObj.resData.result.map(item => { return { label: item.jTitle, value: item._id, ...item }}) });
      } else {
        this.setState({ jobsList: [] });
      }
    });
  }

  handleSelectedJob = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    this.setState({ selectedJob: value, errMsg: '', jobData: selectedOption });
  };

  handleNameChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(' ');
    const formattedWords = words.map((word) => word ? word[0].toUpperCase() + word.slice(1) : '');
    let formattedName = formattedWords.join(' ');
    if (value.endsWith(' ')) formattedName += ' ';
    this.setState({ name: formattedName, errMsg: ''  });
  };

  handleEmailChange = (e) => {
    const cleanedEmail = e.target.value.replace(/\s/g, '').toLowerCase();
    this.setState({ email: cleanedEmail, errMsg: '' });
  }

  handleCountryCodeChange = (e) => {
    this.setState({ countryCode: e.target.value , errMsg: ''});
  }

  handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.length > 10) this.setState({ errMsg: ' ' });
      else this.setState({ phoneNumber: value, errMsg: '' });
    }
  };
  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value, errMsg: ''});
  };
  handleSrcChange = (e) => {
    this.setState({ selectedSrc: e.target.value, errMsg: '' });
  }
  handleInputChange = (e) => {
    this.setState({ customJob: e.target.value, errMsg: '' });
  }
  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({ fileName: file.name, file, errMsg: '' });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { selectedJob, selectedSrc, name, email, phoneNumber, description, file, jobData } = this.state;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    if (!selectedJob) {
      this.setState({ errMsg: 'Job is required' });
    } else if (!name.trim()) {
      this.setState({ errMsg: 'Applicant Name is required' });
    } else if (!email.trim()) {
      this.setState({ errMsg: 'Applicant Email is required' });
    } else if (!emailRegex.test(email)) {
      this.setState({ errMsg: 'Invalid Email format' });
    } else if (!phoneNumber.trim()) {
      this.setState({ errMsg: 'Mobile  Number is required' });
    } else if (phoneNumber.length !== 10) {
      this.setState({ errMsg: 'Invalid Mobile Number', });
    } else if (!selectedSrc) {
      this.setState({ errMsg: 'Source is required' });
    } else if (!description) {
      this.setState({ errMsg: 'Description is required' });
    } else if (!file) {
      this.setState({ errMsg: 'Applicant Resume is required' });
    } else {
      const reqBody = {
        cjob: jobData._id,
        cJobID: jobData.jobID,
        cjTitle: jobData.jTitle,
        aName: name,
        aEmail: email,
        aPhone: phoneNumber,
        aDesc: description,
        aSource:selectedSrc,
      }
      const data = new FormData(); 
      data.append('aData', JSON.stringify(reqBody));
      data.append('file', file);
      const atObj = await localForage.getItem('accesstoken');
      const atData = atObj.value;
      const headers = { headers: { cwmsadatoken: atData.cwmsadatoken } };
      this.apiCall(data, jobData.cCode, headers);
    }
  }

  apiCall = (data, cCode, headers) => {
    const rid = cCode + moment().format('YYYYMMDD-HHmmss');
    axios.post(apis.PostAdJbApplicantCreateAPI + rid, data, headers)
      .then(async (res) => {
        if (res.status == '200') {
          this.props.setStateData({ actionShow: false });
          this.props.handleCloseUpdate();
        } else {
          this.setState({ errMsg: 'Job Application creation failed', disable: false });
        }
      }).catch((err) => {
        if (err.response?.data?.status == '103') {
          this.setState({ errMsg: 'Job Application already exists', disable: false });
        } else this.setState({ errMsg: 'Job Application creation failed', disable: false });
      });
  }

  render() {
    return <ApplicantCreateComponent state={this.state} handleNameChange={this.handleNameChange} handleEmailChange={this.handleEmailChange} handlePhoneNumberChange={this.handlePhoneNumberChange} handleSrcChange={this.handleSrcChange} handleDescriptionChange={this.handleDescriptionChange} handleFileChange={this.handleFileChange} handleSelectedJob={this.handleSelectedJob} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} handleCountryCodeChange={this.handleCountryCodeChange} actionShow={this.props.actionShow} setStateData={this.props.setStateData}/>
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  GetJobsTotalList: (callback) => dispatch(GetJobsTotalList(callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantCreate);
