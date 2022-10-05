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

export { getTitleCaseFromSpaced, getTitleCaseFromCamelCase, doubleCharsRemoved };