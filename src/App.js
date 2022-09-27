import './App.scss';
import FileUploader from './components/FileUploader/FileUploader';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import SearchResults from './containers/SearchResults/SearchResults';
import UploadForm from './containers/UploadForm/UploadForm';

let ShoppingCartArr = []

function App() {
    return (
        <div className="App">
            <UploadForm/>
            <SearchResults ShoppingCartArr = {ShoppingCartArr} />
            <ShoppingCart ShoppingCartArr = {ShoppingCartArr}/>
        </div>
    );
}

export default App;
