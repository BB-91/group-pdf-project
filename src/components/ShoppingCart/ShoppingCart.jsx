// import "./ShoppingCart.scss"
import { useState } from "react"
import ProfileCard from "../ProfileCard/ProfileCard"

const ShoppingCart = (props) =>{
    const {ShoppingCartArr} = props
    const [showCart, setShowCart] = useState()
    
    const removeFromCart = () =>{
       console.log(ShoppingCartArr[0])
        }
    


    const ShoppingCartDisplay = ShoppingCartArr.map(file => {
        return (
         <ProfileCard 
         index = {ShoppingCartDisplay.indexOf()}
         firstName = {file.firstName} 
         lastName = {file.lastName} 
         city = {file.city} 
         state = {file.state}
         zipcode = {file.zipcode}
         country = {file.country}
         cohort_year = {file.cohort_year}
         />
        )
    });

////container for each profile line
//render with button to take out of cart
// togle 


    return (
        <div>      {ShoppingCartDisplay}
        </div>
    )
}

export default ShoppingCart;