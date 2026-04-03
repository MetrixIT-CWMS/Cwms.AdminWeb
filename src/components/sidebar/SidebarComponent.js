/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React from 'react';
import { connect } from 'react-redux';

import { SetSidebarMenuVal } from '../../actions/login/LoginActions';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenUsers: false,
      isOpenCustomers: false,
      userInfo: {}
    }
  }

  // handleOpenUsers = () => {
  //   this.setState({
  //     isOpenUsers: !this.state.isOpenUsers,
  //     isOpenCustomers: false
  //   })
  // }
  // handleOpenCustomers = () => {
  //   this.setState({
  //     isOpenCustomers: !this.state.isOpenCustomers,
  //     isOpenUsers: false
  //   })
  // }
  componentDidMount = async () => {
    const userObj = await localForage.getItem('userObj');
    const userInfo = userObj?.value;
    this.setState({ userInfo });
  }
  handleNavigate = async (value) => {
    this.props.SetSidebarMenuVal(value);
    hashHistory.push(`/${value}`)
    await localForage.setItem('tabValue', value);
  }
  render() {
    const { sideMenu } = this.props.LoginReducer;
    const { userInfo } = this.state;
    
    return (
      <div className='sidebar' id='sidebar'>
        <div className='sidebar-inner slimscroll'>
          <div id='sidebar-menu' className='sidebar-menu'>
            <ul >
              {userInfo?.uRole === 'Admin' &&
                <li className={sideMenu === 'users' ? 'active' : ''} >
                  <a onClick={() => this.handleNavigate('users')}><i className="fa-solid fa-user-group"></i><span >Users</span></a>
                </li>}
              <li className={sideMenu === 'jobs' ? 'active' : ''} >
                <a onClick={() => this.handleNavigate('jobs')}><i className="fa-solid fa-briefcase"></i><span>Jobs</span></a>
              </li>
              <li className={sideMenu === 'applicants' ? 'active' : ''} >
                <a onClick={() => this.handleNavigate('applicants')}><i className="fa-solid fa-users-between-lines"></i><span>Applicants</span></a>
              </li>
              {userInfo?.cCode === 'MIT' && <li className={sideMenu === 'ceipal-applicants' ? 'active' : ''} >
                <a onClick={() => this.handleNavigate('ceipal-applicants')}><i className="fa-solid fa-users-between-lines"></i><span>Ceipal Applicants</span></a>
              </li>}
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  LoginReducer: state.LoginReducer
});
const mapDispatchToProps = (dispatch) => ({
  SetSidebarMenuVal: (menu) => dispatch(SetSidebarMenuVal(menu)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
