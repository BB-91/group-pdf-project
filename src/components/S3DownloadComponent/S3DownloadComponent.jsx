import React, { useRef } from 'react';
import "./S3DownloadComponent.scss";
import s3Downloader from '../../data/s3Downloader.mjs';

const S3DownloadComponent = (props) => {
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
        <div className='s3-download-component'>
            S3DownloadComponent

            <input ref={filenameInputRef} type="text" ></input>
            {/* <input type="button" value={"get S3 filenames"} onClick={getS3FileNames}/> */}
            {/* <input type="button" value={"get signed url"} onClick={getSignedURL}/> */}
            <input type="button" value={"download file"} onClick={handleDownloadFileButtonClicked} />
        </div>
    )
}

export default S3DownloadComponent;