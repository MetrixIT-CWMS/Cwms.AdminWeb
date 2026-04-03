/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import moment from 'moment';

const JobsLyfCycleListComponent = (props) => {
  const { lcList } = props.state;
  return (
    <div>
      <div className='table-responsive'>
        {lcList && lcList.length > 0 ?
          lcList.map((item, i) => {
            const offset = new Date().getTimezoneOffset();
            const date = item.cDtStr ? moment(item.cDtStr, 'YYYY-MM-DD HH:mm:ss').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm') : '';
            return (
              <div className='col-md-12' key={i}>
                <div className='card mb-2'>
                  <div className='d-flex justify-content-between m-2'>
                    <div className='card-body'>
                      <p className='card-text'>
                        <strong>Notes:</strong> {item.jNotes}
                      </p>
                      <p className='mb-0'>
                        <strong>Created By:</strong> {item.cuName} | <strong>Created On:</strong> {date} | <strong>Action:</strong> <span className='fw-bolder'>{item.cjAction}</span> | <strong>Status:</strong> <span className={`${item.jStatus === 'Active' ? 'text-success' : 'text-danger'}`}>{item.jStatus}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }) : <div className='text-center py-3'><strong>No data</strong></div>
        }
      </div>
    </div>
  )
}

export default JobsLyfCycleListComponent