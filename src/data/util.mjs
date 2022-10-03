// import { Buffer } from "node:buffer";

const getTitleCaseFromSpaced = (str) => {
    let titleCase = str.replaceAll(/ ([a-zA-Z])/g, (match, p1 ) => " " + p1.toUpperCase());
    titleCase = titleCase.replace(/^(.)/, (match, p1 ) => p1.toUpperCase());
    return titleCase;
}

const getTitleCaseFromCamelCase = (str) => {
    let titleCase = str.replaceAll(/([A-Z])/g, (match, p1 ) => " " + p1);
    titleCase = titleCase.replace(/^(.)/, (match, p1 ) => p1.toUpperCase());
    return titleCase;
}

const doubleCharsRemoved = (str, doubledChars) => {
    if (!Array.isArray(doubledChars)) {
        throw new Error(`Not an array: ${doubledChars}`);
    }

    let fStr = str;

    doubledChars.forEach(char => {
        if (char.length !== 1) {
            throw new Error(`Not a 1-char string: ${char}`)
        }
        const doubledChar = char + char;
        
        while (fStr.includes(doubledChar)) {
            fStr = fStr.replaceAll(doubledChar, char);
        }
    })

    return fStr;
}


// const downloadFile = (dbObj, downloadedFileName) => {
//     console.log("dbObj: ", dbObj)
//     console.log("dbObj instanceof Blob: ", dbObj instanceof Blob);
//     console.log("dbObj instanceof File: ", dbObj instanceof File);
//     console.log("dbObj instanceof ArrayBuffer: ", dbObj instanceof ArrayBuffer);

//     const buffer = dbObj.data;

//     console.log("buffer: ", buffer);
//     console.log("buffer instanceof Blob: ", buffer instanceof Blob);
//     console.log("buffer instanceof File: ", buffer instanceof File);
//     console.log("buffer instanceof ArrayBuffer: ", buffer instanceof ArrayBuffer);

//     const blob = new Blob([buffer], {type: "application/pdf"});

//     console.log("blob: ", blob);
//     console.log("blob instanceof Blob: ", blob instanceof Blob);
//     console.log("blob instanceof File: ", blob instanceof File);
//     console.log("blob instanceof ArrayBuffer: ", blob instanceof ArrayBuffer);

//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.download = downloadedFileName;
//     link.href = url;
//     link.click();
//     URL.revokeObjectURL(url);
// }

// export { getTitleCaseFromSpaced, getTitleCaseFromCamelCase, downloadFile };
export { getTitleCaseFromSpaced, getTitleCaseFromCamelCase, doubleCharsRemoved };