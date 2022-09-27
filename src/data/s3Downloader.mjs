// import { serverURL } from "./serverData.mjs";
import { serverURL } from "./s3ServerData.mjs";
import validExtensions from "./validExtensions.mjs";

class S3Downloader {
    #serverURL = serverURL;

    /**
     * @returns {String[]} returns an array of all filenames in s3 bucket
     */
    async #getS3FileNames() {
        const s3FileNames = await fetch(this.#serverURL + "/list").then(res => { return res.json(); })
        return s3FileNames;
    }

    /**
     * @param {Response} response - response from fetch GET request
     * @param {String} saveAsName - name to save file as
     */
     async #downloadFileFromFetchResponse(fetchResponse, saveAsName) {
        if (!saveAsName) {
            throw new Error(`Recieved no 'saveAsName' arg`);
        } else if (typeof saveAsName !== "string") {
            throw new Error(`Not a string: ${saveAsName}`)
        }
    
        if (!fetchResponse) {
            throw new Error(`fetchResponse is null or undefined: ${fetchResponse}`) 
        } else if (!(fetchResponse instanceof Response)) {
            throw new Error(`Not an instance of Response: ${fetchResponse}`);
        } else {
            const blob = await fetchResponse.blob();
            const newBlob = new Blob([blob]);
            const blobUrl = window.URL.createObjectURL(newBlob);
        
            const link = document.createElement('a');
            link.href = blobUrl;
            link.setAttribute('download', saveAsName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            return true;
        }
    }

    /**
     * @param {String} filename - name of s3 file
     */
    async download(filename) {
            
        const getExampleFilenamesWithExtensions = () => {
            return validExtensions.slice(0, 3).map(extension => filename + extension);
        }
    
        if (!filename) {
            alert("Please enter a filename");
        } else if (!filename.includes(".")) {
            alert(`Please enter extension (i.e., ${getExampleFilenamesWithExtensions().join(", ")})`);
        } else {
            const s3Filenames = await this.#getS3FileNames();
            if (!s3Filenames.includes(filename)) {
                alert(`Invalid filename: '${filename}'\nCheck spelling and extension, then try again.`);
            } else {
                const response = await fetch(this.#serverURL + "/download/" + filename);
                const downloadSucceeded = await this.#downloadFileFromFetchResponse(response, filename);
                if (!downloadSucceeded) {
                    throw new Error(`Failed to download ${filename}`);
                }
            }
        }
    }
}

const s3Downloader = new S3Downloader();

export default s3Downloader;