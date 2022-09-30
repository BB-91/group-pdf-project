import './App.scss';
import FileUploader from './components/FileUploader/FileUploader';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import SearchResults from './containers/SearchResults/SearchResults';
import UploadForm from './containers/UploadForm/UploadForm';
import {useEffect, useState} from 'react';

let ShoppingCartArr = []

function App() {

    const [files, setFiles] = useState()

    const getData = () => {
        fetch("http://localhost:3010/api/profiles")
        .then((response) => {
            return response.json()
        }) .then((data) => {
            setFiles(data)
        })
    }

    useEffect(getData, [])


    return (
        <div className="App">
            <UploadForm/>
            {files && <SearchResults 
            ShoppingCartArr = {ShoppingCartArr} 
            files={files}/>}
            <ShoppingCart ShoppingCartArr = {ShoppingCartArr}/>
        </div>
    );
}

export default App;
