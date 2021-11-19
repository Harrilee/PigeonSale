const POST_URL = "http://localhost:5000/posts";

const createPost = (values) => {
    return fetch(POST_URL, {
        mode: 'cors',
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });
}

const updatePost = (id, values) => {
    const post_id = { post_id, id };
    const sendOver = { ...post_id, ...values };
    return fetch(POST_URL, {
        mode: 'cors',
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(sendOver)
    });
}

const getPost = (id) => {
    const values = { user_id : id };
    const uri = Object.keys(values).map((k)=> {
        return k + "=" + encodeURIComponent(values[k]);
    }).join("?");
    return fetch(POST_URL + "/" + uri, {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
    });
}

const searchPost = (keyword) => {
    const values = { search : keyword };
    const uri = Object.keys(values).map((k)=> {
        return k + "=" + encodeURIComponent(values[k]);
    }).join("?");
    return fetch(POST_URL + "/" + uri, {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

const deletePost = (id) => {
    const values = { post_id : id };
    return fetch(POST_URL, {
        mode: 'cors',
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });
}

const getMyPosts = () => {
    return fetch(POST_URL + "/my" , {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

export default {
    createPost,
    updatePost,
    deletePost,
    getPost,
    searchPost,
    getMyPosts
}