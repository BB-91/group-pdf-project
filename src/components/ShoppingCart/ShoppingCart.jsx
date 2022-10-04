// import "./ShoppingCart.scss"
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

    const ShoppingCartDisplay = ShoppingCartArr.map(file => {
        return (
        <div>
            <p>{file.firstName} {file.lastName}</p>
            <p>{file.city}, {file.state}, {file.zipCode}, {file.country}</p>
            <p>{file.cohort_year}</p>
            <p>{file.id}</p>
            <button id={file.id} onClick={removeFromShoppingCart}>Remove</button>
         </div>
        )
    });

    const data = ShoppingCartArr;

    const headers = [
        {label: 'First Name', key: 'firstName'},
        {label: 'Last Name', key: 'lastName'},
        {label: 'City', key: 'city'},
        {label: 'State', key: 'state'},
        {label: 'ZipCode', key: 'zipCode'},
        {label: 'Country', key: 'country'},
        {label: 'Cohort Year', key: 'cohort_year'},
        {label: 'ID', key: 'id'}
    ]

    const clearShoppingCart = () => {
        setShoppingCartArr([])
    }

    return (
        <div>
            <h1>Shopping Cart</h1>
            <CSVLink filename={"Nology-Profiles.csv"} data={data} headers={headers}>Export To CSV</CSVLink>
            <button onClick={clearShoppingCart}>Clear Shopping Cart</button>      
            {ShoppingCartDisplay}     
        </div>
    )
}

export default ShoppingCart;