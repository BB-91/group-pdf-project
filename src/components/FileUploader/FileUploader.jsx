import React from 'react';
import "./FileUploader.scss";

const FileUploader = () => {

    const handleSubmitButtonClick = (event) => {
        event.preventDefault();
        console.log("Submit button clicked.")
    }

    return (
        <div className='file-uploader'>
            <form className='file-upload-form'>
                <h1>Upload a profile PDF</h1>
                {/* <input type="text" name="file-comments" id="file-comments" placeholder="File Comments" /> */}
                <input className='name_input' type="text" name="name" placeholder="Name on Profile" />
                {/* <div className="dropdown">
                    <button className="dropbtn">Location</button>
                    <div id="myDropdown" className="dropdown-content" onClick={addShowClassToDropDown}>
                        <p>USA</p>
                        <p>UK</p>
                        <p>AUS</p>
                    </div>
                </div> */}
                <input type="file" name="file-input" id="file-input" accept=".pdf" />
                <button className='submit_button' type="submit" onClick={handleSubmitButtonClick}>Upload File</button>
            </form>
        </div>
    )
}

export default FileUploader;