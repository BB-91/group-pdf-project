// import "./ShoppingCart.scss"
import { useState } from "react"

const ShoppingCart = (props) =>{
    const {ShoppingCartArr} = props
    const [showCart, setShowCart] = useState()
    
    const removeFromCart = () =>{
       console.log(ShoppingCartArr[0])
        }
    


    const shoppingCartDisplay = () =>{
        ShoppingCartArr.array.forEach(file => {
        return (
            <>
                <p index = {ShoppingCartArr[file]}>{file.firstName} {file.lastName}</p>
                <p>{file.city}, {file.state}, {file.zipCode}, {file.country}</p>
                <p>{file.cohort_year}</p>
                <button onClick={removeFromCart}>Remove</button>
            </>
        )
    });
}
////container for each profile line
//render with button to take out of cart
// togle 


    return (
        <button onClick={shoppingCartDisplay}>Cart</button>
        <
    )
}

export default ShoppingCart;