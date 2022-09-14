import React, { useRef } from 'react';
import "./FileUploader.scss";
import { STATE_OPTIONS_ELEMENTS } from "../../data/alphabeticalStates.mjs";
import { getTitleCaseFromCamelCase } from '../../data/util.mjs';

// keys from the backend 'Profile' Sequelize model (except 'id', since it's auto-incrementing)
const KEY = {
    pdf: 'pdf',
    firstName: 'firstName',
    lastName: 'lastName',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    keywords: 'keywords',
}

const OPTIONAL_KEYS = [KEY.keywords]; // 'allowNull: true' in Sequelize model

const getPlaceholder = (key) => {
    return getTitleCaseFromCamelCase(key);
}

const bulletedList = (strings, symbol = "•") => {
    return strings.map(str => `${symbol} ${str}`).join("\n")
}

// file uploader allows selecting multiple files, saved as an array. pdfs[0] is the first file selected.
const getPDF = async () => {
    const pdfs = await document.getElementById(KEY.pdf).files;
    if (pdfs) {
        return pdfs[0];
    }
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
            const placeholders = keysWithUndefinedValues.filter(key => key !== KEY.pdf).map(key => getPlaceholder(key));
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

    const getNewTextInputElement = (key, isRequired = true, placeholderSuffix = "") => {
        const suffixedPlaceholder = getPlaceholder(key) + placeholderSuffix;
        if (isRequired) {
            return <input type="text" name={key} id={key} placeholder={suffixedPlaceholder} required />
        } else {
            return <input type="text" name={key} id={key} placeholder={suffixedPlaceholder} />
        }
    }

    const getNewSelectElement = (key, optionsElements, isRequired = true) => {
        const optionsWithDisabledDefault = (
            <>
                <option disabled={false} value="">{getPlaceholder(key)}</option>
                {optionsElements}
            </>
        )

        if (isRequired) {
            return (<select name={key} id={key} required>{optionsWithDisabledDefault}</select>)
        } else {
            return (<select name={key} id={key}>{optionsWithDisabledDefault}</select>)
        }
    }

    return (
        <div className='file-uploader'>
            <h5>Upload a profile PDF</h5>
            <form id='file-upload-form'>
                <input type="file" name={KEY.pdf} id={KEY.pdf} accept=".pdf" />
                
                <div id="name-row" className="row">
                    {getNewTextInputElement(KEY.firstName)}
                    {getNewTextInputElement(KEY.lastName)}
                </div>

                <div id="location-row" className="row">
                    {getNewTextInputElement(KEY.city)}
                    {getNewSelectElement(KEY.state, STATE_OPTIONS_ELEMENTS)}
                    {getNewTextInputElement(KEY.zipCode)}
                </div>

                {getNewTextInputElement(KEY.keywords, true, " (comma-separated)")}
                <button type="submit" onClick={handleSubmitButtonClick}>Upload</button>
            </form>
        </div>
    )
}

export default FileUploader;