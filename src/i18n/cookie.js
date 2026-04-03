/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

export const get = (key) => {
  const cookie = document.cookie.split(';')
    .map((c) => c.split('='))
    .find(([cookieName]) => cookieName.trim() === key);
  return cookie && cookie[1];
};

export const set = (key, value) => {
  document.cookie = `${key}=${value}`;
};
