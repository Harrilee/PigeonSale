import { Button, Input } from '@mui/material';
import React, { useState } from 'react';
import ImageEditor from './ImageEditor';
import ImageService from '../services/image.service';

function ImageUploader() {

    const [uploadedImages, setUploadedImages] = useState([]);
    
    const handleImage = (e) => {
        let selectedFiles = e.target.files;
        ImageService.sendImages(selectedFiles)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                console.log("Uploaded");
                setUploadedImages(result.data.urls);
            }
            if (result.status === 0) {
                console.log(result)
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    return (
        <div id="image-uploader">
        <ImageEditor uploads={uploadedImages} />
        <label htmlFor="contained-button-file">
        <Button id="upload-button" variant="outlined" component="span">Upload Image</Button>
        <input id="contained-button-file" style={{display: "none"}} accept="image/png, image/gif, image/jpeg, image/png" multiple type="file" onChange={handleImage} />
        </label>
        </div>
    )
}

export default ImageUploader;