import React, { useRef, useState } from 'react';
import FileUploader from '../../components/FileUploader/FileUploader';
import "./FileUploaderController.scss";

const KEY = {
    pdf: 'pdf',
}

const FileUploaderController = (props) => {
    const [cards, setCards] = useState([])
    // const { postProfile, getProfiles } = props;
    // getAwsFileNames={getAwsFileNames}
    // const { postProfile, getProfiles, getAwsFileNames } = props;
    // const { postProfile, getProfiles, getAwsFileNames, getAwsFile } = props;
    const { postProfile, getProfiles, getAwsFileNames, getAwsFile, getAwsSignedURL } = props;
    const controllerFileInputRef = useRef(null);

    // file uploader allows selecting multiple files, saved as an array.
    const getPDFs = async () => {
        const files = await controllerFileInputRef.current.files;
        const pdfs = Object.values(files);
        if (pdfs) {
            return pdfs;
        }
    }

    const getProfileCardsFromPDF = (pdfs) => {
        return pdfs.map((pdf, index) => {
            return <FileUploader postProfile={postProfile} getProfiles={getProfiles} pdf={pdf} key={index}/>
        })   
    }   

    const handleFileInputChange = async (event) => {
        const controllerFileInputElement = event.target;
        controllerFileInputRef.current = controllerFileInputElement;
        const pdfs = await getPDFs();
        const profileCards = getProfileCardsFromPDF(pdfs);
        setCards(profileCards);
    }

    const handleTestButtonClick = async () => {
        console.log("clicked the test button.");
        console.log("--- ATTEMPTING TO GET AWS FILENAMES ----");
        const awsFileNames = await getAwsFileNames();
        console.log("awsFileNames: ", awsFileNames);

        const DEBUG_TEST_FILENAME = "fish.jpg";
        console.log(`--- ATTEMPTING TO DOWNLOAD AWS FILE: ${DEBUG_TEST_FILENAME}  ----`);
        const downloadFileResult = await getAwsFile(DEBUG_TEST_FILENAME);
        console.log("downloadFileResult: ", downloadFileResult);


        // console.log("CHANGING WINDOW LOCATION TO DOWNLOAD URL")
        // window.location = `http://localhost:3050/download/${DEBUG_TEST_FILENAME}`;


        // getAwsFile
    }


    // app.get("/download/:filename", async (req, res) => {
    //     const filename = req.params.filename;
    //     let result = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    //     console.log("TESTING GETTING OF PRESIGNED URL FROM DOWNLOAD");
    //     const preSignedUrl = await getPresignedURL(filename);
    //     console.log("preSignedUrl: ", preSignedUrl)
    
    //     res.send(result.Body);
    // })


    // const getAwsFileNames = async () => {
    //     const awsFileNames = await fetch(awsApiURL + "/list").then(res => { return res.json(); })
    //     return awsFileNames;
    // }

    const handleShowMeSignedURLBtnClick = async () => {
        const signedURL = await getAwsSignedURL("horse.jpg");
        console.log("signedURL in handler: ", signedURL)
    }

    // const handleShowMeSignedURLBtnClick = async () => {
    //     const TEST_FILENAME = "horse.jpg";

    //     const signedURL = getAwsSignedURL(TEST_FILENAME);
    //     console.log("signedURL: ", signedURL)


    // }

    // const handleShowMeSignedURLBtnClick = async () => {
    //     const TEST_FILENAME = "horse.jpg";


    //     const SOME_RESPONSE_IDK = await fetch(awsApiURL + `/download/${TEST_FILENAME}`).then(res => { return res.json(); })
    //     console.log("SOME_RESPONSE_IDK: ", SOME_RESPONSE_IDK)
    //     // return awsFileNames;

    //     // const fetchResult = fetch()

    //     // console.log(`attempting to get signed url for ${TEST_FILENAME}`);
    //     // let result = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    //     // console.log("TESTING GETTING OF PRESIGNED URL FROM DOWNLOAD");
    //     // const preSignedUrl = await getPresignedURL(filename);
    //     // console.log("preSignedUrl: ", preSignedUrl)
    
    //     // res.send(result.Body);


    //     const TEST_LOCATION = `http://localhost:3050/download/${TEST_FILENAME}`
    //     console.log(`changing window location to ${TEST_LOCATION}`)
    //     window.location = TEST_LOCATION;


    // }

    return (
        <div className='file-uploader-controller'>
            {/* <input type="button" value="show-me-the-signed-url" onClick={handleShowMeSignedURLBtnClick}/>
            <input type="button" value="test-btn" onClick={handleTestButtonClick}/> */}
            <input type="file" name={KEY.pdf} id={KEY.pdf} accept=".pdf" multiple onChange={handleFileInputChange} />
            {cards.length > 0 && cards}
        </div>
    )
}

export default FileUploaderController;