import "./FilterCheckBoxes.scss";
import {useState, useEffect, useRef} from 'react';

const FilterCheckboxes = (props) => {

    const {checkResults, setCheckResults, files} = props;

    const [isUSA, setIsUSA] = useState(false)
    const [isUK, setIsUK] = useState(false)
    const [isAUS, setIsAUS] = useState(false)

    const allProfiles = files.filter((file) => {
        return file
    })
    
    const USAProfiles = files.filter((file) => {
        return (
            file.country.includes("USA")
        )
    })

    const UKProfiles = files.filter((file) => {
        return (
            file.country.includes("UK")
        )
    })

    const AUSProfiles = files.filter((file) => {
        return (
            file.country.includes("AUS")
        )
    })

    const USAUKProfiles = files.filter((file) => {
        return (
            file.country.includes("USA") ||
            file.country.includes("UK")
        )
    })

    const USAAUSProfiles = files.filter((file) => {
        return (
            file.country.includes("USA") ||
            file.country.includes("AUS")
        )
    })

    const UKAUSProfiles = files.filter((file) => {
        return (
            file.country.includes("UK") ||
            file.country.includes("AUS")
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
            setCheckResults(files)
        } else if (isUSA == false && isUK == false && isAUS == false) {
            setCheckResults(files)
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
        <div title="checkBoxes" className="check__boxes">
            <div className="check__box"><input type="checkbox" onClick={handleIsUSA}/>USA</div>
            <div className="check__box"><input type="checkbox" onClick={handleIsUK}/>UK</div>
            <div className="check__box"><input type="checkbox" onClick={handleIsAUS}/>AUS</div>
        </div>
    )
}

export default FilterCheckboxes;