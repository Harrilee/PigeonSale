const ADMIN_URL  = "http://localhost:5000/admin";

const getStaff = () => {
    return fetch(ADMIN_URL + "/staff" , {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

const getUsers = () => {
    return fetch(ADMIN_URL + "/user" , {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

const deleteStaff = (id) => {
    const values = { staff_id : id };
    return fetch(ADMIN_URL + "/staff", {
        mode: 'cors',
        method: 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });
}

const deleteUser = (id) => {
    const values = { user_id : id };
    return fetch(ADMIN_URL + "/user", {
        mode: 'cors',
        method: 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(values)
    });
}

const getDeals = () => {
    return fetch(ADMIN_URL + "/all_deal" , {
        mode: 'cors',
        method: 'GET',
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    });
}

const AdminService = {
    getDeals,
    getStaff,
    deleteStaff,
    getUsers,
    deleteUser
}

export default AdminService;