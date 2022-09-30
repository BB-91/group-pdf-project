import React, { useRef } from 'react';
import "./S3DownloadComponent.scss";
import s3Downloader from '../../data/s3Downloader.mjs';
import { useAuth0 } from "@auth0/auth0-react";

const S3DownloadComponent = (props) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { signedIn } = props;
    const filenameInputRef = useRef(null);

    const handleDownloadFileButtonClicked = () => {
        if (!signedIn) {
            alert("You must sign in to download a file");
        } else {
            const filename = filenameInputRef.current.value;
            s3Downloader.download(filename);
        }
    }


    return (
        isAuthenticated &&(
        <div className='s3-download-component'>
            S3DownloadComponent

            <input ref={filenameInputRef} type="text" ></input>
            {/* <input type="button" value={"get S3 filenames"} onClick={getS3FileNames}/> */}
            {/* <input type="button" value={"get signed url"} onClick={getSignedURL}/> */}
            <input type="button" value={"download file"} onClick={handleDownloadFileButtonClicked} />
        </div>
        )
    )
}

export default S3DownloadComponent;