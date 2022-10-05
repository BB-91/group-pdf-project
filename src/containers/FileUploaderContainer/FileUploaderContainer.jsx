import React, { useRef, useState } from 'react';
import FileUploader from '../../components/FileUploader/FileUploader';
import "./FileUploaderContainer.scss";

const KEY = {
    pdf: 'pdf',
}

const FileUploaderContainer = (props) => {
    const [cards, setCards] = useState([])
    const { postProfile, getProfiles, getSignedDownloadURL, getSignedUploadURL } = props;
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
            return (
                <FileUploader
                    postProfile={postProfile}
                    getProfiles={getProfiles}
                    pdf={pdf}
                    key={index}
                    getSignedDownloadURL={getSignedDownloadURL}
                    getSignedUploadURL={getSignedUploadURL}
                />
            )

        })   
    }   

    const handleFileInputChange = async (event) => {
        const controllerFileInputElement = event.target;
        controllerFileInputRef.current = controllerFileInputElement;
        const pdfs = await getPDFs();
        const profileCards = getProfileCardsFromPDF(pdfs);
        setCards(profileCards);
    }

    return (
        <div className='file-uploader-container'>
            <div className='upload-wrapper'>
                <label htmlFor={KEY.pdf} className="custom-file-upload">
                    Upload Profile PDF
                </label>
                <input type="file" name={KEY.pdf} id={KEY.pdf} accept=".pdf" multiple onChange={handleFileInputChange} />
            </div>
            <div className="upload__card">
            {cards.length > 0 && cards}
            </div>
        </div>
    )
}

export default FileUploaderContainer;