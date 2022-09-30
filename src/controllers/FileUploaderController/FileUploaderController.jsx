import React, { useRef, useState } from 'react';
import FileUploader from '../../components/FileUploader/FileUploader';
import "./FileUploaderController.scss";

const KEY = {
    pdf: 'pdf',
}

const FileUploaderController = (props) => {
    const [cards, setCards] = useState([])
    const { postProfile, getProfiles, getAwsFileNames, getAwsFile, getAwsSignedURL, signedIn } = props;
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
            return <FileUploader postProfile={postProfile} getProfiles={getProfiles} pdf={pdf} key={index} signedIn={signedIn}/>
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
    }

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