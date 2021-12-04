
import { Button, ImageListItem  } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ImageService from '../services/image.service';
import DeleteIcon from '../icons/DeleteIcon';
import './AvatarImageEditor.scss';

function AvatarImageEditor(props) {

    const [uploadedAvatar, setUploadedAvatar] = useState(["/default/empty-icon.png"]);
    
    const handleImage = (e) => {
        let selectedFiles = e.target.files;
        ImageService.sendImages(selectedFiles)
        .then(res => {
            return res.json();
        })
        .then(result => {
            if (result.status === 1) {
                setUploadedAvatar(result.data.urls);
                props.handleAvatar(result.data.urls[0]); // for now
            }
            console.log(result);
            
        })
        .catch(err => {
            console.log(err);
        });
    }

    const deleteImage = (ind) => {
        if (uploadedAvatar[ind] !== "/default/empty-icon.png"){
            ImageService.deleteImage(uploadedAvatar[ind])
            .then(res => {
                return res.json();
            })
            .then(result => {
                console.log("Deleted")
                setUploadedAvatar([]);
                props.handleAvatar("");
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    useEffect(() => {
        if (props.avatar !== uploadedAvatar) {
            console.log("changed");
            setUploadedAvatar([props.avatar]);
        }
    }, [props]);

    return (
        <div id="avatar-image-editor">
        {uploadedAvatar.map((item,i) => (
            <ImageListItem id="avatar-wrapper" key={item.img}>
                <div className="image-options">
                    <DeleteIcon onClick={() => deleteImage(i)} />
                </div>
                <div id="avatar">
                    <div id="avatar-image" style={{ backgroundImage: "url('"+ item + "')", backgroundSize: "100%" }}></div>
                </div>
            </ImageListItem>
        ))}
        <label htmlFor="contained-button-file">
        <Button id="upload-button" variant="outlined" component="span">Upload Avatar</Button>
        <input id="contained-button-file" style={{display: "none"}} accept="image/png, image/gif, image/jpeg, image/png" type="file" onChange={handleImage} />
        </label>
        </div>
    )
}

export default AvatarImageEditor;