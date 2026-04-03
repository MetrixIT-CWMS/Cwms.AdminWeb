import { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import localForage from '../../hooks/localForage';
import apis from '../../../config/apis.json';
import ApplicantUpdateComponent from '../../components/applicants/ApplicantUpdateComponent';
import { GetJobsTotalList } from '../../actions/jobs/JobsActions';

class ApplicantUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      description: '',
      fileName: 'choose file',
      file: null,
      selectedSrc: '',
      selectedJob: '',
      customJob: '',
      errMsg: '',
      countryCode: '',
      disable: false,
      aplcObj: {},
      jobsList: [],
      jobdata: {},
    };
  }

  componentDidMount() {
    this.setStateData();
    this.getJobsList();
  }

  setStateData = () => {
    const data = this.props.aplicantObj;
    this.setState({
      name: data.aName, email: data.aEmail, phoneNumber: data.aPhone, description: data.aDesc, file: data.aResume, selectedSrc: data.aSource, selectedJob: data.cjob, aplcObj: data,
      jobData: { _id: data.cjob, jobID: data.cJobID, jTitle: data.cjTitle }
    });
  }

  getJobsList = () => {
    this.props.GetJobsTotalList(resObj => {
      if (resObj.status == '200') {
        this.setState({ jobsList: resObj.resData.result.map(item => { return { label: item.jTitle, value: item._id, ...item } }) });
      } else {
        this.setState({ jobsList: [] });
      }
    });
  }

  handleNameChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(' ');
    const formattedWords = words.map((word) => word ? word[0].toUpperCase() + word.slice(1) : '');
    let formattedName = formattedWords.join(' ');
    if (value.endsWith(' ')) {
      formattedName += ' ';
    }
    this.setState({ name: formattedName, errMsg: '' });
  };

  handleEmailChange = (e) => {
    const cleanedEmail = e.target.value.replace(/\s/g, '').toLowerCase();
    this.setState({ email: cleanedEmail, errMsg: '' });
  }

  handleCountryCodeChange = (e) => {
    this.setState({ countryCode: e.target.value, errMsg: '' });
  }

  handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.length > 10) {
        this.setState({ errMsg: ' ', });
      } else {
        this.setState({ phoneNumber: value, errMsg: '', });
      }
    }
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value, errMsg: '' });
  };

  handleSrcChange = (e) => {
    this.setState({ selectedSrc: e.target.value, errMsg: '' });
  }
  handleSelectedJob = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    this.setState({ selectedJob: value, errMsg: '', jobData: selectedOption });

  };

  handleInputChange = (e) => {
    this.setState({ customJob: e.target.value, errMsg: '' });
  }
  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({
        fileName: file.name, file: file,
      });
    }
    this.setState({ errMsg: '' });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { selectedJob, selectedSrc, name, email, phoneNumber, description, file, aplcObj, jobsList, jobData } = this.state;
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
        _id: aplcObj._id,
        cjob: jobData._id,
        cJobID: jobData.jobID,
        cjTitle: jobData.jTitle,
        aName: name,
        aEmail: email,
        aPhone: phoneNumber,
        aDesc: description,
        aSource: selectedSrc,
        arPath: aplcObj.arPath
      }
      const data = new FormData();
      data.append('aData', JSON.stringify(reqBody));
      data.append('file', file);
      const atObj = await localForage.getItem('accesstoken');
      const atData = atObj.value;
      const headers = { headers: { cwmsadatoken: atData.cwmsadatoken } };
      this.apiCall(data, headers);
    }
  }
  apiCall = (data, headers) => {
    const { aplcObj } = this.state;
    const rid = aplcObj.arPath.split('/')[6];
    const original = aplcObj;
    const { name, email, phoneNumber, description, selectedSrc, selectedJob, file } = this.state;

    const resumeUnchanged = typeof file === 'string' && file === original.aResume;

    const noChanges =
      original.aName === name && original.aEmail === email && original.aPhone === phoneNumber && original.aDesc === description && original.aSource === selectedSrc && original.cjob === selectedJob && (!file || resumeUnchanged);

    if (noChanges) {
      this.setState({ errMsg: 'No changes detected', disable: false });
    } else {
      axios.put(apis.PutAdJbApplicantUpdateAPI + rid, data, headers)
        .then(async (res) => {
          if (res.status == 200) {
            this.props.handleCloseUpdate('');
          } else {
            this.setState({ errMsg: 'Job Application Updation Failed', disable: false });
          }
        }).catch((err) => {
          if (err.response?.data?.status == '103') {
            this.setState({ errMsg: 'Job Application Already Exists', disable: false });
          } else this.setState({ errMsg: 'Job Application Updation Failed', disable: false });
        });
    }
  }

  render() {
    return <ApplicantUpdateComponent state={this.state} handleNameChange={this.handleNameChange} handleEmailChange={this.handleEmailChange} handlePhoneNumberChange={this.handlePhoneNumberChange} handleSrcChange={this.handleSrcChange} handleDescriptionChange={this.handleDescriptionChange} handleFileChange={this.handleFileChange} handleSelectedJob={this.handleSelectedJob} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} handleCountryCodeChange={this.handleCountryCodeChange} />
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  GetJobsTotalList: (callback) => dispatch(GetJobsTotalList(callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantUpdate);