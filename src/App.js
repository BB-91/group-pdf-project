import './App.scss';
import FileUploader from './components/FileUploader/FileUploader';
import SearchResults from './containers/SearchResults/SearchResults';
import UploadForm from './containers/UploadForm/UploadForm';

let 

function App() {
    return (
        <div className="App">
            <UploadForm/>
            <SearchResults/>
        </div>
    );
}

export default App;
