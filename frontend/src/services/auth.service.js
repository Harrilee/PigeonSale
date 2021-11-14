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

export default {
    login,
    logout,
}