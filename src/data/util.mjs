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

export { getTitleCaseFromSpaced, getTitleCaseFromCamelCase };