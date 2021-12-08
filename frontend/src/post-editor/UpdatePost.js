import React, { useState } from 'react';
import "./PostEditor.scss";
import PostEditor from './PostEditor';
import EditIcon from '../icons/EditIcon';

function UpdatePost(props) {

    const [openModal, setOpenModal] = useState(false);
    const [loadDraft, setLoadDraft] = useState(-1);

    const handleOpen = (bool) => {
        if (bool && loadDraft === -1) {
            setLoadDraft(1);
        }
        if (!bool && loadDraft === 0) {
            setLoadDraft(-1);
        }
        setOpenModal(bool);
    }


    return (
       <React.Fragment>
       <div className="editor-button" id="edit-button"><EditIcon onClick={handleOpen} /></div>
       <PostEditor 
       openModal={openModal} 
       handleOpen={handleOpen} 
       variant="update" 
       post_id={props.post_id}
       setLoadDraft={setLoadDraft}
       loadDraft={loadDraft} />
       </React.Fragment>
    )
}

export default UpdatePost;