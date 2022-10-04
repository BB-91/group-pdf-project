import './App.scss';
import FileUploader from './components/FileUploader/FileUploader';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import SearchResults from './containers/SearchResults/SearchResults';
import UploadForm from './containers/UploadForm/UploadForm';
import {useEffect, useState} from 'react';

function App() {

    const [files, setFiles] = useState()
    const [ShoppingCartArr, setShoppingCartArr] = useState([])
    const [renderOptions, setRenderOptions] = useState()

    const getData = () => {
        fetch("http://localhost:3010/api/profiles")
        .then((response) => {
            return response.json()
        }) .then((data) => {
            setFiles(data)
        })
    }
    
    const renderShoppingCart = () => {
        setRenderOptions("shoppingCartOption")
    }

    const renderUploadForm = () => {
        setRenderOptions("uploadFormOption")
    }

    const renderSearchResults = () => {
        setRenderOptions("searchResultsOption")
    }

    useEffect(getData, [])

    console.log(ShoppingCartArr)

    return (
        <div className="App">
            <nav className="nav__buttons">
                <button className="nav__button" onClick={renderUploadForm}>Upload PDFs</button>
                <button className="nav__button" onClick={renderSearchResults}>Search Profiles</button>
                <button className="nav__button" onClick={renderShoppingCart}>Shopping Cart</button>
            </nav>
            {renderOptions == "uploadFormOption" ? <UploadForm/> : ""}
            {renderOptions == "searchResultsOption" ? files && <SearchResults 
            ShoppingCartArr = {ShoppingCartArr}
            setShoppingCartArr={setShoppingCartArr}
            files={files}/>: ""}
            {renderOptions == "shoppingCartOption" ? <ShoppingCart 
            ShoppingCartArr = {ShoppingCartArr}
            setShoppingCartArr={setShoppingCartArr}/> : ""}
        </div>
    );
}

export default App;
