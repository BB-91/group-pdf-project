// import "./SearchBar.scss"

const SearchBar = (props) => {

    const {setReturnResults} = props;

    const handleSearchInput = (event) => {
        const cleanInput = event.target.value.toLowerCase()
        setReturnResults(cleanInput)
    }
    
    return (
        <>
            <input type="search" 
            placeholder="Search!"
            onInput={handleSearchInput}
            ></input>
            
        </>
    )

    
}

export default SearchBar;