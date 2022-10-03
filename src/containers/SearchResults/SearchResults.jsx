import "./SearchResults.scss";
import {useState, useEffect} from 'react';
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterCheckboxes from "../../components/FilterCheckBoxes/FilterCheckBoxes";
import DateDropdown from "../../components/DateDropdown/DateDropdown";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

const SearchResults = (props) => {
    const {ShoppingCartArr, setShoppingCartArr, profiles} = props;
    
    const [returnResults, setReturnResults] = useState("")
    const [checkResults, setCheckResults] = useState([])
    const [dateResults, setDateResults] = useState([])
    const [profileYear, setProfileYear] = useState([])

    const filteredProfiles = checkResults.filter((profile) => {
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

    console.log("Date result " + dateResults);
    const searchYearFilter = filteredProfiles.filter((profile) => {
        if (dateResults === "all" || dateResults === "") {
            return profile;
        } else {
            return profile.cohortYear === dateResults;
        }
    })

    const mappedProfiles = searchYearFilter.map((profile, index) => {
        return (
            <>
                <ProfileCard
                    profile={profile}
                    ShoppingCartArr={ShoppingCartArr}
                    setShoppingCartArr={setShoppingCartArr}
                    key={index}
                />
                {/* <button onClick={addToArray(profile)}>add to cart</button> */}
            </>
        )
    })

    // const mappedProfiles = searchYearFilter.map((profile) => {
    //     const { id, cohortYear, firstName, lastName, country, city, region, zipCode } = profile;

    //     return (
    //         <>
    //             <ProfileCard 
    //                 profile={profile}
    //                 id={id}
    //                 cohortYear={cohortYear}
    //                 firstName={firstName} 
    //                 lastName={lastName} 
    //                 country={country}
    //                 city={city} 
    //                 region={region}
    //                 zipCode={zipCode}
    //                 //  index = {ShoppingCartDisplay.indexOf()}
    //                 // state = {profile.state}
    //                 // zipcode = {profile.zipcode}
    //                 // addToArray={addToArray}
    //                 ShoppingCartArr={ShoppingCartArr}
    //                 setShoppingCartArr={setShoppingCartArr}
    //             />
    //             {/* <button onClick={addToArray(profile)}>add to cart</button> */}
    //         </>
    //     )
    // })

    // const mappedProfiles = searchYearFilter.map((profile) => {
    //     return (
    //         <>
    //             <ProfileCard 
    //                 //  index = {ShoppingCartDisplay.indexOf()}
    //                 firstName = {profile.firstName} 
    //                 lastName = {profile.lastName} 
    //                 city = {profile.city} 
    //                 state = {profile.state}
    //                 zipcode = {profile.zipcode}
    //                 country = {profile.country}
    //                 cohortYear = {profile.cohortYear}
    //                 id = {profile.id}
    //                 // addToArray={addToArray}
    //                 profile={profile}
    //                 ShoppingCartArr={ShoppingCartArr}
    //                 setShoppingCartArr={setShoppingCartArr}
    //             />
    //             {/* <button onClick={addToArray(profile)}>add to cart</button> */}
    //         </>
    //     )
    // })


    return (
        <>
            <SearchBar 
            setReturnResults={setReturnResults}/>
            {profiles && 
                    <FilterCheckboxes 
                        checkResults={checkResults}
                        profiles={profiles}
                        setCheckResults={setCheckResults}
                    />
            }
            {profiles && 
                    <DateDropdown 
                        profiles={profiles}
                        dateResults={dateResults}
                        setDateResults={setDateResults}
                        profileYear={profileYear}
                        setProfileYear={setProfileYear}
                    />
            }
            {mappedProfiles}
        </>
    )
}

export default SearchResults;