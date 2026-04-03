/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import moment from 'moment/moment';
import ReactPaginate from 'react-paginate';

import HeaderComponent from '../header/HeaderComponent';
import SidebarComponent from '../sidebar/SidebarComponent';
import NodataImg from '../../assets/img/no-data.gif';
import JobsLyfCycleListComponent from './JobsLyfCycleListComponent';
import { JobCreate, JobEdit } from '../../containers/jobs';

const JobsListComponent = (props) => {
  const { jobsList, jobsListCount, page, searchStr, status, limit, actions, action, actionShow, stModal, listObj, errMsg, disabled, disableEditIcon, userInfo, jNotes } = props.state;
  const { setStateData, setTabs, handleChangeLimit, handleChangeSearch, handlePagination, handleKeyInput, handleActionClick, getJobsList, jobStatusUpdate, handleSearch } = props;

  return (
    <div className='main-wrapper'>
      <HeaderComponent />
      <SidebarComponent />
      <div className='page-wrapper'>
        <div className='content container-fluid'>
          <div className='page-header'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='d-flex justify-content-between'>
                  <h4>Jobs</h4>
                  <a className='btn btn-primary btn-sm' onClick={() => handleActionClick(actions.create)}><i className='fas fa-plus'></i> Add Job</a>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='card'>
                <div className='card-body'>
                  <div className='custom-tab-1'>
                    <Tabs activeKey={status} onSelect={(k) => setTabs(k)} className=''>
                      <Tab eventKey='Active' title='Active' ></Tab>
                      <Tab eventKey='Closed' title='Closed' ></Tab>
                    </Tabs>
                  </div>
                  <div className='table-responsive'>
                    <div className='dataTables_wrapper'>
                      <div className='dataTables_length' id='example_length'>
                        <label> Show
                          <select name='datatables-reponsive_length' aria-controls='datatables-reponsive' className='form-select w-100' value={limit} onChange={handleChangeLimit}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                          </select>
                          entries
                        </label>
                      </div>
                      <div id='example_filter' className='dataTables_filter'>
                        <label>Search:
                          <input type='search' className='' placeholder='Search' value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} /></label>
                        {<div className='search-icon'><a onClick={handleSearch}><i className='fa-solid fa-magnifying-glass'/></a></div>}
                      </div>
                    </div>
                    <table className='datatable table table-bordered'>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Company</th>
                          <th>Experience</th>
                          <th>Location</th>
                          <th>Positions</th>
                          <th>Type</th>
                          <th>Posted Date</th>
                          <th>Expiry Date</th>
                          <th>Work Location</th>
                          <th className='text-end'>Actions</th>
                        </tr>
                      </thead>
                      {jobsList?.length > 0 ? <tbody>
                        {jobsList.map((item, i) => {
                          const { jTitle, jCompany, jExp, jLoc, jPstns, jType, jobID, jeDtStr, jpDtStr, jwLoc } = item;
                          const pDt = jpDtStr ? moment(jpDtStr).format('Do MMM, YYYY') : '';
                          const eDt = jeDtStr ? moment(jeDtStr).format('Do MMM, YYYY') : '';
                          return (
                            <tr key={item.id + '-' + i}>
                              <td>{jobID}</td>
                              <td>{jTitle}</td>
                              <td>{jCompany}</td>
                              <td>{jExp}</td>
                              <td>{jLoc}</td>
                              <td>{jPstns}</td>
                              <td>{jType}</td>
                              <td>{pDt}</td>
                              <td>{eDt}</td>
                              <td>{jwLoc}</td>
                              <td className='text-end'>
                                {(userInfo?.uRole === 'Admin' || (userInfo?.uRole !== 'Admin' && !disableEditIcon?.[i])) && <a onClick={() => handleActionClick(actions.edit, item, i)} className='btn btn-sm bg-primary-light mr-2'><i className='fas fa-edit' title='Job Update'></i> </a>}
                                <a onClick={() => handleActionClick(actions.view, item, i)} className='btn btn-sm bg-info-light mr-2'><i className='fa-solid fa-eye' title='Job View'></i></a>
                                <a onClick={() => handleActionClick(actions.statusUpdate, item, i)} className='btn btn-sm bg-success-light mr-2'> <i className='fa fa-check-circle' title='Status Update'></i> </a>
                                <a onClick={() => handleActionClick(actions.lc, item, i)} className='btn btn-sm bg-primary-light mr-2'><i className="fa-solid fa-arrows-rotate" title='Lifecycle'></i> </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody> :
                        <tbody>
                          <tr>
                            <td colSpan={12}>
                              <div className='no-data'>
                                <img src={NodataImg} className='img-fluid' />
                                <p>No Data Found</p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      }
                    </table>
                  </div>
                </div>
                {jobsListCount > 0 ?
                  <div className='card-footer'>
                    <ReactPaginate
                      pageCount={Math.ceil(jobsListCount / limit)}
                      forcePage={page - 1}
                      onPageChange={handlePagination}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={5}
                      containerClassName="pagination"
                      activeClassName="active"
                      previousLabel="<"
                      nextLabel=">"
                    />
                  </div> : ''}

              </div>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas show={actionShow} onHide={() => setStateData({ actionShow: false })} placement={'end'} className='me-2'>
        <Offcanvas.Header closeButton onClick={() => setStateData({ actionShow: false })}>
          <Offcanvas.Title><span style={{ fontWeight: 'bold' }}>Job {action}{action === 'Lifecycle' && ` | Job ID ${listObj.jobID}-${listObj.jTitle}`}</span><br />
            {action === 'Lifecycle' && <small className='fw-bolder'>Total Experience: <span>{listObj.jExp}</span> | No of Openings: <span>{listObj.jPstns}</span> | Location: <span>{listObj.jLoc}</span>   | Job Post Date:{moment(listObj.jpDtStr).format('Do, MMM YYYY')} | Job Expiry Date: {moment(listObj.jeDtStr).format('Do, MMM YYYY')}</small>}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {actions?.create === action ? <JobCreate setStateData={setStateData} getJobsList={getJobsList} /> : ''}
          {(actions?.edit === action || actions?.view === action) ? <JobEdit state={props.state} setStateData={setStateData} getJobsList={getJobsList} handleActionClick={handleActionClick} /> : ''}
          {actions?.lc === action ? <JobsLyfCycleListComponent state={props.state} setStateData={setStateData} /> : ''}
        </Offcanvas.Body>
      </Offcanvas>
      <Modal show={stModal} onHide={() => setStateData({ stModal: false, errMsg: '', listObj: {}, jNotes: '' })} className='modal-s'>
        <Modal.Header closeButton>
          <Modal.Title>Job Status Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {stModal && <h5 className="delete_class mb-3">Are you sure, you want to update status to  <span className='text-primary fw-bolder'>{listObj?.jStatus === 'Active' ? 'Closed' : 'Active'}?</span></h5>}
          <div className='form-group'>
            <label className='form-control-label'>Notes </label>
            <textarea type='text' onChange={(e) => setStateData({ jNotes: e.target.value, errMsg: '' })} className='form-control' placeholder='Notes' value={jNotes} />
          </div>
        </Modal.Body>
        <div className='col-sm-12 col-12 text-center'><p className='text-danger mb-0'>{errMsg}</p></div>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setStateData({ stModal: false, errMsg: '', listObj: {}, jNotes: '' })}>No</Button>
          <Button variant="primary" onClick={jobStatusUpdate} disabled={disabled}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default JobsListComponent