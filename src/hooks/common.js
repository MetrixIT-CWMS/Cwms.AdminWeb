/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

export const numebersOnly = (event) => {
  if ((event.charCode >= 32 && event.charCode < 48) || (event.charCode > 57 && event.charCode < 127)) {
    event.preventDefault();
  }
}

export const mobileChars = (event) => { // allowed: 0 to 9 and ()-+
  if ((event.charCode >= 32 && event.charCode < 48 && event.charCode !== 40 &&
    event.charCode !== 41 && event.charCode !== 43 && event.charCode !== 45) ||
    (event.charCode > 57 && event.charCode < 127)) {
    event.preventDefault();
  }
}

export const initCaps = (val) => {
  const value = val.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  return value;
}

export const firstCharCaps = (val) => { //only first letter caps
  const value = val.charAt(0).toUpperCase() + val.slice(1);
  return value;
}

export const allCapsAlphaNum = (val) => { // caps letters with numbers
  const value = val.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return value;
}

export const allCapsAlpha = (val) => { // caps letters only
  const value = val.replace(/[^A-Za-z]/g, '').toUpperCase();
  return value;
}

export const allSmallAlpha = (val) => { // small letters with numbers
  const value = val.toLowerCase();
  return value;
}

export const capHifenLetter = (val) => { // caps letters with numbers and -
  const value = val.replace(/[^A-Za-z0-9-]/g, '').toUpperCase();
  return value;
}
