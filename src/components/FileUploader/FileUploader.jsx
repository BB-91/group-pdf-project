import React from 'react';
import "./FileUploader.scss";

const FileUploader = () => {

    const handleSubmitButtonClick = (event) => {
        event.preventDefault();
        console.log("Submit button clicked.")
    }

    return (
        <div className='file-uploader'>
            <form id='file-upload-form'>
                <h1>Upload a profile PDF</h1>
                <input type="file" name="file-input" id="file-input" accept=".pdf" />
                <input type="text" name="file-comments" id="file-comments" placeholder="File Comments" />
                <button type="submit" onClick={handleSubmitButtonClick}>Upload File</button>
            </form>
        </div>
    )
}

export default FileUploader;