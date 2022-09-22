import './App.scss';
import FileUploader from './components/FileUploader/FileUploader';
import FileUploaderController from './controllers/FileUploaderController/FileUploaderController';
import LOCAL_API from "./data/localAPI.mjs";
import AWS_API from './data/awsAPI.mjs';
import validator from './data/patchValidator.mjs';

const localApiURL = LOCAL_API.getURL();
const awsApiURL = AWS_API.getURL();


function App() {

    const getAwsFileNames = async () => {
        const awsFileNames = await fetch(awsApiURL + "/list").then(res => { return res.json(); })
        return awsFileNames;
    }

    const getProfiles = async () => {
        const profiles = await fetch(localApiURL).then(res => { return res.json(); })
        return profiles;
    }

    const postProfile = async (profile) => {
        validator.assertNonArrayObj(profile);

        console.log("profile ABOUT TO BE POSTED: ", profile)

        const postResponse = await fetch(localApiURL, {
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
            <FileUploaderController postProfile={postProfile} getProfiles={getProfiles} getAwsFileNames={getAwsFileNames}/>
            {/* <FileUploader postProfile={postProfile} getProfiles={getProfiles}/> */}

        </div>
    );
}

export default App;
