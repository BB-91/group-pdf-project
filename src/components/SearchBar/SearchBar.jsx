import "./SearchBar.scss"

const SearchBar = (props) => {

    const {handleSearchInput} = props;

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