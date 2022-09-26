import React, { useRef } from 'react';
import "./FileUploader.scss";
import { COUNTRY_OPTIONS_ELEMENTS, STATE_OPTIONS_ELEMENTS } from "../../data/statesAndCountries.mjs";
import { getTitleCaseFromCamelCase } from '../../data/util.mjs';
// import { downloadFile } from '../../data/util.mjs';

// keys from the backend 'Profile' Sequelize model (except 'id', since it's auto-incrementing)
const KEY = {
    pdf: 'pdf',
    firstName: 'firstName',
    lastName: 'lastName',
    country: 'country',
    city: 'city',
    region: 'region',
    zipCode: 'zipCode',
    keywords: 'keywords',
}

const NON_POSTED_KEYS = [KEY.pdf];
const OPTIONAL_KEYS = [KEY.zipCode, KEY.keywords]; // 'allowNull: true' in Sequelize model

const getPlaceholder = (key) => {
    return getTitleCaseFromCamelCase(key);
}

const bulletedList = (strings, symbol = "•") => {
    return strings.map(str => `${symbol} ${str}`).join("\n")
}

const FileUploader = (props) => {
    const { postProfile, getProfiles } = props;

    const pdfEmbedRef = useRef(null);
    const fileInputElementRef = useRef(null);

    const pdfRef = useRef(props.pdf);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const countryRef = useRef(null);
    const cityRef = useRef(null);
    const regionRef = useRef(null);
    const zipCodeRef = useRef(null);
    const keywordsRef = useRef(null);

    const keyRefObj = {
        [KEY.pdf]: pdfRef,
        [KEY.firstName]: firstNameRef,
        [KEY.lastName]: lastNameRef,
        [KEY.country]: countryRef,
        [KEY.city]: cityRef,
        [KEY.region]: regionRef,
        [KEY.zipCode]: zipCodeRef,
        [KEY.keywords]: keywordsRef,
    }


    const getPDF = async () => {
        const fileInputElement = fileInputElementRef.current;

        if (!fileInputElement) {
            if (!pdfRef.current) {
                throw new Error("fileInputElement and pdfRef.current are undefined/null");
            } else {
                return pdfRef.current;
            }

        } else {
            const pdfs = await fileInputElement.files;
            if (pdfs) {
                return pdfs[pdfs.length - 1]; // get the most recently uploaded file
            }
        }
    }

    const getFormValuesAsObj = async () => {
        const keys = Object.values(KEY);
        // const postKeys = keys.filter(key => !(NON_POSTED_KEYS.includes(key)));
        let elements = Object.values(keyRefObj).map(ref => ref.current);
        const values = elements.map(element => {
            let value = element.value || "";
            return value.trim();
        });

        console.log("values: ", values)

        const obj = {};
        keys.forEach((key, index) => {
            obj[key] = values[index];
        });

        obj[KEY.pdf] = await getPDF();
        console.log("getFormValuesAsObj obj: ", obj);

        return obj;
    }


    // const getFormValuesAsObj = async () => {
    //     const keys = Object.values(KEY);
    //     let elements = Object.values(keyRefObj).map(ref => ref.current);
    //     console.log("elements before filter: ", elements);
    //     // elements = elements.filter(element => element.value)
    //     elements = elements.filter(element => element.value)
    //     console.log("elements after filter: ", elements);

    //     const values = elements.map(element => element.value.trim());
    //     const obj = {};
    //     keys.forEach((key, index) => {
    //         obj[key] = values[index];
    //     });

    //     obj[KEY.pdf] = await getPDF();
    //     console.log("getFormValuesAsObj obj: ", obj);

    //     return obj;
    // }


    const handleSubmitButtonClick = async (event) => {
        event.preventDefault();
        const formValuesObj = await getFormValuesAsObj();
        const keysWithUndefinedValues = [];

        Object.keys(formValuesObj).forEach(key => {
            const value = formValuesObj[key];
            if (value === "" || value === undefined || value == null) {
                if (!OPTIONAL_KEYS.includes(key)) {
                    keysWithUndefinedValues.push(key);
                }
            }
        })


        let alertMsg = "";

        if (keysWithUndefinedValues.length) {
            const placeholders = keysWithUndefinedValues.filter(key => key !== KEY.pdf).map(key => getPlaceholder(key));
            
            if (keysWithUndefinedValues.includes(KEY.pdf)) {
                alertMsg += "Please upload a profile PDF.\n\n"
            }
            if (placeholders.length) {
                alertMsg += `Please fill out required fields:\n${bulletedList(placeholders)}`
            }
        }
        
        if (alertMsg) {
            alert(alertMsg);
        } else {
            const postResponse = await postProfile(formValuesObj);
            const profiles = await getProfiles();

            console.log("postResponse: ", postResponse);
            console.log("profiles: ", profiles);

            // const TEST_PDF = profiles[0].pdf;
            // downloadFile(TEST_PDF, "TEST_PDF.pdf");
        }
    }


    const showForm = async () => {
        const pdf = await getPDF();
        if (pdf) {
            pdfRef.current = pdf;
            const fileReader = new FileReader();

            fileReader.addEventListener("load", () => {
                const embedElement = pdfEmbedRef.current;
                if (embedElement && embedElement instanceof HTMLElement) {
                    embedElement.setAttribute("src", fileReader.result);
                }
                }, false);


            fileReader.readAsDataURL(pdf);
        }
    }

    const handleFileInputChange = async (event) => {
        fileInputElementRef.current = event.target;
        showForm();
    }


    const getNewTextInputElement = (key, placeholderSuffix = "", isRequired = true) => {
        const suffixedPlaceholder = getPlaceholder(key) + placeholderSuffix;
        let textInputElement = null;

        if (isRequired) {
            textInputElement = <input ref={keyRefObj[key]} type="text" name={key} className={key} placeholder={suffixedPlaceholder} required />
        } else {
            textInputElement = <input ref={keyRefObj[key]} type="text" name={key} className={key} placeholder={suffixedPlaceholder} />
        }

        return textInputElement;
    }

    const getNewSelectElement = (key, optionsElements, isRequired = true) => {
        const optionsWithDisabledDefault = (
            <>
                <option disabled={false} value="">{getPlaceholder(key)}</option>
                {optionsElements}
            </>
        )

        let selectElement = null;

        if (isRequired) {
            selectElement = (<select ref={keyRefObj[key]} name={key} className={key} required>{optionsWithDisabledDefault}</select>)
        } else {
            selectElement = (<select ref={keyRefObj[key]} name={key} className={key}>{optionsWithDisabledDefault}</select>)
        }

        return selectElement;
    }

    const getNewFileInputElement = () => { // REACT ELEMENT VERSION
        const fileInputElement = <input ref={keyRefObj[KEY.pdf]} type="file" name={KEY.pdf} className={KEY.pdf} accept=".pdf" onChange={handleFileInputChange} />;
        if (!pdfRef.current) { throw new Error(`pdfRef not set`); }
        return fileInputElement;
    }


    const getNewEmbedElement = () => {
        const embedElement = <embed ref={element => pdfEmbedRef.current = element} src='' type="application/pdf" width="70px" height="90px"/>
        pdfEmbedRef.current = embedElement;
        showForm();
        return embedElement;
    }

    const getChildComponentTreeAndSetProperties = () => {
        const childComponents = (
            <>
                <h5>Upload a profile PDF</h5>
                <form className='file-upload-form'>
                    {getNewFileInputElement()}
                    
                    <>
                        <div className="row name-row">
                            {getNewTextInputElement(KEY.firstName)}
                            {getNewTextInputElement(KEY.lastName)}
                        </div>

                        <div className="row location-row">
                            {getNewSelectElement(KEY.country, COUNTRY_OPTIONS_ELEMENTS)}
                            {getNewTextInputElement(KEY.city)}
                            {getNewSelectElement(KEY.region, STATE_OPTIONS_ELEMENTS)}
                            {getNewTextInputElement(KEY.zipCode)}
                            {getNewEmbedElement()}
                        </div>

                        {getNewTextInputElement(KEY.keywords, " (comma-separated)")}
                        <button type="submit" onClick={handleSubmitButtonClick}>Upload</button>                    
                    </>
                    
                </form>
            </>
        )
        return childComponents;

    }

    return (
        <div className='file-uploader'>
            {getChildComponentTreeAndSetProperties()}
            
        </div>
    )
}

export default FileUploader;