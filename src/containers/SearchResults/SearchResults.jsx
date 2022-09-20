import "./SearchResults.scss";
import {useState, useEffect} from 'react';
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterCheckboxes from "../../components/FilterCheckBoxes/FilterCheckBoxes";


const SearchResults = () => {

    const [files, setFiles] = useState()
    const [returnResults, setReturnResults] = useState("")
    const [checkResults, setCheckResults] = useState([])

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
            file.lastName.toLowerCase().includes(returnResults) ||
            file.country.toLowerCase().includes(returnResults) ||
            file.state.toLowerCase().includes(returnResults) ||
            file.zipCode.toLowerCase().includes(returnResults)
            )
    })

    const mappedFiles = filteredFiles.map((file) => {
        return (
            <>
                <p>{file.firstName} {file.lastName}</p>
                <p>{file.city}, {file.state}, {file.zipCode}, {file.country}</p>
            </>
        )
    })

    console.log(returnResults)
    return (
        <>
            <SearchBar handleSearchInput={handleSearchInput}/>
            {files && <FilterCheckboxes 
            checkResults={checkResults}
            files={files}
            setCheckResults={setCheckResults}/>}
            {mappedFiles}
        </>
    )
}

export default SearchResults;