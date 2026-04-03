/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

import HeaderComponent from '../header/HeaderComponent';
import SidebarComponent from '../sidebar/SidebarComponent';
import MyProfileSideComponent from './MyprofileSideComponent';
import ChangePswrdComponent from './ChangePswrdComponent';
import ProfileUpdateComponent from './ProfileUpdateComponent';

const ProfileListComponent = (props) => {
  const { prflView, pswdModal, errors, errMsg, succMsg, isDisable, editModal } = props?.state;
  const { name, sName, refUID, mobCcNum, emID, dobStr, gender } = prflView;
  const { setStateData, handleActionShow, handleSubmit, handleLogout, handleClose, handleEditClose, handlePrflChange, handlePrflUpdate, profileEdit } = props;
  const date = dobStr ? moment(dobStr).format('Do MMM, YYYY') :'';

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
                  <h4>Profile</h4></div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-8 col-8'>
              <div className='card'>
                <div className='card-header'>
                  <div className='d-flex justify-content-between'>
                    <h4 className='box-title mb-0'>Personal Details</h4>
                    <div>
                      <button type='button' className='btn btn-primary btn-sm' onClick={profileEdit}><i className='fas fa-edit'></i> Edit</button>
                    </div>
                  </div>
                </div>
                <div className='card-body'>
                  <div className='profile-personal-info'>
                    <div className='row mb-2'>
                      <div className='col-sm-3 col-4'>
                        <h5 className='f-w-500'>Name <span className='pull-end'>:</span></h5>
                      </div>
                      <div className='col-sm-9 col-8'><span>{name}</span></div>
                    </div>
                    <div className='row mb-2'>
                      <div className='col-sm-3 col-4'>
                        <h5 className='f-w-500'>Display Name <span className='pull-end'>:</span>
                        </h5>
                      </div>
                      <div className='col-sm-9 col-8'><span>{sName}</span></div>
                    </div>
                    <div className='row mb-2'>
                      <div className='col-sm-3 col-4'>
                        <h5 className='f-w-500'>User ID <span className='pull-end'>:</span>
                        </h5>
                      </div>
                      <div className='col-sm-9 col-8'><span>{refUID}</span></div>
                    </div>
                    <div className='row mb-2'>
                      <div className='col-sm-3 col-4'>
                        <h5 className='f-w-500'>Mobile Number <span className='pull-end'>:</span></h5>
                      </div>
                      <div className='col-sm-9 col-8'><span>{mobCcNum}</span></div>
                    </div>
                    <div className='row mb-2'>
                      <div className='col-sm-3 col-4'>
                        <h5 className='f-w-500'>Email ID <span className='pull-end'>:</span>
                        </h5>
                      </div>
                      <div className='col-sm-9 col-8'><span>{emID}</span></div>
                    </div>
                    <div className='row mb-2'>
                      <div className='col-sm-3 col-4'>
                        <h5 className='f-w-500'>Date of Birth <span className='pull-end'>:</span>
                        </h5>
                      </div>
                      <div className='col-sm-9 col-8'><span>{date}</span></div>
                    </div>
                    <div className='row mb-2'>
                      <div className='col-sm-3 col-4'>
                        <h5 className='f-w-500'>Gender <span className='pull-end'>:</span></h5>
                      </div>
                      <div className='col-sm-9 col-8'><span>{gender}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-4'>
              <MyProfileSideComponent prflView={prflView} setStateData={setStateData} handleLogout={handleLogout}/>
            </div>
            <Modal show={pswdModal} onHide={handleClose} size='lg' >
              <Modal.Header closeButton>
                <Modal.Title>Password Update</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ChangePswrdComponent state={props.state} setStateData={setStateData} handleActionShow={handleActionShow} errors={errors} />
              </Modal.Body>
              {errMsg && <p className='text-danger text-center'>{errMsg}</p>}
              {succMsg && <p className='text-success text-center'>{succMsg}</p>}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" disabled={isDisable} onClick={handleSubmit}>Submit</Button>
              </Modal.Footer>
              {/* =======================Edit =======================*/}
            </Modal>
            <Modal show={editModal} onHide={handleEditClose} size='lg' >
              <Modal.Header closeButton>
                <Modal.Title>Profile Update</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ProfileUpdateComponent state={props.state} handlePrflChange={handlePrflChange} />
              </Modal.Body>
              {errMsg && <p className='text-danger text-center'>{errMsg}</p>}
              {succMsg && <p className='text-success text-center'>{succMsg}</p>}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleEditClose}>Close</Button>
                <Button variant="primary" disabled={isDisable} onClick={handlePrflUpdate}>Submit</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileListComponent;