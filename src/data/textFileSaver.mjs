/**
 * 
 * @param {String[]} headers column headers
 * @param {Array<String[]>} rows Array of string[]
 * @param {String} filename name of saved file
 * @returns 
 */
 const _saveAs = (headers, rows, filename, extension) => {
    console.log(`DEBUGGING INSIDE _saveAs`)
    console.log("headers: ", headers);
    console.log("filename: ", filename);
    console.log("extension: ", extension);

    let delimiter = ','

    switch (extension) {
        case '.csv':
            delimiter = ",";
            break;
        case '.tsv':
            delimiter = "\t";
            break;
        default:
            throw new Error(`Invalid extension: ${extension}`); 
    }


    let fileText = headers.join(delimiter);
    filename = filename.split('.')[0] // remove extension from filename if provided

    if (!extension) {
        throw new Error(`Must provide an extension (.csv, .tsv, etc.)`)
    }

    rows.forEach(row => {
        fileText += '\n' + row.join(delimiter);
    })

    var blob = new Blob([fileText],
        { type: "text/plain;charset=utf-8" });

    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', filename + extension);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    return true;
}

const saveCSV = (headers, rows, filename) => {
    _saveAs(headers, rows, filename, '.csv');
}

const saveTSV = (headers, rows, filename) => {
    _saveAs(headers, rows, filename, '.tsv');
}

export { saveCSV, saveTSV };