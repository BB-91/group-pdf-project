import React from 'react'
import NologyLogo from '../../components/NologyLogo/NologyLogo';
import "./Footer.scss";

const Footer = () => {
    return (
        <div className='Footer'>
            <div className='Footer__contents'>
                <NologyLogo />
            </div>
        </div>
    )
}

// const Footer = () => {
//   return (
//     <div className='Footer'>
//         <NologyLogo />
//     </div>
//   )
// }

export default Footer;