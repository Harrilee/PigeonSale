const ACCOUNT_URL = "http://localhost:5000/account";

const signup = (values, usertype) => {
    delete values.password2; // only used as verification
    // remove optional parameters if it does not exist
    if (values.gender.length === 0) {
        delete values.gender;
    }
    if (values.birthday.length === 0) {
        delete values.birthday;
    }
    if (values.bio.length === 0) {
        delete values.bio;
    }
    return fetch(ACCOUNT_URL + "/" + usertype, {
        mode: 'cors',
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });
}

const getProfile = (values) => {
    const uri = Object.keys(values).map((k)=> {
        return k + "=" + values[k];
    }).join("?");
    console.log(uri);
    console.log(ACCOUNT_URL + "/" + localStorage.usertype + "?" + uri);
    return fetch(ACCOUNT_URL + "/" + localStorage.usertype + "?" + uri, {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

const updateProfile = (values) => {
    console.log("updateProfile", values);
    return fetch(ACCOUNT_URL + "/" + localStorage.usertype, {
        mode: 'cors',
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });
}

const getPublicPosts = (id) => {
    const values = { user_id : id };
    const uri = Object.keys(values).map((k)=> {
        return k + "=" + values[k];
    }).join("?");
    return fetch(ACCOUNT_URL + "/" + localStorage.usertype + "/posts" + "?" + uri, {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

export default {
    signup,
    getProfile,
    updateProfile,
    getPublicPosts
}