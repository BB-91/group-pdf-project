import {useState} from 'react';

const ProfileCard = (props) =>{
    const {ShoppingCartArr, setShoppingCartArr, id, file, city, state, zipCode, country, cohort_year, firstName, lastName } = props;

    const [removeButton, setRemoveButton] = useState(false)

    const addToArray = () => {
        setRemoveButton(!removeButton)
        if (!ShoppingCartArr.includes(file)) {
            setShoppingCartArr(ShoppingCartArr => [...ShoppingCartArr, file])
        }
        console.log("added to array")
    }

    // const removeFromArray = (event) => {
    //     const profileId = event.target.getAttribute("id")
    //     setRemoveButton(!removeButton)
    //     setShoppingCartArr(ShoppingCartArr.filter(profile => profile.id != profileId))
    // }

    const addCard = (<button onClick={addToArray}>Add To Cart</button>)
    // const removeCard = (<button id={id} onClick={removeFromArray}>Remove</button>)

    


return (
    <>
        <p>{firstName} {lastName}</p>
        <p>{city}, {state}, {zipCode}, {country}</p>
        <p>{cohort_year}</p>
        <p>{id}</p>
        {addCard}
        {/* <button onClick={addToArray}>add to cart</button>
        <button id={id} onClick={removeFromArray}>Remove</button> */}
    </>
)

}

export default ProfileCard