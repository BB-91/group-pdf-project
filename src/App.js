import './App.scss';
import FileUploader from './components/FileUploader/FileUploader';
import FileUploaderController from './controllers/FileUploaderController/FileUploaderController';
import LOCAL_API from "./data/localAPI.mjs";
import AWS_API from './data/awsAPI.mjs';
import validator from './data/patchValidator.mjs';

import { isValidSignInToken } from "./data/signInTokenValidator.mjs";
import S3DownloadComponent from './components/S3DownloadComponent/S3DownloadComponent';

const TEST_SIGN_IN_TOKEN = "xyz789";
let signedIn = isValidSignInToken(TEST_SIGN_IN_TOKEN);

const localApiURL = LOCAL_API.getURL();
const awsApiURL = AWS_API.getURL();




function App() {
    const getAwsSignedURL = async (filename) => {
        // --- DEBUG ONLY ---
        const signedURL = await fetch('http://localhost:3050/getsignedurl/horse.jpg').then(res => { return res.json(); })
        console.log("signedURL: ", signedURL);
        return signedURL;
    }

    const getAwsFileNames = async () => {
        const awsFileNames = await fetch(awsApiURL + "/list").then(res => { return res.json(); })
        return awsFileNames;
    }

    const getAwsFile = async (filename) => {
        while (filename.startsWith("/")) {
            filename = filename.slice(1);
        }

        while (filename.endsWith("/")) {
            filename = filename.slice(0, -1);
        }

        const filePath = awsApiURL + `/download/` + filename;
        console.log("attempting download of file at path: " + filePath);

        window.location = filePath;
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
            <FileUploaderController
                postProfile={postProfile}
                getProfiles={getProfiles}
                getAwsFileNames={getAwsFileNames}
                getAwsFile={getAwsFile}
                getAwsSignedURL={getAwsSignedURL}
                signedIn={signedIn}
            />

            <S3DownloadComponent signedIn={signedIn}/>

        </div>
    );
}

export default App;
