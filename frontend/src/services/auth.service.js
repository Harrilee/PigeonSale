const AUTH_URL = "http://localhost:5000/auth";

const login = (values, usertype) => {
    return fetch(AUTH_URL + "/" + usertype + "/login", {
        mode: 'cors',
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });
}

const logout = () => {
    return fetch(AUTH_URL + "/" + localStorage.usertype + "/logout", {
        mode: 'cors',
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });   
}

const getVerificationCode = (email) => {
    const values = {
        email : email
    };
    return fetch(AUTH_URL + "/code", {
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
    login,
    logout,
    getVerificationCode
}