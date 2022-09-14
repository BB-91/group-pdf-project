import React from 'react';
import "./FileUploader.scss";
import { STATE_OPTIONS_ELEMENTS } from "../../data/alphabeticalStates.mjs";

const FileUploader = () => {

    const handleSubmitButtonClick = (event) => {
        event.preventDefault();
        console.log("Submit button clicked.")
    }

    // body: {firstName: <str>, lastName: <str>, city: <str>, state: <str>, zipCode: <int>, keywords: <arr?>,}

    return (
        <div className='file-uploader'>
            <h5>Upload a profile PDF</h5>
            <form id='file-upload-form'>
                <input type="file" name="file-input" id="file-input" accept=".pdf" />
                
                <div id="name-row" className="row">
                    <input type="text" name="first-name" id="first-name" placeholder="First Name" required />
                    <input type="text" name="last-name" id="last-name" placeholder="Last Name" required />
                </div>

                <div id="location-row" className="row">
                    <input type="text" name="city" id="city" placeholder="City" required />
                    <select name="state" id="state" required>
                        <option disabled={false} value=""> State </option>
                        {STATE_OPTIONS_ELEMENTS}
                    </select>
                    <input type="text" name="zip-code" id="zip-code" placeholder="Zip Code" required />
                </div>

                <input type="text" name="keywords" id="keywords" placeholder="Keywords (comma-separated)" />
                <button type="submit" onClick={handleSubmitButtonClick}>Upload File</button>
            </form>
        </div>
    )
}

export default FileUploader;