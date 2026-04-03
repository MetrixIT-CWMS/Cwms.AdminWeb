/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { Component } from 'react';

import HeaderComponent from '../components/header/HeaderComponent';
import hashHistory from '../hashHistory';

class NoPageFoundComponent extends Component {
  handleBackToHome = () => hashHistory.push('/jobs');

  render() {
    return (
      <main>
        <HeaderComponent />
        <div className='error-page'>
          <div className='content container card card-table'>
            <div className='row justify-content-center'>
              <div className='col-md-12 text-center'>
                <span className='display-1 d-block err-text'>404</span>
                <div className='mb-4 err-text'>Page Not Found</div>
                <a onClick={this.handleBackToHome} className='btn btn-link'>Back to Home</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default NoPageFoundComponent;