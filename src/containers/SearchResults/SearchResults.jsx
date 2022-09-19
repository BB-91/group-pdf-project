import "./SearchResults.scss";
import {useState, useEffect} from 'react';
import SearchBar from "../../components/SearchBar/SearchBar";


const SearchResults = () => {

    const [files, setFiles] = useState([])
    const [returnResults, setReturnResults] = useState("")

    const getData = () => {
        fetch("http://192.168.56.1:3020/pdf")
        .then((response) => {
            return response.json()
        }) .then((data) => {
            setFiles(data)
            console.log(data)
        })
    }

    useEffect(getData, [])

    const handleSearchInput = (event) => {
        const cleanInput = event.target.value.toLowerCase()
        setReturnResults(cleanInput)
    }

    console.log(returnResults)
    return (
        <>
            <SearchBar handleSearchInput={handleSearchInput}/>
        </>
    )
}

export default SearchResults;