import {useState} from 'react';

const ProfileCard = (props) =>{
    // const { id, cohortYear, firstName, lastName, country, city, region, zipCode, ShoppingCartArr, setShoppingCartArr } = profile;
    // const {ShoppingCartArr, setShoppingCartArr, id, profile, city, region, zipCode, country, cohortYear, firstName, lastName } = props;
    const { profile, ShoppingCartArr, setShoppingCartArr } = props;
    const { id, cohortYear, firstName, lastName, country, city, region, zipCode } = profile;

    const [removeButton, setRemoveButton] = useState(false);

    const addToArray = () => {
        setShoppingCartArr(ShoppingCartArr => [...ShoppingCartArr, profile])
        console.log("added to array")
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
    <>
        <p>{firstName} {lastName}</p>
        <p>{city}, {region}, {zipCode}, {country}</p>
        <p>{cohortYear}</p>
        <p>{id}</p>
        {removeButton ? removeCard : addCard}
        {/* <button onClick={addToArray}>add to cart</button>
        <button id={id} onClick={removeFromArray}>Remove</button> */}
    </>
)

}

export default ProfileCard