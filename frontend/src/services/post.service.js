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

export default {
    createPost
}