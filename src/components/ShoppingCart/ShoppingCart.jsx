import "./ShoppingCart.scss"
import { useState } from "react"
import ProfileCard from "../ProfileCard/ProfileCard"
import {CSVLink, CSVDownload} from 'react-csv';

const ShoppingCart = (props) =>{
    const {ShoppingCartArr, setShoppingCartArr} = props
    const [showCart, setShowCart] = useState()

    const removeFromShoppingCart = (event) => {
        const profileId = event.target.getAttribute("id")
        setShoppingCartArr(ShoppingCartArr.filter(profile => profile.id != profileId))
    }

    const ShoppingCartDisplay = ShoppingCartArr.map((file, index) => {
        return (
        <div className="cart__profile" key={index}>
            <div className='profile-card__contents'>
                <p className='profile-card__name-row'>{file.firstName} {file.lastName}</p>
                <p className='profile-card__address-row-1'>{file.city}, {file.region} </p>
                <p className='profile-card__address-row-2'>{file.zipCode}, {file.country}</p>
                <p className='profile-card__cohort-row'>{file.cohortYear}</p>
            </div>
            <button className="remove__button" id={file.id} onClick={removeFromShoppingCart}>Remove</button>
         </div>
        )
    });

    // const ShoppingCartDisplay = ShoppingCartArr.map((file) => {
    //     return (
    //     <div>
    //         <p>{file.firstName} {file.lastName}</p>
    //         <p>{file.city}, {file.region}, {file.zipCode}, {file.country}</p>
    //         <p>{file.cohortYear}</p>
    //         <p>{file.id}</p>
    //         <button id={file.id} onClick={removeFromShoppingCart}>Remove</button>
    //      </div>
    //     )
    // });

    const data = ShoppingCartArr;

    const headers = [
        {label: 'First Name', key: 'firstName'},
        {label: 'Last Name', key: 'lastName'},
        {label: 'City', key: 'city'},
        {label: 'State', key: 'region'},
        {label: 'ZipCode', key: 'zipCode'},
        {label: 'Country', key: 'country'},
        {label: 'Cohort Year', key: 'cohortYear'},
        {label: 'ID', key: 'id'}
    ]

    const clearShoppingCart = () => {
        setShoppingCartArr([])
    }

    return (
        <div>
            <h1>Shopping Cart</h1>
            <div className="cart__commands">
                <CSVLink className="csv__link" filename={"Nology-Profiles.csv"} data={data} headers={headers}>Export To CSV</CSVLink>
                <button className="clear__cart" onClick={clearShoppingCart}>Clear Shopping Cart</button>    
            </div>
            <div className="profile-card-wrapper">
            {ShoppingCartDisplay} 
            </div>      
        </div>
    )
}

export default ShoppingCart;