import "./FilterCheckBoxes.scss";
import {useState, useEffect, useRef} from 'react';

const FilterCheckboxes = (props) => {

    const {checkResults, setCheckResults, profiles} = props;

    const [isUSA, setIsUSA] = useState(false)
    const [isUK, setIsUK] = useState(false)
    const [isAUS, setIsAUS] = useState(false)

    const allProfiles = profiles.filter((profile) => {
        return profile
    })
    
    const USAProfiles = profiles.filter((profile) => {
        return (
            profile.country.includes("US")
        )
    })

    const UKProfiles = profiles.filter((profile) => {
        return (
            profile.country.includes("UK")
        )
    })

    const AUSProfiles = profiles.filter((profile) => {
        return (
            profile.country.includes("AU")
        )
    })

    const USAUKProfiles = profiles.filter((profile) => {
        return (
            profile.country.includes("US") ||
            profile.country.includes("UK")
        )
    })

    const USAAUSProfiles = profiles.filter((profile) => {
        return (
            profile.country.includes("US") ||
            profile.country.includes("AU")
        )
    })

    const UKAUSProfiles = profiles.filter((profile) => {
        return (
            profile.country.includes("UK") ||
            profile.country.includes("AU")
        )
    })

    const countryProfiles = () => {
        if (isUSA == true && isUK == false && isAUS == false) {
            setCheckResults(USAProfiles)
        } else if (isUK == true && isUSA == false && isAUS == false) {
            setCheckResults(UKProfiles) 
        } else if (isAUS == true && isUSA == false && isUK == false) {
            setCheckResults(AUSProfiles)
        } else if (isUSA == true && isUK == true && isAUS == false) {
            setCheckResults(USAUKProfiles)
        } else if (isUSA == true && isAUS == true && isUK == false) {
            setCheckResults(USAAUSProfiles)
        } else if (isUK == true && isAUS == true && isUSA == false) {
            setCheckResults(UKAUSProfiles)
        } else if (isUK == true && isAUS == true && isUSA == true) {
            setCheckResults(profiles)
        } else if (isUSA == false && isUK == false && isAUS == false) {
            setCheckResults(profiles)
            console.log("all false")
        }
    }

    useEffect(countryProfiles, [])

    const handleIsUSA = () => {
        setIsUSA(!isUSA)
    }
    const handleIsUK = () => {
        setIsUK(!isUK)
    }
    const handleIsAUS = () => {
        setIsAUS(!isAUS)
    }

    useEffect(countryProfiles, [isUSA, isUK, isAUS])

    return (
        <div title="checkBoxes">
            <input type="checkbox" onClick={handleIsUSA}/>US
            <input type="checkbox" onClick={handleIsUK}/>UK
            <input type="checkbox" onClick={handleIsAUS}/>AU
        </div>
    )
}

export default FilterCheckboxes;