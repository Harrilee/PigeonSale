import React, { useState } from 'react';
import "./PostEditor.scss";
import PostEditor from './PostEditor';
import AddIcon from '../icons/AddIcon';

function CreatePost() {

    const [openModal, setOpenModal] = useState(false);

    const handleOpen = (bool) => setOpenModal(bool);

    return (
       <React.Fragment>
       <div onClick={handleOpen} name="createpost"><AddIcon /></div>
       <PostEditor openModal={openModal} handleOpen={handleOpen} variant="create" />
       </React.Fragment>
    )
}

export default CreatePost;