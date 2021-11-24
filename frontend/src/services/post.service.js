const POST_URL = "http://localhost:5000/posts";

const getIndexPosts = () => {
    return fetch(POST_URL, {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

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
    const one_id = { post_id: id };
    const sendOver = { ...one_id, ...values };
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

const getOnePost = (id) => {
    const values = { post_id : id };
    const uri = Object.keys(values).map((k)=> {
        return k + "=" + encodeURIComponent(values[k]);
    }).join("?");
    return fetch(POST_URL + "?" + uri, {
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
    return fetch(POST_URL + "?" + uri, {
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
        method: 'DELETE',
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
    getIndexPosts,
    createPost,
    updatePost,
    deletePost,
    getOnePost,
    searchPost,
    getMyPosts
}