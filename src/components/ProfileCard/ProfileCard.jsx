import { useState } from 'react';
import "./ProfileCard.scss";

const ProfileCard = (props) => {
    const { ShoppingCartArr, setShoppingCartArr, id, file, city, region, zipCode, country, cohortYear, firstName, lastName } = props;
    const [removeButton, setRemoveButton] = useState(false)

    const addToArray = () => {
        setRemoveButton(!removeButton)
        if (!ShoppingCartArr.includes(file)) {
            setShoppingCartArr(ShoppingCartArr => [...ShoppingCartArr, file])
        }
        console.log("added to array");
    }

    return (
        <div className='profile-card'>
            <div className='profile-card__contents'>
                <p className='profile-card__name-row'>{firstName} {lastName}</p>
                <p className='profile-card__address-row-1'>{city}, {region}</p>
                <p className='profile-card__address-row-2'>{zipCode}, {country}</p>
                <p className='profile-card__cohort-row'>( {cohortYear} )</p>
            </div>
            <button className='add-to-cart-button' onClick={addToArray}>Add To Cart</button>
        </div>
    )
}

export default ProfileCard