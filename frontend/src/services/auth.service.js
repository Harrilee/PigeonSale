const API_URL = "http://localhost:5000";

const getUserType = (link, usertype) => {
    if (usertype === "user") {
        link += "/user";
    }
    else if (usertype === "staff") {
        link += "/staff";
    }
    else if (usertype === "admin") {
        link += "/admin";
    }
}

const login = (values, usertype) => {
    let AUTH_URL=API_URL+"/auth";
    getUserType(AUTH_URL, usertype);
    AUTH_URL += "/login";
    return fetch(AUTH_URL, {
        mode: 'cors',
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });
}

const signup = (values, usertype) => {
    let ACCOUNT_URL=API_URL+"/account";
    getUserType(ACCOUNT_URL, usertype);
    // ADD NEW USER
    return fetch(ACCOUNT_URL, {
        mode: 'cors',
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });
}

const logout = (usertype) => {
    let AUTH_URL=API_URL+"/auth";
    getUserType(AUTH_URL, usertype);
    AUTH_URL += "/logout";
    return fetch(AUTH_URL, {
        mode: 'cors',
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
    
};

export default {
    signup,
    login,
    logout,
  };