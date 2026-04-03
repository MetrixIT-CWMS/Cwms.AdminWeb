/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

import hashHistory from '../../hashHistory';
import profileImg from '../../assets/img/profile-icon.png';

const MyProfileSideComponent = (props) => {
  const { setStateData, handleLogout, prflView } = props;
  
  return (
    <div className='profile card'>
      <div className='profile-head'>
        <div className='photo-content'>
          <div className='cover-photo rounded'></div>
        </div>
        <div className='profile-info'>
          <div className='d-flex'>
            <div className='profile-photo'>
              <img src={profileImg} className='img-fluid rounded-circle' width={60} alt='CWMS' />
            </div>
            <div className='profile-details'>
              <div className='profile-name'>
                <h4 className='text-primary mb-0'>{prflView?.name}</h4>
                <p className='mb-0'>{prflView?.emID}</p>
              </div>
            </div>
          </div>
        </div>
        <ul className='nav d-block'>
          <li className='nav-item'>
            <a className='nav-link' onClick={() => hashHistory.push('/profile')}>My Profile <span className='pull-right'><i className='fa fa-arrow-right'></i></span></a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' onClick={() => setStateData({ pswdModal: true })}>Change Password <span className='pull-right'><i className='fa fa-arrow-right'></i></span></a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' onClick={handleLogout}>Logout <span className='pull-right'><i className='fa fa-arrow-right'></i></span></a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MyProfileSideComponent;
