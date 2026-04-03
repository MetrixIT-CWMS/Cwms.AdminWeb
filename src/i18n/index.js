/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skillworks IT <contact@skillworksit.com>, Aug 2025
 */

import React from 'react';
import { t } from 'ttag';

import { saveLocale } from './i18nInit';
import './styles.css';

const setLocale = (locale) => (ev) => {
  ev.preventDefault();
  saveLocale(locale);
  window.location.reload();
};

const LangSwitcher = () => (
  <div className='lang-switch'>
    <a href='/' onClick={setLocale('en')}>en</a>
    <a href='/' onClick={setLocale('te')}>te</a>
    <a href='/' onClick={setLocale('hn')}>hn</a>
  </div>
);

const Language = () => (
  <div className='app'>
    <header className='app-header'>
      <LangSwitcher />
      <p>{t`lanCommonLabelWelcomeToApp`}</p>
    </header>
  </div>
);

export default Language;
