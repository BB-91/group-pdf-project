import React, { useRef } from 'react';
import "./FileUploader.scss";
import { STATE_OPTIONS_ELEMENTS } from "../../data/alphabeticalStates.mjs";
import { getTitleCaseFromCamelCase } from '../../data/util.mjs';

const KEY = {
    pdf: 'pdf',
    firstName: 'firstName',
    lastName: 'lastName',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    keywords: 'keywords',
}

const OPTIONAL_KEYS = [KEY.keywords];

const getPlaceholder = (key) => {
    return getTitleCaseFromCamelCase(key);
}

const bulletedList = (strings, symbol = "•") => {
    return strings.map(str => `${symbol} ${str}`).join("\n")
}

const getPDF = async () => {
    const pdfs = await document.getElementById(KEY.pdf).files;
    if (pdfs) {
        return pdfs[0];
    }
}

const PLACEHOLDER = {
    pdf: getPlaceholder(KEY.pdf),
    firstName: getPlaceholder(KEY.firstName),
    lastName: getPlaceholder(KEY.lastName),
    city: getPlaceholder(KEY.city),
    state: getPlaceholder(KEY.state),
    zipCode: getPlaceholder(KEY.zipCode),
    keywords: getPlaceholder(KEY.keywords),    
}



const FileUploader = (props) => {
    const { postProfile, getProfiles } = props;

    const getFormValuesAsObj = async () => {
        const keys = Object.values(KEY);
        const elements = keys.map(key => document.getElementById(key));
        const values = elements.map(element => element.value);
        const obj = {};
        keys.forEach((key, index) => {
            obj[key] = values[index];
        });

        obj[KEY.pdf] = await getPDF();
        obj[KEY.zipCode] = parseInt(values[keys.indexOf(KEY.zipCode)])
        return obj;
    }

    const handleSubmitButtonClick = async (event) => {
        event.preventDefault();
        console.log("Submit button clicked.")
        const formValuesObj = await getFormValuesAsObj();
        console.log("formValuesObj: ", formValuesObj);

        const zipCode = formValuesObj[KEY.zipCode];
        const zipCodeStr = String(zipCode);

        const keysWithUndefinedValues = [];
        Object.keys(formValuesObj).forEach(key => {
            const value = formValuesObj[key];
            if (value === "" || value === undefined || value == null) {
                if (!OPTIONAL_KEYS.includes(key)) {
                    keysWithUndefinedValues.push(key);
                }
            }
        })

        if (keysWithUndefinedValues.length) {
            const placeholders = keysWithUndefinedValues.filter(key => key !== KEY.pdf).map(key => PLACEHOLDER[key]);
            let alertMsg = "";

            const pdf = await getPDF()
            console.log("pdf: ", pdf);

            if (keysWithUndefinedValues.includes(KEY.pdf)) {
                alertMsg += "Please upload a profile PDF.\n\n"
            }
            if (placeholders.length) {
                alertMsg += `Please fill out required fields:\n${bulletedList(placeholders)}`
            }
            alertMsg = alertMsg.trimEnd();
            alert(alertMsg)
        } else if (isNaN(zipCode) || zipCodeStr.length !== 5) {
            alert("Please enter a 5-digit zip code");
        } else {
            console.log("formValuesObj: ", formValuesObj);
            const postResponse = await postProfile(formValuesObj);
            console.log("postResponse: ", postResponse);
            const profiles = await getProfiles();
            console.log("profiles: ", profiles);
        }
    }

    return (
        <div className='file-uploader'>
            <h5>Upload a profile PDF</h5>
            <form id='file-upload-form'>
                <input type="file" name={KEY.pdf} id={KEY.pdf} accept=".pdf" />
                
                <div id="name-row" className="row">
                    <input type="text" name={KEY.firstName} id={KEY.firstName} placeholder={PLACEHOLDER.firstName} required />
                    <input type="text" name={KEY.lastName} id={KEY.lastName} placeholder={PLACEHOLDER.lastName} required />
                </div>

                <div id="location-row" className="row">
                    <input type="text" name={KEY.city} id={KEY.city} placeholder={PLACEHOLDER.city} required />
                    <select name={KEY.state} id={KEY.state} required>
                        <option disabled={false} value=""> State </option>
                        {STATE_OPTIONS_ELEMENTS}
                    </select>
                    <input type="text" name={KEY.zipCode} id={KEY.zipCode} placeholder={PLACEHOLDER.zipCode} required />
                </div>

                <input type="text" name={KEY.keywords} id={KEY.keywords} placeholder={PLACEHOLDER.keywords + " (comma-separated)"} />
                <button type="submit" onClick={handleSubmitButtonClick}>Upload</button>
            </form>
        </div>
    )
}

export default FileUploader;