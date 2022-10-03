// import "./ShoppingCart.scss"
import { useState } from "react"
import ProfileCard from "../ProfileCard/ProfileCard"

const ShoppingCart = (props) =>{
    const {ShoppingCartArr} = props
    const [showCart, setShowCart] = useState()
    
    const removeFromCart = () =>{
       console.log(ShoppingCartArr[0])
        }
    

        const ShoppingCartDisplay = ShoppingCartArr.map(profile => {
            return (
                <div>
                    <ProfileCard profile={profile}/>
                </div>
            )
        });


    // const ShoppingCartDisplay = ShoppingCartArr.map(profile => {
    //     return (
    //         // const {  }

    //         <div>
    //             <ProfileCard 
    //                 //  index = {ShoppingCartDisplay.indexOf()}
    //                 firstName = {profile.firstName} 
    //                 lastName = {profile.lastName} 
    //                 city = {profile.city} 
    //                 // state = {profile.state}
    //                 region = {profile.state}
    //                 zipcode = {profile.zipcode}
    //                 country = {profile.country}
    //                 cohortYear = {profile.cohortYear}
    //             />
    //         </div>
    //     )
    // });

////container for each profile line
//render with button to take out of cart
// togle 


    return (
        <div>
            <h1>CART</h1>      
            {ShoppingCartDisplay}
        </div>
    )
}

export default ShoppingCart;