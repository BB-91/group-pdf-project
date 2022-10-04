import {useState} from 'react';
import "./ProfileCard.scss";

const ProfileCard = (props) =>{
    const { profile, ShoppingCartArr, setShoppingCartArr } = props;
    const formattedProfile = {...profile};

    Object.keys(profile).forEach(key => {
        const value = profile[key];
        if (typeof value === "string" && (key !== "zipCode")) {
            formattedProfile[key] = value.replaceAll("-", " ") // spaces replaced with hyphen when uploading to S3 bucket
        }
    })

    const { id, cohortYear, firstName, lastName, country, city, region, zipCode } = formattedProfile;
    const [removeButton, setRemoveButton] = useState(false);

    const addToArray = () => {
        setShoppingCartArr(ShoppingCartArr => [...ShoppingCartArr, profile])
        console.log("added to array")
        // console.log("ShoppingCartArr: ", ShoppingCartArr);
        setRemoveButton(!removeButton)
    }

    const removeFromArray = (event) => {
        const profileId = event.target.getAttribute("id")
        setShoppingCartArr(ShoppingCartArr.filter(profile => profile.id != profileId))
        setRemoveButton(!removeButton)
    }

    const addCard = (<button onClick={addToArray}>add to cart</button>)
    const removeCard = (<button id={id} onClick={removeFromArray}>Remove</button>)

    return (
        <div className='profile-card'>
            <div className='name-row'>
                <span>{firstName}</span>
                <span>{lastName}</span>
            </div>
            <div className='address-row'>
                <span>{city},</span>
                <span>{region},</span>
                <span>{zipCode},</span>
                <span>{country}</span>
            </div>
            <div className='cohort-row'>
                {cohortYear}
            </div>
            {/* <p>{id}</p> */}
            {removeButton ? removeCard : addCard}
            {/* <button onClick={addToArray}>add to cart</button>
            <button id={id} onClick={removeFromArray}>Remove</button> */}
        </div>
    )

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
    //         <p>{cohortYear}</p>
    //         {/* <p>{id}</p> */}
    //         {removeButton ? removeCard : addCard}
    //         {/* <button onClick={addToArray}>add to cart</button>
    //         <button id={id} onClick={removeFromArray}>Remove</button> */}
    //     </div>
    // )

    // return (
    //     <div className='profile-card'>
    //         <p>{firstName} {lastName}</p>
    //         <p>{city}, {region}, {zipCode}, {country}</p>
    //         <p>{cohortYear}</p>
    //         <p>{id}</p>
    //         {removeButton ? removeCard : addCard}
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
    //         {removeButton ? removeCard : addCard}
    //         {/* <button onClick={addToArray}>add to cart</button>
    //         <button id={id} onClick={removeFromArray}>Remove</button> */}
    //     </>
    // )

}

export default ProfileCard;