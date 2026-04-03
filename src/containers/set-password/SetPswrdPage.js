/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import { useParams } from 'react-router-dom';

import SetPswrdSubPage from './SetPswrdSubPage';

const SetPswrdPage = () => {
  const { id } = useParams();
  return <SetPswrdSubPage id={id} />
}

export default SetPswrdPage