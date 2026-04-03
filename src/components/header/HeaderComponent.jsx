/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';
import { GetAdUserLogout } from '../../actions/login/LoginActions';

import config from '../../../config/config.json';
import profileImg from '../../assets/img/profile-icon.png';

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenProfileMenu: false,
    };
  }

  handleProfileMenu = () => this.setState({ isOpenProfileMenu: !this.state.isOpenProfileMenu });
  handleLogout = async () => {
    this.props.GetAdUserLogout(resObj => { });
    await localForage.clearItems();
    hashHistory.push('/login');
  }
  render() {
    const { isOpenProfileMenu } = this.state;
    return (
      <div className='header'>
        <div className='header-content'>
        <div className='header-left'>
          <a className='logo'>
            <img src={config.logo} width='100' height='100' alt='logo' />
            {/* <span className='logoclass'>CWMS</span> */}
          </a>
          <a className='logo logo-small'>
            <img src={config.logo} alt='Logo' width='30' height='30' />
            {/* <span className='logoclass'>CWMS</span> */}
          </a>
        </div>
        <a className='mobile_btn' id='mobile_btn'>
          <i className='fas fa-bars'></i>
        </a>
        <ul className='nav user-menu'>
          <li className='nav-item dropdown header-profile' onMouseLeave={this.handleProfileMenu}>
            <a onClick={this.handleProfileMenu} className='dropdown-toggle nav-link' data-toggle='dropdown'>
              <span className='user-img'><img className='rounded-circle' src={profileImg} width='40' alt='Profile Info' /></span>
            </a>
            <div className={classnames('dropdown-menu', { 'show': isOpenProfileMenu })}>
              <a className='dropdown-item' onClick={() => hashHistory.push('/profile')}>My Profile</a>
              <a className='dropdown-item' onClick={this.handleLogout}>Logout</a>
            </div>
          </li>
        </ul>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  GetAdUserLogout: (callback) => dispatch(GetAdUserLogout(callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
