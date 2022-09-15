import React, { useRef } from 'react';
import "./FileUploader.scss";
import { COUNTRY_OPTIONS_ELEMENTS, STATE_OPTIONS_ELEMENTS } from "../../data/statesAndCountries.mjs";
import { getTitleCaseFromCamelCase } from '../../data/util.mjs';
// var pdf2img = require('pdf-img-convert');
// import pdf2img from "pdf-img-convert";

// keys from the backend 'Profile' Sequelize model (except 'id', since it's auto-incrementing)
const KEY = {
    pdf: 'pdf',
    firstName: 'firstName',
    lastName: 'lastName',
    country: 'country',
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

    const pdfRef = useRef(null);
    const pdfUrlRef = useRef('');
    const pdfEmbedRef = useRef(null);

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

            const pdf = await getPDF();
            if (pdf) {
                pdfRef.current = pdf;
                console.log("pdf: ", pdf);
    
                console.log("pdf instanceof File: ", pdf instanceof File);
                console.log("pdf instanceof Blob: ", pdf instanceof Blob);
                console.log("testing file download.");
                
                const pdfUrl = URL.createObjectURL(pdf);
                console.log("pdfUrl: ", pdfUrl)
                pdfUrlRef.current = pdfUrl;

                const link = document.createElement("a");
                link.download = "test_pdf_thumbnail_image.pdf";
                link.href = pdfUrl;
                link.click();
                URL.revokeObjectURL(pdfUrl);

                const fileReader = new FileReader();

                fileReader.addEventListener("load", () => {
                    pdfEmbedRef.current.setAttribute("src", fileReader.result);
                  }, false);


                fileReader.readAsDataURL(pdf);
            }


            

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

    const getNewTextInputElement = (key, placeholderSuffix = "", isRequired = true) => {
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
                <input type="file" name={KEY.pdf} id={KEY.pdf} accept=".pdf"/>
                
                <div id="name-row" className="row">
                    {getNewTextInputElement(KEY.firstName)}
                    {getNewTextInputElement(KEY.lastName)}
                </div>

                <div id="location-row" className="row">
                    {getNewSelectElement(KEY.country, COUNTRY_OPTIONS_ELEMENTS)}
                    {getNewTextInputElement(KEY.city)}
                    {getNewSelectElement(KEY.state, STATE_OPTIONS_ELEMENTS)}
                    {getNewTextInputElement(KEY.zipCode)}
                    <embed ref={pdfEmbedRef} src='' type="application/pdf" width="70px" height="90px"/>

                </div>

                {getNewTextInputElement(KEY.keywords, " (comma-separated)")}
                <button type="submit" onClick={handleSubmitButtonClick}>Upload</button>
            </form>
        </div>
    )
}

export default FileUploader;