import React from 'react';
import { useEffect } from 'react';
import LoginButton from '../../components/LoginButton/LoginButton';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import NologyLogo from '../../components/NologyLogo/NologyLogo';
import "./Header.scss";

const Header = (props) => {
    const { setRenderOptions } = props;

    const renderUploadForm = () => {
        setRenderOptions("uploadFormOption")
    }

    const renderSearchResults = () => {
        setRenderOptions("searchResultsOption")
    }

    const renderShoppingCart = () => {
        setRenderOptions("shoppingCartOption")
    }


    useEffect(() => {
        renderSearchResults();
    }, [])

    return (
        <div className='Header' style={{ backgroundImage: `url(images/nology-banner.jpg)` }}>
            <div className='nav-bar'>
                <NologyLogo />

                {/* <div style={{display: 'flex'}}> */}
                <div className='nav__buttons'>
                    <button className="nav__button" onClick={renderUploadForm}>Upload PDFs</button>
                    <button className="nav__button" onClick={renderSearchResults}>Search Profiles</button>
                    <button className="nav__button" onClick={renderShoppingCart}>Shopping Cart</button>
                    <LoginButton />
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}

export default Header;