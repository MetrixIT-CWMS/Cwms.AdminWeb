/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { Component } from 'react';

import wifi from '../assets/img/wifi-slash.png';
import HeaderComponent from '../components/header/HeaderComponent';

class NoInternetComponent extends Component {
  render() {
    return (
      <main>
        <HeaderComponent />
        <div className='error-page'>
          <div className='content container card card-table'>
            <div className='row justify-content-center'>
              <div className='col-md-12 text-center'>
                <div><img src={wifi} height={150} width={150}/></div>
                <h2 className='mb-4 err-text'>No Internet Connection</h2>
                <p>Please check your internet connection and try again.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default NoInternetComponent;
