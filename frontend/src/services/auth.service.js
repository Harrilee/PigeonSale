const API_URL = "http://localhost:5000";

const login = (values, usertype) => {
    let AUTH_URL=API_URL+"/auth";
    if (usertype === "user") {
        AUTH_URL += "/user/login";
    }
    else if (usertype === "staff") {
        AUTH_URL += "/staff/login";
    }
    else if (usertype === "admin") {
        AUTH_URL += "/admin/login";
    }
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
    if (usertype === "user") {
        ACCOUNT_URL += "/user";
    }
    else if (usertype === "staff") {
        ACCOUNT_URL += "/staff";
    }
    else if (usertype === "admin") {
        ACCOUNT_URL += "/admin";
    }
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

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    signup,
    login,
    logout,
  };