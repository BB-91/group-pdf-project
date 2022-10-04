import './App.scss';
import FileUploader from './components/FileUploader/FileUploader';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import SearchResults from './containers/SearchResults/SearchResults';
import UploadForm from './containers/UploadForm/UploadForm';
import {useEffect, useState} from 'react';

function App() {

    const [files, setFiles] = useState()
    const [ShoppingCartArr, setShoppingCartArr] = useState([])

    const getData = () => {
        fetch("http://localhost:3010/api/profiles")
        .then((response) => {
            return response.json()
        }) .then((data) => {
            setFiles(data)
        })
    }

    // const testFunc = () => {
    //     setShoppingCartArr("helloo")
    // }

    // useEffect(testFunc, [])
    

    useEffect(getData, [])

    console.log(ShoppingCartArr)


    return (
        <div className="App">
            <UploadForm/>
            {files && <SearchResults 
            ShoppingCartArr = {ShoppingCartArr}
            setShoppingCartArr={setShoppingCartArr}
            files={files}/>}
            <ShoppingCart 
            ShoppingCartArr = {ShoppingCartArr}
            setShoppingCartArr={setShoppingCartArr}
            files={files}/>
        </div>
    );
}

export default App;
