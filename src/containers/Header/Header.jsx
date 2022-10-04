import React from 'react';
import LoginButton from '../../components/LoginButton/LoginButton';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import NologyLogo from '../../components/NologyLogo/NologyLogo';
import "./Header.scss";

// <div className='img-div' style={{ backgroundImage: `url(${imagePath})`}} key={index}></div>

const Header = () => {
  return (
    <div className='Header' style={{ backgroundImage: `url(images/nology-banner.jpg)`}}>
        <div className='nav-bar'>
            <NologyLogo />
            <LoginButton />
            <LogoutButton />
        </div>
    </div>
  )
}

export default Header;