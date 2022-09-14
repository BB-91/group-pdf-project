import { useEffect, useRef } from 'react';
import './App.scss';
import FileUploader from './components/FileUploader/FileUploader';
import LOCAL_API from "./data/localAPI.mjs";
import validator from './data/patchValidator.mjs';

const customApiURL = LOCAL_API.getURL();

function App() {
    const getProfiles = async () => {
        const localData = await fetch(customApiURL).then(res => { return res.json(); })
        return localData
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

    const TEST_PROFILE = {firstName: "John", lastName: "Doe", city: "Houston", state: "Texas", zipCode: 77062, keywords: ["a", "b", "c"],}
    const effectRan = useRef(false); // prevent useEffect from running twice on page load

    useEffect(() => {
        const effectFunc = async () => {
            effectRan.current = true;
            console.log("running effectFunc");

            const postResponse = await postProfile(TEST_PROFILE);
            console.log("postResponse: ", postResponse);
            
            const profiles = await getProfiles();
            console.log("profiles: ", profiles);
        }
        
        if (!effectRan.current){
            effectFunc();
        }
    })

    return (
        <div className="App">
            <FileUploader />

        </div>
    );
}

export default App;
