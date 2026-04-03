/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactPaginate from 'react-paginate';

import HeaderComponent from '../header/HeaderComponent';
import SidebarComponent from '../sidebar/SidebarComponent';
import NodataImg from '../../assets/img/no-data.gif';
import AdminUserCreate from '../../containers/admin-users/AdminUserCreate';
import AdminUserEdit from '../../containers/admin-users/AdminUserEdit';
import AdminUserViewComponent from '../../components/admin-users/AdmnUserViewComponent';

const AdminUsersListComponent = (props) => {
  const { action, actions, actionShow, stModal, admnUsrsList, admnUsrsListCount, page, searchStr, limit, showView, admnView, showEdit, showStatus, errMsg, disable, showCreate, uStatus, passwordModel, sucMsg, showPassword, changePaswword, password, changePassword, showChangePassword, } = props.state;
  const { setStateData, handleActionClick, handlePagination, handleChangeSearch, handleKeyInput, handleChangeLimit, handleAdmnView, handleAdmnEdit, handleStatusUpdate, handleAdminStsUpdt, handleStatsChange, handleAdminCreate, handleAdminPassword, handleChangePassword, handlePasswordShowHide, changeConfirmPassWord, confirmPassword, handleConfirmPasswordShowHide, changePassWordValue, handleCreateClose, handleEditClose } = props;
  return (
    <div className='main-wrapper'>
      <HeaderComponent />
      <SidebarComponent />
      <div className='page-wrapper'>
        <div className='content container-fluid'>
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <div className='d-flex justify-content-between'>
                  <h4>Users</h4>
                  <a className='btn btn-primary btn-sm' onClick={() => handleAdminCreate('create')}><i className='fas fa-plus'></i> Add User</a>
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
                      <div className="dataTables_length" id="example_length">
                        <label>
                          Show
                          <select name='datatables-reponsive_length' aria-controls='datatables-reponsive' className='form-select w-100' value={limit} onChange={handleChangeLimit}>
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                          entries
                        </label>
                      </div>
                      <div id="example_filter" className="dataTables_filter">
                        <label>Search:
                          <input type="search" className="" placeholder="" value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} /></label>
                        <div className='search-icon'><a ><i className='fa-solid fa-magnifying-glass' /></a></div>
                      </div>
                    </div>
                    <table className='datatable table table-bordered'>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>User ID</th>
                          <th>Email ID</th>
                          <th>Mobile Number</th>
                          <th>Status</th>
                          <th className='text-left'>Actions</th>
                        </tr>
                      </thead>
                      {admnUsrsList && admnUsrsList.length > 0 ?
                        <tbody>
                          {admnUsrsList.map((item, i) => {
                            return (
                              <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.refUID}</td>
                                <td><a>{item.emID}</a></td>
                                <td>{item.mobCcNum}</td>
                                <td>{item.uStatus}</td>
                                <td className='text-left'>
                                  <a onClick={() => handleAdmnView(item)} ><i className="fa-solid fa-eye mr-2" title='User View'></i></a>
                                  <a onClick={() => handleAdmnEdit(item, 'update')} ><i className='fas fa-edit mr-2' title='User Update'></i> </a>
                                  <a onClick={() => handleAdminPassword(item)} ><i className="fa-solid fa-key mr-2" title='Password Update'></i> </a>
                                  <a className='btn btn-sm bg-success-light mr-2' onClick={() => handleAdminStsUpdt(item)}> <i className='fa fa-check-circle' title='Status Update'></i> </a>
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
                {admnUsrsListCount > 0 ?
                  <div className='card-footer'>
                    <ReactPaginate
                      pageCount={Math.ceil(admnUsrsListCount / limit)}
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
      {/* Admin User View */}
      <Offcanvas show={showView} onHide={() => setStateData({ showView: false })} placement={'end'} className='me-2'>
        <Offcanvas.Header closeButton onClick={() => setStateData({ showView: false })}>
          <Offcanvas.Title><span style={{ fontWeight: 'bold' }}>Admin User View</span></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {showView ? <AdminUserViewComponent admnView={admnView} showView={showView} /> : ''}
          <div className='d-flex justify-content-center'>
            <Button variant='danger' onClick={() => setStateData({ showView: false })}> Close</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Admin User Create */}
      <Offcanvas show={showCreate} onHide={() => setStateData({ showCreate: false })} placement={'end'} className='me-2'>
        <Offcanvas.Header closeButton onClick={() => setStateData({ showCreate: false })}>
          <Offcanvas.Title><span style={{ fontWeight: 'bold' }}>Admin User Create</span></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {showCreate ? <AdminUserCreate handleAdminCreate={handleAdminCreate} handleCreateClose={handleCreateClose} /> : ''}
        </Offcanvas.Body>

      </Offcanvas>

      {/* Admin User Edit */}
      <Offcanvas show={showEdit} onHide={() => setStateData({ showEdit: false })} placement={'end'} className='me-2'>
        <Offcanvas.Header closeButton onClick={() => setStateData({ showEdit: false })}>
          <Offcanvas.Title><span style={{ fontWeight: 'bold' }}>Admin User Edit</span></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {showEdit ? <AdminUserEdit admnView={admnView} handleAdmnEdit={handleAdmnEdit} handleEditClose={handleEditClose} /> : ''}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Admin User Status Update */}
      <Modal show={showStatus} onHide={() => setStateData({ showStatus: false, admnView: {}, errMsg: '' })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Status Update</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>User Info: </strong>{admnView?.name} | {admnView?.emID} | {admnView?.mobNum}</div>
          </div>
          <h6>
            Are you sure want to
            <select className="form-select form-control" value={uStatus} onChange={handleStatsChange}>
              <option value='Active'>Active</option>
              <option value='Inactive'>Inactive</option>
              <option value='Hold'>Hold</option>
              <option value='Blocked'>Blocked</option>
            </select>
          </h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' disabled={disable} onClick={() => setStateData({ showStatus: false, admnView: {}, errMsg: '' })}> No </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusUpdate}> Yes </Button>
        </Modal.Footer>
      </Modal>

      {/* Admin User Change Password */}
      <Modal show={passwordModel} onHide={() => setStateData({ passwordModel: false, admnView: {}, errMsg: '' })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Change Password</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>User Info: </strong>{admnView?.name} | {admnView?.emID} | {admnView?.mobNum}</div>
          </div>
          <div className='form-group position-relative'>
            <label className='form-control-label'>Change Password </label>
            <input type={showChangePassword ? 'text' : 'password'} onChange={changePassWordValue} className='form-control' id='password' value={changePassword} maxLength={20} />
            <i className={showChangePassword ? 'far fa-eye' : 'far fa-eye-slash'} onClick={handleConfirmPasswordShowHide} style={{ position: 'absolute', bottom: 9, right: 10, zIndex: 99 }} />
          </div>
        </Modal.Body>
        <div className='col-md-8'>
          <div className='form-control-feedback'>
            <p className='mb-1 text-danger'>Password Rules: </p>
            <ul>
              <li><small>Contains at least eight characters.</small></li>
              <li><small>Including at least one number.</small></li>
              <li><small>Includes both lower and uppercase letters.</small></li>
              <li><small>Include at least one special characters.</small></li>
            </ul>
          </div>
        </div>
        <div className='text-center text-success'>{sucMsg}</div>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' disabled={disable} onClick={() => setStateData({ passwordModel: false, admnView: {}, errMsg: '' })}> Close </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleChangePassword}> Update </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


export default AdminUsersListComponent;