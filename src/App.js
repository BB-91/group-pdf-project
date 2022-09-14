import './App.scss';
import FileUploader from './components/FileUploader/FileUploader';
import LOCAL_API from "./data/localAPI.mjs";
import validator from './data/patchValidator.mjs';

const customApiURL = LOCAL_API.getURL();

function App() {

    const getProfiles = async () => {
        const profiles = await fetch(customApiURL).then(res => { return res.json(); })
        return profiles;
    }

    const postProfile = async (profile) => {
        validator.assertNonArrayObj(profile);

        const postResponse = await fetch(customApiURL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },

            body: JSON.stringify(profile)
        })
        .then(res => res.json())

        return postResponse
    }

    return (
        <div className="App">
            <FileUploader postProfile={postProfile} getProfiles={getProfiles}/>

        </div>
    );
}

export default App;
