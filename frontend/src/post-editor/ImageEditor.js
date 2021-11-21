import { Button, Grid, ImageList, ImageListItem } from '@mui/material';
import React, { useState } from 'react';

function ImageEditor(props) {
    return (
        <div id="uploads-grid">
            <ImageList cols={3}>
                    {props.uploads.map((item) => (
                        <ImageListItem key={item.img}>
                            <div className="upload-image" style={{ backgroundImage: "url('"+ item + "')", backgroundSize: "cover", backgroundPosition:"center center" }}>
                            </div>
                        </ImageListItem>
                    ))}
            </ImageList>
        </div>
    )
}

export default ImageEditor;