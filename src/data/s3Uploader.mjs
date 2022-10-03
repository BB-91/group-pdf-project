// import { serverURL } from "./s3ServerData.mjs";
import { serverURL } from "./s3ServerData.mjs";

class S3Uploader {
    #serverURL = serverURL;
    // #s3PresignedURL = "";

    // constructor(s3PresignedURL) {
    //     this.#s3PresignedURL = s3PresignedURL;
    // }

    // async upload(file, s3PresignedURL) {
    async upload(file) {
        // if (!s3PresignedURL) {
        //     throw new Error("Must use a presigned s3 URL");
        // }
        const formData = new FormData();
        formData.append("file", file);
        const uploadResponse = await fetch(`${this.#serverURL}/upload`, {
        // const uploadResponse = await fetch(`${s3PresignedURL}/upload`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Length': '<calculated when request is sent>',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },
            body: formData
        })

        console.log("uploadResponse: ", uploadResponse)
    }
}


const s3Uploader = new S3Uploader();
export default s3Uploader;