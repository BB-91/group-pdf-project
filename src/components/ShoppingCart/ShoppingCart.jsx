import "./ShoppingCart.scss"
import { useState } from "react"
import ProfileCard from "../ProfileCard/ProfileCard"
import {CSVLink, CSVDownload} from 'react-csv';
import { saveCSV, saveTSV } from "../../data/textFileSaver.mjs";
import { serverURL } from "../../data/s3ServerData.mjs";


const ShoppingCart = (props) =>{
    const {ShoppingCartArr, setShoppingCartArr} = props
    const [showCart, setShowCart] = useState()

    const removeFromShoppingCart = (event) => {
        const profileId = event.target.getAttribute("id")
        setShoppingCartArr(ShoppingCartArr.filter(profile => profile.id != profileId))
    }


    const _saveProfileLinksAs = (extension) => {
        if (!ShoppingCartArr) {
            alert(`Nothing in cart`);
        } else {
            const firstProfile = ShoppingCartArr[0];
            if (!firstProfile) {
                throw new Error(`Invalid profile`);
            }

            const headers = Object.keys(firstProfile);
            let rows = [];

            ShoppingCartArr.forEach(profile => {
                const row = [];
                headers.forEach(header => {
                    let value = profile[header];
                    if (header == "s3FileName") {
                        // header = "downloadLink";
                        // value = `http://localhost:${port}/download/` + value;
                        value = `${serverURL}/download/` + value;
                    }

                    row.push(value);
                })
                rows.push(row);
            })
            
            let saveMethod;

            switch (extension) {
                case '.csv':
                    saveMethod = saveCSV;
                    break;
                case '.tsv':
                    saveMethod = saveTSV;
                    break;
                default:
                    throw new Error(`Invalid extension: ${extension}`); 
            }            

            const renamedHeaders = [];
            headers.forEach(header => {
                if (header == "s3FileName") {
                    renamedHeaders.push("downloadLink");
                } else {
                    renamedHeaders.push(header);
                }
            })

            saveMethod(renamedHeaders, rows, 'profile-links')
        }
    }

    const saveProfileLinksAsCSV = () => {
        _saveProfileLinksAs('.csv');
    }

    const saveProfileLinksAsTSV = () => {
        _saveProfileLinksAs('.tsv');
    }

    const ShoppingCartDisplay = ShoppingCartArr.map((file, index) => {
        console.log(`----- DEGBUGGING DOWNLOAD URL FILENAME --------`)
        console.log("file: ", file)

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

    const clearShoppingCart = () => {
        setShoppingCartArr([])
    }

    return (
        <div>
            <h1>Shopping Cart</h1>

            <button onClick={saveProfileLinksAsCSV}>Export to CSV</button>
            <button onClick={saveProfileLinksAsTSV}>Export to TSV</button>
            <button onClick={clearShoppingCart}>Clear Shopping Cart</button>      
            {ShoppingCartDisplay}     
        </div>
    )
}

export default ShoppingCart;