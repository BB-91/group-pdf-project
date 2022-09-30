
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Get a random filename for use in uploading to S3 bucket to prevent file overwrites where 2 files have same name.
// (Alternative to S3 bucket file versioning)

const SECTION = {
    MIN_LENGTH: 4,
    MAX_LENGTH: 5,
    COUNT: 2,
}

// const SECTION = {
//     MIN_LENGTH: 4,
//     MAX_LENGTH: 8,
//     COUNT: 6,
// }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}



function getRandomHexChar() {
    const HEX_CHARS = "0123456789abcdef";
    const randomHexIndex = getRandomInt(0, 16);
    return HEX_CHARS.charAt(randomHexIndex);
}

function getRandomHexString() {
    const length = getRandomInt(SECTION.MIN_LENGTH, SECTION.MAX_LENGTH);
    let randomHexStr = "";
    for (let i = 0; i < length; i++) {
        randomHexStr += getRandomHexChar();
    }
    return randomHexStr;
}

const assertFile = (file) => {
    if (!file || !(file instanceof File)) {
        throw new Error(`null/undefined or not a File: ${file}`);
    }
}

const getFileName = (file) => {
    assertFile(file);
    return file.name;
}

const getFileExtension = (file) => {
    const fileName = getFileName(file);
    const extension = fileName.split('.').pop();
    if (!extension.length) {
        throw new Error(`Invalid extension '${extension}' for file name: ${fileName}`);
    }
    return '.' + extension;
}


const getRandomFileName = (prefix, extension) => {
    const sectionCount = SECTION.COUNT;

    if (!extension || typeof extension !== "string") {
        throw new Error(`Invalid extension: '${extension}'`);
    }

    if (!sectionCount || typeof sectionCount !== "number") {
        throw new Error(`Invalid sectionCount: '${sectionCount}'`);
    }

    const randomHexSections = [];
    for (let i = 0; i < sectionCount; i++) {
        const randomHexString = getRandomHexString();
        randomHexSections.push(randomHexString);
    }

    let randomFileName = randomHexSections.join('-') + extension;
    if (prefix) {
        randomFileName = prefix + '---' + randomFileName;
    }

    return randomFileName;
}

const getRandomFileNameFromFile = (file, prefix) => {
    const extension = getFileExtension(file);
    return getRandomFileName(prefix, extension);
}


const getFileCopyWithRandomName = (file, prefix) => {
    const randomFilename = getRandomFileNameFromFile(file, prefix);
    const fileCopy = new File([file], randomFilename, {
        type: file.type,
        lastModified: file.lastModified
    });

    return fileCopy;
}

export { getFileCopyWithRandomName };