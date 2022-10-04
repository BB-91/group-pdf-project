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
        console.log("added to array")
    }


    console.log("cohortYear: ", cohortYear)

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

    // return (
    //     <div className='profile-card'>
    //         <p className='profile-card__name-row'>{firstName} {lastName}</p>
    //         <p className='profile-card__address-row'>{city}, {region}, {zipCode}, {country}</p>
    //         <p className='profile-card__cohort-row'>{cohortYear}</p>
    //         <button className='add-to-cart-button' onClick={addToArray}>Add To Cart</button>
    //     </div>
    // )

    // return (
    //     <div className='profile-card'>
    //         <div className='name-row'>
    //             <span>{firstName}</span>
    //             <span>{lastName}</span>
    //         </div>
    //         <div className='address-row'>
    //             <span>{city},</span>
    //             <span>{region},</span>
    //             <span>{zipCode},</span>
    //             <span>{country}</span>
    //         </div>
    //         <div className='cohort-row'>
    //             {cohortYear}
    //         </div>
    //         {/* <p>{id}</p> */}

    //         <button onClick={addToArray}>Add To Cart</button>

    //         {/* {removeButton ? removeCard : addCard} */}
    //         {/* <button onClick={addToArray}>add to cart</button>
    //         <button id={id} onClick={removeFromArray}>Remove</button> */}
    //     </div>
    // )

    // return (
    //     <>
    //         <p>{firstName} {lastName}</p>
    //         <p>{city}, {region}, {zipCode}, {country}</p>
    //         <p>{cohortYear}</p>
    //         <p>{id}</p>
    //         <button onClick={addToArray}>Add To Cart</button>
    //     </>
    // )

}

export default ProfileCard