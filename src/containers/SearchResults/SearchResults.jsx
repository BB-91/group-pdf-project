import "./SearchResults.scss";
import {useState, useEffect} from 'react';
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterCheckboxes from "../../components/FilterCheckBoxes/FilterCheckBoxes";
import DateDropdown from "../../components/DateDropdown/DateDropdown";


const SearchResults = () => {

    const [files, setFiles] = useState()
    const [returnResults, setReturnResults] = useState("")
    const [checkResults, setCheckResults] = useState([])
    const [dateResults, setDateResults] = useState([])
    const [profileYear, setProfileYear] = useState([])

    const getData = () => {
        fetch("http://192.168.56.1:3020/pdf")
        .then((response) => {
            return response.json()
        }) .then((data) => {
            setFiles(data)
            // console.log(data)
        })
    }

    useEffect(getData, [])

    const handleSearchInput = (event) => {
        const cleanInput = event.target.value.toLowerCase()
        setReturnResults(cleanInput)
    }



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
    const mappedFiles = searchYearFilter.map((file) => {
        return (
            <>
                <p>{file.firstName} {file.lastName}</p>
                <p>{file.city}, {file.state}, {file.zipCode}, {file.country}</p>
                <p>{file.cohort_year}</p>
            </>
        )
    })
    return (
        <>
            <SearchBar handleSearchInput={handleSearchInput}/>
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