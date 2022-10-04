import React from 'react';
import LoginButton from '../../components/LoginButton/LoginButton';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import "./Header.scss";

// <div className='img-div' style={{ backgroundImage: `url(${imagePath})`}} key={index}></div>

const Header = () => {
  return (
    <div className='Header' style={{ backgroundImage: `url(images/nology-banner.jpg)`}}>
        <div className='nav-bar'>
            <div className='nology-logo'></div>
            <LoginButton />
            <LogoutButton />
        </div>
    </div>
  )
}

export default Header;