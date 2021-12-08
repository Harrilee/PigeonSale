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

const getProfile = (values, usertype) => {
    const uri = Object.keys(values).map((k)=> {
        return k + "=" + encodeURIComponent(values[k]);
    }).join("&");
    return fetch(ACCOUNT_URL + "/" + usertype + "?" + uri, {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

const updateProfile = (values) => {
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
    }).join("&");
    return fetch(ACCOUNT_URL + "/user/posts?" + uri, {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

const getAddresses = () => {
    return fetch(ACCOUNT_URL + "/" + localStorage.usertype + "/addresses", {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

const addAddress = (values) => {
    return fetch(ACCOUNT_URL + "/" + localStorage.usertype + "/addresses", {
        mode: 'cors',
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });
}

const updateAddress = (values) => {
    return fetch(ACCOUNT_URL + "/" + localStorage.usertype + "/addresses", {
        mode: 'cors',
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });
}

const deleteAddress = (id) => {
    const values = { address_id : id };
    return fetch(ACCOUNT_URL + "/" + localStorage.usertype + "/addresses", {
        mode: 'cors',
        method: 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });
}


const getRatings = (id) => {
    const values = { user_id : id };
    const uri = Object.keys(values).map((k)=> {
        return k + "=" + values[k];
    }).join("&");
    console.log(ACCOUNT_URL +  "/user/rates?" + uri);
    return fetch(ACCOUNT_URL +  "/user/rates?" + uri, {
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
    getPublicPosts,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    getRatings
}