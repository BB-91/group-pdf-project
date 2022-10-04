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
            file.region.toLowerCase().includes(returnResults) ||
            file.zipCode.toLowerCase().includes(returnResults) ||
            file.cohortYear == returnResults
            )
    })

    console.log("Date result " + dateResults);
    const searchYearFilter = filteredFiles.filter((file) => {
        if (dateResults == "all" || dateResults == "") {
            return file
        } else {
            return file.cohortYear == dateResults
        }
        
    })

    const mappedFiles = searchYearFilter.map((file, index) => {
        return (
            <>
                <ProfileCard
                    firstName = {file.firstName} 
                    lastName = {file.lastName} 
                    city = {file.city} 
                    region = {file.region}
                    // zipCode = {file.zipCode}
                    zipCode = {file.zipCode}
                    country = {file.country}
                    // cohortYear = {file.cohortYear}
                    cohortYear = {file.cohortYear}
                    id = {file.id}
                    file={file}
                    ShoppingCartArr={ShoppingCartArr}
                    setShoppingCartArr={setShoppingCartArr}

                    key={index}
                />
            </>
        )
    })

    // const mappedFiles = searchYearFilter.map((file) => {
    //     return (
    //         <>
    //             <ProfileCard 
    //                 firstName = {file.firstName} 
    //                 lastName = {file.lastName} 
    //                 city = {file.city} 
    //                 region = {file.region}
    //                 zipCode = {file.zipCode}
    //                 country = {file.country}
    //                 cohortYear = {file.cohortYear}
    //                 id = {file.id}
    //                 file={file}
    //                 ShoppingCartArr={ShoppingCartArr}
    //                 setShoppingCartArr={setShoppingCartArr}

                    
    //             />
    //         </>
    //     )
    // })


    return (
        <div className="search__page">
            <h2>Search Profiles</h2>
            <div>
                <SearchBar
                    setReturnResults={setReturnResults}/>
                    {files && 
                        <FilterCheckboxes 
                            checkResults={checkResults}
                            files={files}
                            setCheckResults={setCheckResults}
                        />
                    }
                    {files &&
                        <DateDropdown 
                            files={files}
                            dateResults={dateResults}
                            setDateResults={setDateResults}
                            profileYear={profileYear}
                            setProfileYear={setProfileYear}
                        />
                    }
            </div>
            
            <div className="profile-card-wrapper">
                {mappedFiles}
            </div>

        </div>
    )
}

export default SearchResults;