/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import ReactPaginate from 'react-paginate';

import HeaderComponent from '../header/HeaderComponent';
import SidebarComponent from '../sidebar/SidebarComponent';
import NodataImg from '../../assets/img/no-data.gif';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ApplicantCreate } from '../../containers/applicants';
import ApplicantViewComponent from './ApplicantViewComponent';
import ApplicantUpdate from '../../containers/applicants/ApplicantUpdate';

const ApplicantsListComponent = (props) => {
  const { actions, action, actionShow, admnJobApplicntList, admnJobApplicntListCount, page, searchStr, limit, aplicantObj, pdfShow, pdfUrl, pdfMessage } = props.state;
  const { setStateData, handleActionClick, handleChangeSearch, handleKeyInput, handleChangeLimit, handleCloseUpdate,handlePagination, downloadFile, fileOpen } = props;

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
                  <h4>Applicants</h4>
                  <a className='btn btn-primary btn-sm' onClick={() => handleActionClick(actions.create)}><i className='fas fa-plus'></i> Add Applicant</a>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='card'>
                <div className='card-body'>
                  <div className='table-responsive'>
                    <div className='dataTables_wrapper'>
                      <div className='dataTables_length' id='example_length'>
                        <label>
                          Show
                          <select name='datatables-reponsive_length' aria-controls='datatables-reponsive' className='form-select w-100' onChange={ handleChangeLimit}>
                            <option value={1}>1</option>
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
                          <input type='search' className='' placeholder='' value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch}/></label>
                        <div className='search-icon'><a ><i className='fa-solid fa-magnifying-glass' /></a></div>
                      </div>
                    </div>
                    <table className='datatable table table-bordered'>
                      <thead>
                        <tr>
                          <th>Job</th>
                          <th>Applicant Name</th>
                          <th>Email ID</th>
                          <th>Phone Number</th>
                          <th>Resume</th>
                          <th className='text-left'>Actions</th>
                        </tr>
                      </thead>
                      {admnJobApplicntList && admnJobApplicntList.length > 0 ?
                        <tbody>
                          {admnJobApplicntList.map((item, i) => {
                            return (
                              <tr key={i}>
                                <td>{item.cjTitle} | {item.cJobID}</td>
                                <td>{item.aName}</td>
                                <td><a>{item.aEmail}</a></td>
                                <td>{item.aPhone}</td>
                                <td>
                                  <div className='d-flex justify-content-between'>
                                    <div><a onClick={(e) => { e.preventDefault(); fileOpen(item) }} className='text-primary fw-bolder'>{item.aResume}</a></div>
                                    <div style={{ cursor: 'pointer' }}><i className="fa-solid fa-download text-primary" onClick={() => downloadFile(item.arPath, item.aResume)}></i></div>
                                  </div>
                                </td>
                                <td className='text-left'>
                                  <a onClick={() => handleActionClick(actions.view, item)}><i className='fa-solid fa-eye mr-2' title='user view'></i></a>
                                  <a onClick={() => handleActionClick(actions.edit, item)}><i className='fas fa-edit mr-2' title='user update'></i> </a>
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
                {admnJobApplicntListCount > 0 ?
                  <div className='card-footer'>
                    <ReactPaginate
                      pageCount={Math.ceil(admnJobApplicntListCount / limit)}
                      forcePage={page - 1}
                      onPageChange={handlePagination}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={5}
                      containerClassName='pagination'
                      activeClassName='active'
                      previousLabel='<'
                      nextLabel='>'
                    />
                  </div> : ''}

                {/* Applicant Create */}
                <Offcanvas show={actionShow} onHide={() => setStateData({ actionShow: false })} placement={'end'} className='me-2'>
                  <Offcanvas.Header closeButton onClick={() => setStateData({ actionShow: false })}>
                    <Offcanvas.Title><span style={{ fontWeight: 'bold' }}>Applicant  {action}</span></Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    {actions?.create === action ? (<ApplicantCreate handleCloseUpdate={handleCloseUpdate} actionShow={actionShow} setStateData={setStateData} />) : ''}
                    {actions?.view === action ? <ApplicantViewComponent aplicantObj={aplicantObj} /> : ''}
                    {actions?.edit === action ? <ApplicantUpdate aplicantObj={aplicantObj} handleCloseUpdate={handleCloseUpdate} /> : ''}
                  </Offcanvas.Body>
                </Offcanvas>
                <Offcanvas show={pdfShow} onHide={() => setStateData({ pdfShow: false, pdfUrl: '', pdfMessage: '' })} placement='end' style={{ width: '70%' }}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Document</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    {pdfUrl ? (
                      <object data={pdfUrl} type="application/pdf" width="100%" height="900px">
                        <p>Your browser does not support PDFs. <a href={pdfUrl}>Download the PDF</a> instead.</p>
                      </object>
                    ) : (
                      <p style={{ textAlign: 'center', color: 'red', fontSize: '20px', paddingTop: '365px' }}>{pdfMessage}</p>
                    )}
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicantsListComponent;
