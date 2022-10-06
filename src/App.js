import './App.scss';
import { useEffect, useRef, useState } from 'react';

import LOCAL_API from "./data/localAPI.mjs";
import validator from './data/patchValidator.mjs';

import SearchResults from './containers/SearchResults/SearchResults';
import Header from './containers/Header/Header';
import Footer from './containers/Footer/Footer';

import ShoppingCart from './components/ShoppingCart/ShoppingCart';

import FileUploaderContainer from './containers/FileUploaderContainer/FileUploaderContainer';

import { useAuth0 } from "@auth0/auth0-react";

const localApiURL = LOCAL_API.getURL();

function App() {
    const [profiles, setProfiles] = useState([]);
    const [ShoppingCartArr, setShoppingCartArr] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const { isAuthenticated } = useAuth0();




    // console.log("loggedIn: ", loggedIn);


    const ENDPOINT = {
        upload: 'getSignedUploadUrl/',
        download: 'getSignedDownloadUrl/',
    }

    const _getSignedURL = async (filename, endpoint) => {
        if (!Object.values(ENDPOINT).includes(endpoint)) {
            throw new Error(`Invalid endpoint: ${endpoint}`)
        }

        const res = await fetch(`http://localhost:3050/${endpoint}${filename}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': '<calculated when request is sent>',
                'Host': '<calculated when request is sent>',
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },
        })

        const resObj = await res.json();
        const signedUrl = resObj.signedUrl;
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

    const getProfiles = async () => {
        const profiles = await fetch(localApiURL).then(res => { return res.json(); })
        return profiles;
    }

    const postProfile = async (profile) => {
        validator.assertNonArrayObj(profile);

        const postResponse = await fetch(localApiURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(profile)
        })
            .then(res => res.json())

        console.log(`posted profile to database: `, profile);
        console.log(`postResponse: `, postResponse);
        return postResponse;
    }

    const effectRan = useRef(false);

    useEffect(() => {
        const effect = async () => {
            const profiles = await getProfiles();
            setProfiles(profiles);
        }

        if (!effectRan.current) {
            effectRan.current = true;
            effect();
        }
    })

    const [files, setFiles] = useState();
    const [renderOptions, setRenderOptions] = useState();
    

    const getData = () => {
        fetch("http://localhost:3010/api/profiles")
            .then((response) => {
                return response.json()
            }).then((data) => {
                setFiles(data)
            })
    }

    useEffect(getData, [])

    return (
        <div className="App">
            
            <Header setRenderOptions={setRenderOptions} useAuth0={useAuth0} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>

            { isAuthenticated && 
                <div className='SHOPPING-CART'>
                    {renderOptions == "uploadFormOption" ?
                        <FileUploaderContainer
                            postProfile={postProfile}
                            getProfiles={getProfiles}
                            getSignedDownloadURL={getSignedDownloadURL}
                            getSignedUploadURL={getSignedUploadURL}
                        />
                        : ""
                    }

                    {(renderOptions == "searchResultsOption" && files) &&
                        <SearchResults
                            ShoppingCartArr={ShoppingCartArr}
                            setShoppingCartArr={setShoppingCartArr}
                            files={files}
                        />
                    }


                    {(renderOptions == "shoppingCartOption") &&
                        <ShoppingCart
                            ShoppingCartArr={ShoppingCartArr}
                            setShoppingCartArr={setShoppingCartArr}
                        />
                    }

                </div>           
            }




            {/* <Footer /> */}
        </div>
    );
}

export default App;
