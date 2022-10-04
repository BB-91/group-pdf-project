import './App.scss';
import { useEffect, useRef, useState } from 'react';

import LOCAL_API from "./data/localAPI.mjs";
import AWS_API from './data/awsAPI.mjs';
import validator from './data/patchValidator.mjs';

import { isValidSignInToken } from "./data/signInTokenValidator.mjs";

import SearchResults from './containers/SearchResults/SearchResults';
import Header from './containers/Header/Header';
import Footer from './containers/Footer/Footer';

import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import FileUploader from './components/FileUploader/FileUploader';


import FileUploaderContainer from './containers/FileUploaderContainer/FileUploaderContainer';


const TEST_SIGN_IN_TOKEN = "xyz789";
let signedIn = isValidSignInToken(TEST_SIGN_IN_TOKEN);

const localApiURL = LOCAL_API.getURL();
const awsApiURL = AWS_API.getURL();

function App() {
    const [profiles, setProfiles] = useState([])
    const [ShoppingCartArr, setShoppingCartArr] = useState([])

    const ENDPOINT = {
        upload: 'getSignedUploadUrl/',
        download: 'getSignedDownloadUrl/',
    }

    const _getSignedURL = async (filename, endpoint) => {
        if (!Object.values(ENDPOINT).includes(endpoint)) {
            throw new Error(`Invalid endpoint: ${endpoint}`)
        }

        console.log("filename: ", filename)

        // const res = await fetch(`http://localhost:3050/getsignedurl/${filename}`, {
        const res = await fetch(`http://localhost:3050/${endpoint}${filename}`, {
            method: 'GET',
            headers: {
                // 'Accept': '*/*',
                'Content-Type': 'application/json',
                'Content-Length': '<calculated when request is sent>',
                'Host': '<calculated when request is sent>',
                // 'Accept': '*/*',
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },
            // body: formData
        })
        // .then(res => res.json());

        console.log("res:", res);
        const resObj = await res.json();
        console.log("resObj: ", resObj);
        const signedUrl = resObj.signedUrl;
        console.log("signedUrl: ", signedUrl);
        return signedUrl;
    }


    const getSignedDownloadURL = async (filename) => {
        const signedURL = await _getSignedURL(filename, ENDPOINT.download);
        return signedURL;
    }

    const getSignedUploadURL = async (filename) => {
        const signedURL = await _getSignedURL(filename, ENDPOINT.upload)
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

        return postResponse;
    }

    const effectRan = useRef(false);

    useEffect(() => {
        const effect = async () => {
            const profiles = await getProfiles();
            console.log("running effect. setting profiles to: ", profiles);
            setProfiles(profiles);

            console.log("ShoppingCartArr: ", ShoppingCartArr)
        }

        if (!effectRan.current) {
            effectRan.current = true;
            effect();
        }
    })



// -START---------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
    const [files, setFiles] = useState()
    // const [ShoppingCartArr, setShoppingCartArr] = useState([])
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
// -END---------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------



    return (
        <div className="App">
            <Header />

            <div className='SHOPPING-CART'>
                <nav className="nav__buttons">
                    <button className="nav__button" onClick={renderUploadForm}>Upload PDFs</button>
                    <button className="nav__button" onClick={renderSearchResults}>Search Profiles</button>
                    <button className="nav__button" onClick={renderShoppingCart}>Shopping Cart</button>
                </nav>
                {/* {renderOptions == "uploadFormOption" ? <UploadForm/> : ""} */}
                {renderOptions == "uploadFormOption" ?
                    <FileUploaderContainer
                        postProfile={postProfile}
                        getProfiles={getProfiles}
                        getAwsFileNames={getAwsFileNames}
                        getAwsFile={getAwsFile}
                        getSignedDownloadURL={getSignedDownloadURL}
                        getSignedUploadURL={getSignedUploadURL}
                        // signedIn={signedIn}
                    />
                    : ""
                }
                {renderOptions == "searchResultsOption" ? files && <SearchResults 
                ShoppingCartArr = {ShoppingCartArr}
                setShoppingCartArr={setShoppingCartArr}
                files={files}/>: ""}
                {renderOptions == "shoppingCartOption" ? <ShoppingCart 
                ShoppingCartArr = {ShoppingCartArr}
                setShoppingCartArr={setShoppingCartArr}/> : ""}
            </div>



            {/* <main>
                <FileUploaderContainer
                    postProfile={postProfile}
                    getProfiles={getProfiles}
                    getAwsFileNames={getAwsFileNames}
                    getAwsFile={getAwsFile}
                    getSignedDownloadURL={getSignedDownloadURL}
                    getSignedUploadURL={getSignedUploadURL}
                    signedIn={signedIn}
                />

                {profiles && 
                        <SearchResults 
                            ShoppingCartArr = {ShoppingCartArr}
                            setShoppingCartArr={setShoppingCartArr}
                            files={profiles}
                        />
                }

                <S3DownloadComponent signedIn={signedIn}/>

            </main> */}
            <Footer />
        </div>
    );
}

export default App;


// import './App.scss';
// import FileUploader from './components/FileUploader/FileUploader';
// import ShoppingCart from './components/ShoppingCart/ShoppingCart';
// import SearchResults from './containers/SearchResults/SearchResults';
// import UploadForm from './containers/UploadForm/UploadForm';
// import {useEffect, useState} from 'react';


// function App() {

//     const [files, setFiles] = useState()
//     const [ShoppingCartArr, setShoppingCartArr] = useState([])
//     const [renderOptions, setRenderOptions] = useState()

//     const getData = () => {
//         fetch("http://localhost:3010/api/profiles")
//         .then((response) => {
//             return response.json()
//         }) .then((data) => {
//             setFiles(data)
//         })
//     }
    
//     const renderShoppingCart = () => {
//         setRenderOptions("shoppingCartOption")
//     }

//     const renderUploadForm = () => {
//         setRenderOptions("uploadFormOption")
//     }

//     const renderSearchResults = () => {
//         setRenderOptions("searchResultsOption")
//     }

//     useEffect(getData, [])

//     console.log(ShoppingCartArr)

//     return (
//         <div className="App">
//             <nav className="nav__buttons">
//                 <button className="nav__button" onClick={renderUploadForm}>Upload PDFs</button>
//                 <button className="nav__button" onClick={renderSearchResults}>Search Profiles</button>
//                 <button className="nav__button" onClick={renderShoppingCart}>Shopping Cart</button>
//             </nav>
//             {/* {renderOptions == "uploadFormOption" ? <UploadForm/> : ""} */}
//             {renderOptions == "uploadFormOption" ?
//                 <FileUploaderContainer
//                     postProfile={postProfile}
//                     getProfiles={getProfiles}
//                     getAwsFileNames={getAwsFileNames}
//                     getAwsFile={getAwsFile}
//                     getSignedDownloadURL={getSignedDownloadURL}
//                     getSignedUploadURL={getSignedUploadURL}
//                     signedIn={signedIn}
//                 />
//                 : ""
//             }
//             {renderOptions == "searchResultsOption" ? files && <SearchResults 
//             ShoppingCartArr = {ShoppingCartArr}
//             setShoppingCartArr={setShoppingCartArr}
//             files={files}/>: ""}
//             {renderOptions == "shoppingCartOption" ? <ShoppingCart 
//             ShoppingCartArr = {ShoppingCartArr}
//             setShoppingCartArr={setShoppingCartArr}/> : ""}
//         </div>
//     );
// }

// export default App;

