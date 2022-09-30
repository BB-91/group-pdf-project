import "./SearchResults.scss";
import {useState, useEffect} from 'react';
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterCheckboxes from "../../components/FilterCheckBoxes/FilterCheckBoxes";
import DateDropdown from "../../components/DateDropdown/DateDropdown";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

const SearchResults = (props) => {

    const {ShoppingCartArr, setShoppingCartArr, files} = props;
    
    const [returnResults, setReturnResults] = useState("")
    const [checkResults, setCheckResults] = useState([])
    const [dateResults, setDateResults] = useState([])
    const [profileYear, setProfileYear] = useState([])

    const filteredFiles = checkResults.filter((file) => {
        return (
            file.firstName.toLowerCase().includes(returnResults) ||
            file.lastName.toLowerCase().includes(returnResults) ||
            file.city.toLowerCase().includes(returnResults) ||
            file.country.toLowerCase().includes(returnResults) ||
            file.state.toLowerCase().includes(returnResults) ||
            file.zipCode.toLowerCase().includes(returnResults) ||
            file.cohort_year == returnResults
            )
    })

    console.log("Date result " + dateResults);
    const searchYearFilter = filteredFiles.filter((file) => {
        if (dateResults == "all" || dateResults == "") {
            return file
        } else {
            return file.cohort_year == dateResults
        }
        
    })

    // const addToArray = (file) =>{
    //     ShoppingCartArr.push(file)
    //     console.log(ShoppingCartArr)
    //     console.log("added to array")
    // }

    const mappedFiles = searchYearFilter.map((file) => {
        return (
            <>
                <ProfileCard 
                //  index = {ShoppingCartDisplay.indexOf()}
                firstName = {file.firstName} 
                lastName = {file.lastName} 
                city = {file.city} 
                state = {file.state}
                zipcode = {file.zipcode}
                country = {file.country}
                cohort_year = {file.cohort_year}
                // addToArray={addToArray}
                file={file}
                ShoppingCartArr={ShoppingCartArr}
                setShoppingCartArr={setShoppingCartArr}
                />
                {/* <button onClick={addToArray(file)}>add to cart</button> */}
            </>
        )
    })
    return (
        <>
            <SearchBar 
            setReturnResults={setReturnResults}/>
            {files && <FilterCheckboxes 
            checkResults={checkResults}
            files={files}
            setCheckResults={setCheckResults}/>}
            {files && <DateDropdown 
            files={files}
            dateResults={dateResults}
            setDateResults={setDateResults}
            profileYear={profileYear}
            setProfileYear={setProfileYear}/>}
            {mappedFiles}
        </>
    )
}

export default SearchResults;