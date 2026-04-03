/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */


import ReactPaginate from 'react-paginate';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import HeaderComponent from '../header/HeaderComponent';
import SidebarComponent from '../sidebar/SidebarComponent';
import NodataImg from '../../assets/img/no-data.gif';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import moment from 'moment';

const CeipalApplicantsListComponent = (props) => {

  const { applicantsList, applicantsListCount, page, searchStr, limit, skillModal, listObj, selectedDate, isExporting, viewModal, userInfo, skillsSearch, filterDate, startDate, endDate, showCustomDates, minFromDate, maxFromDate, maxToDate, clientsList, selectedClient } = props.state;
  const { setStateData, handleChangeSearch, handleKeyInput, handleChangeLimit, handlePagination, handleExport, downloadFile, handleSkillsSearch, handleSearch, filterChange, handleFromDateChange, clientChange } = props;
  const today = new Date();
  const maxDate = today.toISOString().split("T")[0];

  const pastDate = new Date();
  pastDate.setDate(today.getDate() - 75);
  const minDate = pastDate.toISOString().split("T")[0];
  const left1 = applicantsListCount == 0 ? '0' : (page - 1) * limit + 1;
  const right = page * limit;
  const data = right <= applicantsListCount ? right : applicantsListCount;
  
  return (
    <div className='main-wrapper'>
      <HeaderComponent />
      <SidebarComponent />
      <div className='page-wrapper' style={{ pointerEvents: isExporting ? 'none' : '' }}>
        <div className='content container-fluid'>
          <div className='page-header'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='d-flex justify-content-between'>
                  <h4>Ceipal Applicants</h4>
                  {/* <a className='btn btn-primary btn-sm' onClick={() => handleActionClick(actions.create)}><i className='fas fa-plus'></i> Add Applicant</a> */}
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='card'>
                <div className='card-body'>
                  <div className='table-responsive'>
                    <div className="mb-2 d-flex justify-content-between align-items-center gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <span>Show</span>
                        <select className="form-select" style={{ width: "100px" }} value={limit} onChange={handleChangeLimit}>
                          <option value={1}>1</option>
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                        <span>entries</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ minWidth: "220px" }}>
                          <CreatableSelect isMulti placeholder="Search Skills" onChange={handleSkillsSearch}/>
                        </div>
                        <div style={{ minWidth: "220px" }}>
                          <Select placeholder="Search Clients" options={clientsList} onChange={clientChange} isClearable />
                        </div>
                        <input type="search" className="form-control" style={{ width: "200px" }} placeholder="Search" value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} />

                        <button className="btn btn-success" onClick={handleSearch}>Search</button>

                        {/* {applicantsList.length > 0 && (
                          <Dropdown>
                            <Dropdown.Toggle variant="primary">
                              <i className="fa-solid fa-file-export me-2"></i>
                              Export
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="p-3">
                              <input
                                type="date"
                                className="form-control mb-2"
                                value={selectedDate || ""}
                                min={minDate}
                                max={maxDate}
                                onChange={(e) =>
                                  setStateData({ selectedDate: e.target.value })
                                }
                              />

                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() => handleExport()}
                                disabled={isExporting}
                              >
                                {isExporting ? "Exporting..." : "Export"}
                              </button>
                            </Dropdown.Menu>
                          </Dropdown>
                        )} */}

                      </div>
                      <div className='d-flex align-items-center gap-2'>
                        <select className="form-select" style={{ width: "160px" }} value={filterDate} onChange={filterChange}>
                          <option value="">Select Date</option>
                          <option value="Upto 7 days">Upto 7 days</option>
                          <option value="Today">Today</option>
                          <option value="Yesterday">Yesterday</option>
                          <option value="Custom Dates">Custom Dates</option>
                        </select>
                        {showCustomDates && (
                          <div className="d-flex gap-2">
                            <input type="date" className="form-control" min={minFromDate} max={maxFromDate} value={startDate} onChange={(e) => handleFromDateChange(e, 'from')} />
                            <input type="date" className="form-control" min={startDate} max={maxToDate} value={endDate} onChange={(e) => handleFromDateChange(e, 'to')} />
                          </div>
                        )}
                        {/* EXPORT */}
                        <button className='btn btn-success' disabled={isExporting ? true : false} onClick={() => handleExport()}>{isExporting ? "Exporting..." : "Export"}</button>
                      </div>
                    </div>
                    <table className='datatable table table-bordered'>
                      <thead>
                        <tr>
                          <th>Applicant</th>
                          <th>Job Title</th>
                          <th>Work Auth</th>
                          <th>Location</th>
                          <th>Skills</th>
                          <th>Created On</th>
                          <th className='text-left'>Actions</th>
                        </tr>
                      </thead>
                      {applicantsList && applicantsList.length > 0 ?
                        <tbody>
                          {applicantsList.map((item, i) => {
                            const cDt = item.cOn ? moment(item.cOn).format('DD MMM, YYYY HH:mm') : '';
                            return (
                              <tr key={i}>
                                <td>
                                  <p className='mb-0'><strong>{item.fName + ' ' + item.lName}</strong></p>
                                  <p className='mb-0'>{item.email} </p>
                                  <p className='mb-0'>{item?.mobNum ? item.mobNum : ''} </p>
                                </td>
                                <td>{item.jobTitle}</td>
                                <td>{item.workAuth}</td>
                                <td>{item.city}, {item.zip}</td>
                                {item.skills ? <td><a onClick={() => setStateData({ skillModal: true, listObj: item })} className='text-primary fw-bolder'><button className='btn btn-link'>View Skills</button></a></td> : <td>No Skills</td>}

                                <td>{cDt}</td>
                                <td>
                                  <a className='btn btn-sm bg-primary-light me-1' style={{ cursor: 'pointer' }} title='Download Applicant Ceipal Resume'>
                                    <i className="fa-solid fa-download text-primary" onClick={() => downloadFile(item.rPath)}></i>
                                  </a>
                                  <a onClick={() => setStateData({ viewModal: true, listObj: item })} className='btn btn-sm bg-info-light mr-2'><i className='fa-solid fa-eye' title='Ceipal Applicant View'></i></a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody> :
                        <tbody>
                          <tr>
                            {userInfo.uRole === 'Admin' ?
                              <td colSpan={12}>
                                <div className='no-data'>
                                  <img src={NodataImg} className='img-fluid' />
                                  <p>No Data Found</p>
                                </div>
                              </td> :
                              <td colSpan={12}>
                                <div className='no-data'>
                                  <p>Search Applicants by Job Title, Skills, Location, Work Authorization</p>
                                </div>
                              </td>}
                          </tr>
                        </tbody>
                      }
                    </table>
                  </div>
                </div>
                {applicantsListCount > 0 ?
                  <div className='m-2'>
                    <div className='row'>
                      <div className='col-md-6 col-lg-6'>
                        <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing {left1 + '-' + data} of {applicantsListCount} entries</div>
                      </div>
                      <div className='col-md-6 col-lg-6'>
                        <div className='paginate_button page-item active float-end'>
                          <ReactPaginate
                            pageCount={Math.ceil(applicantsListCount / limit)}
                            forcePage={page - 1}
                            onPageChange={handlePagination}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={5}
                            containerClassName='pagination'
                            activeClassName='active'
                            previousLabel='<'
                            nextLabel='>'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={skillModal} onHide={() => setStateData({ skillModal: false, listObj: {} })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'><strong>Skills</strong></p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div>
              <strong>User Info: </strong>
              {listObj?.nName} | {listObj?.email} | {listObj?.mobNum}
            </div>
          </div>
          {/* Skills Section */}
          <div className="mt-3">
            {listObj?.skills?.split(",").map((skill, index) => (
              <span key={index} className="badge bg-primary me-2 mb-2">{skill.trim()}</span>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({ skillModal: false, listObj: {} })}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Offcanvas show={viewModal} onHide={() => setStateData({ viewModal: false, listObj: {} })} placement={'end'} className='me-2'>
        <Offcanvas.Header closeButton><p className='mb-0'><strong>Ceipal Applicants View</strong></p></Offcanvas.Header>
        <Offcanvas.Body>
          <div className='page-header'>
            <div className='row'>
              <div className='col-lg-12'>
                <form >
                  <div className='row formtype'>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label>Job: </label>
                        {listObj.jobTitle}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label>Applicant Name: </label>
                        {listObj.fName}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label>Applicant Email: </label>
                        {listObj.email}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <label>Mobile Number: </label>
                      {listObj.mobNum}
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label>Work Authorization:</label>
                        {listObj.workAuth}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label>Location:</label>
                        {listObj.city}, {listObj.zip}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label>Company Name:</label>
                        {listObj.cName}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label>Experience:</label>
                        {listObj.experience}
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label>Relocation:</label>
                        {listObj.relocation}
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label>Skills:</label>
                        {listObj?.skills?.split(",").map((skill, index) => (
                          <span key={index} className="badge bg-primary me-2 mb-2">{skill.trim()}</span>))}
                      </div>
                    </div>
                    {/* <div className='col-md-4'>
                      <div className='form-group'>
                        <label>Ceipal Resume:</label>
                        {listObj.rPath}
                      </div>
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default CeipalApplicantsListComponent