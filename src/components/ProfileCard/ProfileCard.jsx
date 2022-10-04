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
    
return (
    <>
        <p>{firstName} {lastName}</p>
        <p>{city}, {state}, {zipCode}, {country}</p>
        <p>{cohort_year}</p>
        <p>{id}</p>
        <button onClick={addToArray}>Add To Cart</button>
    </>
)

}

export default ProfileCard