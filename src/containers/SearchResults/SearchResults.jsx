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
    const [dateResults, setDateResults] = useState('all')
    const [profileYear, setProfileYear] = useState([])

    // const filteredProfiles = checkResults.filter((profile) => {
    const filteredFiles = checkResults.filter((profile) => {
        const lowerProfileValues = Object.values(profile).map(value => String(value).toLowerCase());
        const splitResults = returnResults.split(" ");
        let allSplitResultsMatch = true;

        for (let i=0; i<splitResults.length; i++) {
            const splitResult = splitResults[i];
            let matchFound = false;

            for (let n=0; n<lowerProfileValues.length; n++) {
                const value = lowerProfileValues[n];
                if (value.includes(splitResult)) {
                    matchFound = true;
                    break;
                }
            }

            if (!matchFound) {
                allSplitResultsMatch = false;
                break;
            }

        }

        return allSplitResultsMatch;
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
            <div key={index}>
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
                />
            </div>
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