const ProfileCard = (props) =>{
    const {ShoppingCartArr, setShoppingCartArr, file, city, state, zipCode, country, cohort_year, firstName, lastName } = props;

    const addToArray = () =>{
        // ShoppingCartArr.push(file)
        setShoppingCartArr(ShoppingCartArr => [...ShoppingCartArr, file])
        // setShoppingCartArr(ShoppingCartArr => [...ShoppingCartArr.pop()])
        console.log("added to array")
    }

    const removeFromArray = (event) => {
        const name = event.target.getAttribute("name")
        setShoppingCartArr(ShoppingCartArr.filter(profile => profile.firstName !== name))
    }


return (
    <>
                <p>{firstName} {lastName}</p>
                <p>{city}, {state}, {zipCode}, {country}</p>
                <p>{cohort_year}</p>
                <button onClick={addToArray}>add to cart</button>
                <button name={firstName} onClick={removeFromArray}>Remove</button>
    </>
)

}

export default ProfileCard