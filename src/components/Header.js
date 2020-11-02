import React from 'react';
import { APP_TITLE } from '../data/data';
import './Header.scss';

const Header = () => {
  return(
    <div className="header">
      <div className="header__title">{APP_TITLE}</div>
    </div>
  )
}

export default Header;