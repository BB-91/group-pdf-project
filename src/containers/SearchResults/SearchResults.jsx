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
                    zipCode = {file.zipCode}
                    country = {file.country}
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

    return (
        <div className="search__page">
            <h2 className="search__heading">Search Profiles</h2>
            <div className="search__body">
                <div className="filter__options">
                    <SearchBar
                        setReturnResults={setReturnResults}
                        className="search__bar"/>
                    {files && 
                        <FilterCheckboxes 
                            checkResults={checkResults}
                            files={files}
                            setCheckResults={setCheckResults}
                            className="filter__checkboxes"/>
                        }
                    {files &&
                        <DateDropdown 
                            files={files}
                            dateResults={dateResults}
                            setDateResults={setDateResults}
                            profileYear={profileYear}
                            setProfileYear={setProfileYear}
                            className="date__dropdrown"/>
                        }
                </div>
                <div className="profile-card-wrapper">
                    {mappedFiles}
                </div>
            </div>

        </div>
    )
}

export default SearchResults;