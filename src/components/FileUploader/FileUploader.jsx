import React, { useRef } from 'react';
import "./FileUploader.scss";
import { COUNTRIES_OBJ, COUNTRY_OPTIONS_ELEMENTS } from "../../data/statesAndCountries.mjs";
import { getTitleCaseFromCamelCase, doubleCharsRemoved } from '../../data/util.mjs';
import s3Uploader from '../../data/s3Uploader.mjs';
import { getFileCopyWithRandomName } from '../../data/randomFileNameGenerator.mjs';

// keys from the backend 'Profile' Sequelize model (except 'id', since it's auto-incrementing)
const KEY = {
    pdf: 'pdf',
    cohortYear: 'cohortYear',
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
    // const { postProfile, getProfiles, signedIn, getSignedDownloadURL, getSignedUploadURL } = props;
    const { postProfile, getProfiles, getSignedDownloadURL, getSignedUploadURL } = props;

    const pdfEmbedRef = useRef(null);
    const fileInputElementRef = useRef(null);

    const pdfRef = useRef(props.pdf);
    const cohortYearRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const countryRef = useRef(null);
    const cityRef = useRef(null);
    const regionRef = useRef(null);
    const zipCodeRef = useRef(null);
    const keywordsRef = useRef(null);

    const keyRefObj = {
        [KEY.pdf]: pdfRef,
        [KEY.cohortYear]: cohortYearRef,
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
        const postKeys = Object.values(KEY).filter(key => !(NON_POSTED_KEYS.includes(key)));
        let elements = postKeys.map(postKey => {
            const elementRef = keyRefObj[postKey];
            return elementRef.current;
        });

        const values = elements.map(element => {
            let value = element.value || "";
            value = value.replaceAll("_", "-");
            value = value.replaceAll(" ", "-");
            value = doubleCharsRemoved(value.trim(), ["-"]);
            return value;
        });

        const obj = {};
        postKeys.forEach((key, index) => {
            obj[key] = values[index];
        });

        obj[KEY.pdf] = await getPDF();
        console.log("getFormValuesAsObj obj: ", obj);

        return obj;
    }


    const getUploadFileNamePrefix = (formValuesObj) => {
        const { firstName, lastName, city, region, zipCode, country, keywords } = formValuesObj;
        let uploadFileNamePrefix = [firstName, lastName, city, region, zipCode, country].join("_").trim();
        uploadFileNamePrefix = doubleCharsRemoved(uploadFileNamePrefix, [" ", "-"]);
        uploadFileNamePrefix = uploadFileNamePrefix.replaceAll(" ", "-");
        return uploadFileNamePrefix;
    }

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
            const pdf = await getPDF();
            const pdfCopy = getFileCopyWithRandomName(pdf, getUploadFileNamePrefix(formValuesObj));
            console.log("pdfCopy: ", pdfCopy);

            const s3UploadResponse = await s3Uploader.upload(pdfCopy);
            // const signedUploadURL = await getSignedUploadURL(pdfCopy.name);
            // const s3UploadResponse = await s3Uploader.upload(pdfCopy, signedUploadURL);


            console.log("s3UploadResponse: ", s3UploadResponse);

            formValuesObj["s3FileName"] = pdfCopy.name;

            const mysqlPostResponse = await postProfile(formValuesObj);
            console.log("mysqlPostResponse: ", mysqlPostResponse);

            const profiles = await getProfiles();
            console.log("profiles: ", profiles);
        }

        // if (alertMsg) {
        //     alert(alertMsg);
        // } else {
        //     if (!signedIn) {
        //         alert("You must be signed in to upload a pdf")
        //     } else {
        //         const pdf = await getPDF();
        //         const pdfCopy = getFileCopyWithRandomName(pdf, getUploadFileNamePrefix(formValuesObj));
        //         console.log("pdfCopy: ", pdfCopy);

        //         const s3UploadResponse = await s3Uploader.upload(pdfCopy);
        //         // const signedUploadURL = await getSignedUploadURL(pdfCopy.name);
        //         // const s3UploadResponse = await s3Uploader.upload(pdfCopy, signedUploadURL);


        //         console.log("s3UploadResponse: ", s3UploadResponse);

                

        //         formValuesObj["s3FileName"] = pdfCopy.name;

        //         const mysqlPostResponse = await postProfile(formValuesObj);
        //         console.log("mysqlPostResponse: ", mysqlPostResponse);

        //         const profiles = await getProfiles();
        //         console.log("profiles: ", profiles);
        //     }
        // }
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

    const assertValidKey = (key) => {
        if (!Object.values(KEY).includes(key)) {
            throw new Error(`invalid key: ${key}`);
        }        
    }

    const getRefElement = (key) => {
        assertValidKey(key);
        return keyRefObj[key].current;
    }

    const isRefEvent = (key, event) => {
        return getRefElement(key) === event.target;
    }

    const handleOptionSelected = (event) => {
        const element = event.target;
        const value = element.value;
        if (isRefEvent(KEY.country, event)) {
            const country = value;
            const regionElement = getRefElement(KEY.region);
            regionElement.style.display = value ? "inline-block" : "none";

            if (value) {
                regionElement.options.length = 0;
                const regions = COUNTRIES_OBJ[country].regions;
                regionElement.options[0] = new Option(COUNTRIES_OBJ[country].regionAlias, "", true);

                regions.forEach((region, index) => {
                    regionElement.options[index + 1] = new Option(region, region);
                });
            }
        }
    }

    const getNewSelectElement = (key, optionsElements, isRequired = true) => {
        const optionsWithDisabledDefault = (
            <>
                <option disabled={false} value="">{getPlaceholder(key)} </option>
                {optionsElements}
            </>
        )

        let selectElement = null;

        if (isRequired) {
            selectElement = (<select ref={keyRefObj[key]} name={key} className={key} onChange={handleOptionSelected} required>{optionsWithDisabledDefault}</select>)
        } else {
            selectElement = (<select ref={keyRefObj[key]} name={key} className={key} onChange={handleOptionSelected}> {optionsWithDisabledDefault}</select>)
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

    const getYearRangeOptions = (minYear, maxYear) => {
        if (maxYear <= minYear) {
            throw new Error(`maxYear (${maxYear}) not greater than minYear (${minYear})`);
        }
        const diff = maxYear - minYear;
        const years = [];

        for (let i=0; i<diff; i++) {
            years.push(minYear + i);
        }

        const yearOptions = years.map((year, index) => {
            const yearStr = String(year);
            return <option disabled={false} value={yearStr} key={index}>{yearStr}</option>
        })

        return yearOptions;
    }

    const getChildComponentTreeAndSetProperties = () => {
        const childComponents = (
            <>
                <h5>Profile Details</h5>
                <form className='file-upload-form'>
                    {getNewFileInputElement()}
                    
                    <>
                        <div className="row cohort-row">
                            {getNewSelectElement(KEY.cohortYear, getYearRangeOptions(2019, 2023))}
                        </div>

                        <div className="row name-row">
                            {getNewTextInputElement(KEY.firstName)}
                            {getNewTextInputElement(KEY.lastName)}
                        </div>

                        <div className="row location-row">
                            {getNewSelectElement(KEY.country, COUNTRY_OPTIONS_ELEMENTS)}
                            {getNewTextInputElement(KEY.city)}
                            {/* {getNewSelectElement(KEY.region, STATE_OPTIONS_ELEMENTS)} */}
                            {getNewSelectElement(KEY.region, [])}
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