import React from 'react';
import "./FileUploader.scss";
import {useState} from "react"

const FileUploader = () => {

    const [showClass, setShowClass] = useState(false)

    const handleSubmitButtonClick = (event) => {
        event.preventDefault();
        console.log("Submit button clicked.")
    
    const addShowClassToDropDown = () => {
        setShowClass(!showClass)
    }

    }

    return (
        <div className='file-uploader'>
            <form id='file-upload-form' name="form">
                <h1>Upload a profile PDF</h1>
                <input type="file" name="file-input" id="file-input" accept=".pdf" />
                {/* <input type="text" name="file-comments" id="file-comments" placeholder="File Comments" /> */}
                <input type="text" name="name" placeholder="Name on Profile" />
                {/* <div className="dropdown">
                    <button className="dropbtn">Location</button>
                    <div id="myDropdown" className="dropdown-content" onClick={addShowClassToDropDown}>
                        <p>USA</p>
                        <p>UK</p>
                        <p>AUS</p>
                    </div>
                </div> */}
                <button type="submit" onClick={handleSubmitButtonClick}>Upload File</button>
            </form>
        </div>
    )
}

export default FileUploader;