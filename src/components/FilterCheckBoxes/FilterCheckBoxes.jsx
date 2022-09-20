import "./FilterCheckBoxes.scss";
import {useState, useEffect} from 'react';

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

    // console.log(files)

    const countryProfiles = () => {
        console.log("being run")
        if (isUSA == false && isUK == false && isAUS == false) {
            setCheckResults(files)
            console.log("its all false")
        } else if (isUSA == true && isUK == false && isAUS == false) {
            setCheckResults(USAProfiles)
            console.log(checkResults)
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
        }
    }

    useEffect((countryProfiles), [])

    console.log(isUSA)
    console.log(isUK)
    console.log(isAUS)

    const handleIsUSA = () => {
        setIsUSA(!isUSA)
        countryProfiles()
        console.log(isUSA)
    }
    const handleIsUK = () => {
        setIsUK(!isUK)
        countryProfiles()
        console.log(isUK)
    }
    const handleIsAUS = () => {
        setIsAUS(!isAUS)
        countryProfiles()
        console.log(isAUS)
    }

    const changeTrueFalse = () => {
        return new Promise((resolve) => {
            setIsUSA(!isUSA)
            resolve()
        })
    }

    const runCountryProfiles = () => {
        countryProfiles()
    }

    const comboFunc = () => {
        changeTrueFalse().then(runCountryProfiles)
    }

    // const changeTrueFalse = () => {
    //     setIsUSA(!isUSA)
    // }

    // const runCountryProfiles = (changeTrueFalse) => {
    //     changeTrueFalse()
    // }

    return (
        <>
            <input type="checkbox" onClick={comboFunc}/>USA
            <input type="checkbox" onClick={handleIsUK}/>UK
            <input type="checkbox" onClick={handleIsAUS}/>AUS
        </>
    )
}

export default FilterCheckboxes;