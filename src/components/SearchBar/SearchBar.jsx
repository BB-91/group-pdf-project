import "./SearchBar.scss"

const SearchBar = (props) => {

    const {setReturnResults} = props;

    const handleSearchInput = (event) => {
        const cleanInput = event.target.value.toLowerCase()
        setReturnResults(cleanInput)
    }
    
    return (
        <div  className="search__bar">
            <input
            className="actual__search__bar"
            type="search" 
            placeholder="Search!"
            onInput={handleSearchInput}
            ></input>
            
        </div>
    )

    
}

export default SearchBar;