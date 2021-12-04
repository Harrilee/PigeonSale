import { Button, ImageList, ImageListItem  } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ImageService from '../services/image.service';
import DeleteIcon from '../icons/DeleteIcon';
import ExpandIcon from '../icons/ExpandIcon';

function ImageEditor(props) {

    const [uploadedImages, setUploadedImages] = useState(-1);
    
    const handleImage = (e) => {
        let selectedFiles = e.target.files;
        ImageService.sendImages(selectedFiles)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setUploadedImages(-1);
                props.handleImageLinks(result.data.urls);
            }
            if (result.status === 0) {
                console.log(result);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    const deleteImage = (ind) => {
        ImageService.deleteImage(uploadedImages[ind])
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log("deleted");
            let links = uploadedImages;
            links.splice(ind,1);
            setUploadedImages(-1);
            props.handleImageLinks(links);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const renderImages = () => {
        if (uploadedImages !== -1) {
            return uploadedImages.map((item,i) => {
                return (<ImageListItem key={item.img}>
                    <div className="image-options">
                        <a href={item} target="_blank"><ExpandIcon /></a>
                        <DeleteIcon onClick={() => deleteImage(i)} />
                    </div>
                    <div className="upload-image" style={{ backgroundImage: "url('"+ item + "')", backgroundSize: "cover", backgroundPosition:"center center" }}>
                    </div>
                </ImageListItem>)
            });
        }
    }

    useEffect(() => {
        if (uploadedImages === -1 || props.images !== uploadedImages) {
            setUploadedImages(props.images);
        }
    }, [props, uploadedImages]);

    return (
        <div id="image-editor">
        <div id="uploads-grid">
            <ImageList cols={3}>
                {renderImages()}
            </ImageList>
        </div>
        <label htmlFor="contained-button-file">
        <Button id="upload-button" variant="outlined" component="span">Upload Image</Button>
        <input id="contained-button-file" style={{display: "none"}} accept="image/png, image/gif, image/jpeg, image/png" multiple type="file" onChange={handleImage} />
        </label>
        </div>
    )
}

export default ImageEditor;