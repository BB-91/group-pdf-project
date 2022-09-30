const ProfileCard = (props) =>{
    const {ShoppingCartArr, setShoppingCartArr, file, city, state, zipCode, country, cohort_year, firstName, lastName } = props;
    
    console.log(typeof(ShoppingCartArr))

    const addToArray = (file) =>{
        // ShoppingCartArr.push(file)
        setShoppingCartArr(file)
        console.log(ShoppingCartArr)
        console.log("added to array")
    }

    console.log(ShoppingCartArr)

return (
    <>
                <p>{firstName} {lastName}</p>
                <p>{city}, {state}, {zipCode}, {country}</p>
                <p>{cohort_year}</p>
                <button onClick={addToArray(file)}>add to cart</button>
                <button>Remove</button>
    </>
)

}

export default ProfileCard