const ProfileCard = (props) =>{
    const {ShoppingCartArr, setShoppingCartArr, id, file, city, state, zipCode, country, cohort_year, firstName, lastName } = props;

    const addToArray = () => {
        setShoppingCartArr(ShoppingCartArr => [...ShoppingCartArr, file])
        console.log("added to array")
    }

    const removeFromArray = (event) => {
        const profileId = event.target.getAttribute("id")
        setShoppingCartArr(ShoppingCartArr.filter(profile => profile.id != profileId))
    }

return (
    <>
                <p>{firstName} {lastName}</p>
                <p>{city}, {state}, {zipCode}, {country}</p>
                <p>{cohort_year}</p>
                <p>{id}</p>
                <button onClick={addToArray}>add to cart</button>
                <button id={id} onClick={removeFromArray}>Remove</button>
    </>
)

}

export default ProfileCard